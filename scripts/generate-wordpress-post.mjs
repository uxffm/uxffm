import fs from 'node:fs/promises';
import path from 'node:path';

const SUBREDDIT = 'wordpress';
const POSTS_PER_FETCH = 25;
const OUTPUT_DIR = 'src/content/post';
const SITE_URL = 'https://frankfurtmarketingstudio.de';
const isDryRun = process.env.DRY_RUN === '1';
const redditClientId = process.env.REDDIT_CLIENT_ID;
const redditClientSecret = process.env.REDDIT_CLIENT_SECRET;
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  console.error('ANTHROPIC_API_KEY environment variable is required');
  process.exit(1);
}

const sanitizeText = (value = '') =>
  value
    .replace(/\r?\n/g, ' ')
    .replace(/"/g, '\\"')
    .replace(/\s+/g, ' ')
    .trim();

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/\b(19|20)\d{2}\b/g, '') // never include a year in the slug
    .replace(/-{2,}/g, '-')
    .replace(/(^-|-$)/g, '')
    .split('-')
    .slice(0, 5) // keep slugs short: max 5 words
    .join('-')
    .slice(0, 50);

const yamlString = (value) => `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const fetchJson = async (url, headers = {}) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'frankfurtmarketingstudio.de daily WordPress content research bot',
      Accept: 'application/json',
      ...headers,
    },
  });
  if (!response.ok) throw new Error(`JSON request failed ${response.status}: ${url}`);
  return response.json();
};

const getRedditAccessToken = async () => {
  if (!redditClientId || !redditClientSecret) return undefined;
  const auth = Buffer.from(`${redditClientId}:${redditClientSecret}`).toString('base64');
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'frankfurtmarketingstudio.de daily WordPress content research bot',
    },
    body: 'grant_type=client_credentials',
  });
  if (!response.ok) throw new Error(`Reddit auth failed ${response.status}`);
  const json = await response.json();
  return json.access_token;
};

const getPostsViaWordPressOrgRss = async () => {
  const feeds = [
    'https://wordpress.org/news/feed/',
    'https://make.wordpress.org/core/feed/',
  ];
  const posts = [];
  for (const feedUrl of feeds) {
    try {
      const response = await fetch(feedUrl, {
        headers: { 'User-Agent': 'frankfurtmarketingstudio.de daily WordPress content research bot' },
      });
      if (!response.ok) continue;
      const xml = await response.text();
      const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((m) => m[1]);
      for (const item of items) {
        const title = sanitizeText((item.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/) ?? [])[1] ?? '');
        const link = sanitizeText((item.match(/<link>(.*?)<\/link>/) ?? [])[1] ?? '');
        const desc = sanitizeText(((item.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/) ?? [])[1] ?? '').slice(0, 500));
        if (title && link) posts.push({ title, url: link, score: 0, comments: 0, selftext: desc });
      }
    } catch { /* skip feed on error */ }
  }
  return posts.slice(0, 10);
};

const getRedditPostsViaRss = async () => {
  const rssUrl = `https://www.reddit.com/r/${SUBREDDIT}/hot.rss?limit=${POSTS_PER_FETCH}`;
  const response = await fetch(rssUrl, {
    headers: {
      'User-Agent': 'frankfurtmarketingstudio.de daily WordPress content research bot',
      Accept: 'application/rss+xml, application/xml, text/xml',
    },
  });
  if (!response.ok) throw new Error(`Reddit RSS failed ${response.status}: ${rssUrl}`);
  const xml = await response.text();
  const items = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
  return items
    .map((item) => {
      const title = sanitizeText((item.match(/<title[^>]*>([^<]+)<\/title>/) ?? [])[1] ?? '');
      const link = ((item.match(/<link[^>]+href="([^"]+)"/) ?? [])[1] ?? '');
      return { title, url: link, score: 0, comments: 0, selftext: '' };
    })
    .filter((p) => p.title && !p.title.startsWith('[') && p.title.length > 10)
    .slice(0, 10);
};

const getRedditPosts = async () => {
  const accessToken = await getRedditAccessToken();
  if (accessToken) {
    const url = `https://oauth.reddit.com/r/${SUBREDDIT}/hot?limit=${POSTS_PER_FETCH}`;
    const json = await fetchJson(url, { Authorization: `Bearer ${accessToken}` });
    const posts = json?.data?.children ?? [];
    return posts
      .filter((post) => post.data?.title && !post.data.stickied && !post.data.over_18)
      .map((post) => ({
        title: sanitizeText(post.data.title),
        url: `https://www.reddit.com${post.data.permalink}`,
        score: post.data.score ?? 0,
        comments: post.data.num_comments ?? 0,
        selftext: sanitizeText((post.data.selftext ?? '').slice(0, 500)),
      }))
      .sort((a, b) => b.score + b.comments * 2 - (a.score + a.comments * 2))
      .slice(0, 10);
  }
  try {
    const posts = await getRedditPostsViaRss();
    if (posts.length >= 3) return posts;
  } catch { /* fall through to WordPress.org */ }
  console.log('Reddit unavailable, falling back to WordPress.org news feed');
  return getPostsViaWordPressOrgRss();
};

const callClaude = async (prompt) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': anthropicApiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-opus-4-5',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }
  const data = await response.json();
  return data.content[0].text;
};

const generatePost = async (topPost, relatedPosts) => {
  const relatedTitles = relatedPosts
    .slice(1, 4)
    .map((p) => `- ${p.title}`)
    .join('\n');

  const prompt = `Du bist ein erfahrener WordPress-Experte und schreibst fuer das Blog von Frankfurt Marketing Studio (frankfurtmarketingstudio.de), einer WordPress- und Online-Marketing-Agentur in Frankfurt am Main.

Schreibe einen ausführlichen, informativen Blogartikel auf Deutsch basierend auf diesem aktuell heiß diskutierten Thema aus der WordPress-Community:

HAUPTTHEMA: "${topPost.title}"
Reddit-Diskussion: ${topPost.url}
${topPost.selftext ? `Kontext aus der Diskussion: ${topPost.selftext}` : ''}

Weitere aktuelle Themen der Community (zur Einordnung):
${relatedTitles}

Anforderungen an den Artikel:
- Sprache: Deutsch (klar, professionell, aber zugänglich) — immer die Sie-Form verwenden, niemals du/dich/dir/dein
- Laenge: Mindestens 800 Wörter, gerne mehr
- Fokus: Geh TIEF auf das spezifische Thema ein — nicht generisch, sondern konkret und nuetzlich
- Struktur: Mehrere H2-Abschnitte mit echtem Inhalt, keine Füllwörter
- Stil: Praktisch und handlungsorientiert — der Leser soll etwas lernen und mitnehmen
- Zielgruppe: WordPress-Nutzer und kleine Unternehmen in Frankfurt und Umgebung
- Externe Links: Baue maximal 3 externe Links natürlich in den Fließtext ein, aber NUR wenn sie wirklich passen — z.B. zur offiziellen Plugin-Seite, zur WordPress-Dokumentation, zur Entwickler-Website oder zu einer offiziellen Ankündigung. Keine zufälligen Links, keine Blogposts Dritter, keine SEO-Spam-Links. Nur offizielle, vertrauenswuerdige Quellen. Format: [Linktext](https://...) direkt im Text.

Gib NUR den Markdown-Inhalt des Artikels zurück (ab der ersten Überschrift mit ##, kein Frontmatter, kein Titel als H1). Fang direkt mit einem einleitenden Absatz an, dann die H2-Abschnitte.`;

  const content = await callClaude(prompt);

  // Extract a good slug from the topic
  const slugPrompt = `Erstelle einen kurzen, prägnanten URL-Slug (auf Englisch oder Deutsch, maximal 4 Wörter, nur Kleinbuchstaben und Bindestriche) für einen Blogartikel über dieses Thema: "${topPost.title}". Wichtig: Kein "wtf", "how", "why", "what", "warum", "wie", "was" im Slug — nenne stattdessen das Produkt oder Thema direkt. Verwende KEINE Jahreszahl (z. B. 2025, 2026) im Slug. Halte den Slug so kurz wie möglich. Gib NUR den Slug zurück, sonst nichts.`;
  const rawSlug = await callClaude(slugPrompt);
  const slug = slugify(rawSlug.trim().toLowerCase().replace(/['"]/g, ''));

  // Extract a title and excerpt
  const metaPrompt = `Basierend auf diesem WordPress-Thema: "${topPost.title}"

Gib mir im folgenden Format:
TITEL: [Ein prägnanter, klickstarker Deutschen Blogtitel, max 70 Zeichen]
EXCERPT: [Ein ansprechender Teasertext, 1-2 Sätze, max 160 Zeichen]

Nur diese zwei Zeilen, nichts anderes.`;
  const metaRaw = await callClaude(metaPrompt);
  const titleMatch = metaRaw.match(/TITEL:\s*(.+)/);
  const excerptMatch = metaRaw.match(/EXCERPT:\s*(.+)/);
  const title = titleMatch ? titleMatch[1].trim() : topPost.title;
  const excerpt = excerptMatch ? excerptMatch[1].trim() : '';

  const today = new Date().toISOString().slice(0, 10);

  const frontmatter = `---
publishDate: ${today}T00:00:00Z
title: ${yamlString(title)}
excerpt: ${yamlString(excerpt)}
image: /images/wordpress-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: ${SITE_URL}/${slug}
---

`;

  return {
    slug,
    content: frontmatter + content,
  };
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let posts = [];
  try {
    posts = await getRedditPosts();
    console.log(`Fetched ${posts.length} posts from r/wordpress`);
    console.log(`Top post: "${posts[0]?.title}"`);
  } catch (error) {
    throw new Error(`Failed to fetch r/wordpress: ${error.message}`);
  }

  if (posts.length < 3) {
    throw new Error(`Not enough posts from r/wordpress. Got ${posts.length}.`);
  }

  console.log('Generating post with Claude...');
  const { slug, content } = await generatePost(posts[0], posts);

  const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);

  if (isDryRun) {
    console.log('\n--- DRY RUN OUTPUT ---\n');
    console.log(content.slice(0, 3000));
    console.log(`\nWould create: ${outputPath}`);
    return;
  }

  try {
    await fs.access(outputPath);
    console.log(`Post already exists: ${outputPath}`);
    return;
  } catch {
    // File doesn't exist yet — expected.
  }

  await fs.writeFile(outputPath, content, 'utf8');
  console.log(`Created ${outputPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
