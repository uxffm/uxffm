import fs from 'node:fs/promises';
import path from 'node:path';

const SUBREDDITS = ['SEO'];
const POSTS_PER_SUBREDDIT = 25;
const FALLBACK_FEEDS = [
  {
    name: 'Google Search Central',
    url: 'https://developers.google.com/search/blog/rss.xml',
  },
  {
    name: 'Search Engine Journal',
    url: 'https://www.searchenginejournal.com/feed/',
  },
  {
    name: 'Search Engine Roundtable',
    url: 'https://www.seroundtable.com/index.rdf',
  },
];
const OUTPUT_DIR = 'src/content/post';
const SITE_URL = 'https://seowbn.de';
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
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

const yamlString = (value) => `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

const fetchJson = async (url, headers = {}) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'seowbn.de daily SEO content research bot',
      Accept: 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`JSON request failed ${response.status}: ${url}`);
  }

  return response.json();
};

const decodeHtml = (value = '') =>
  value
    .replace(/<!\[CDATA\[(.*?)\]\]>/gs, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")
    .trim();

const getTagValue = (item, tag) => {
  const match = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return match ? decodeHtml(match[1]) : '';
};

const getFeedItems = async ({ name, url }) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'seowbn.de daily SEO content research bot',
      Accept: 'application/rss+xml, application/xml, text/xml',
    },
  });

  if (!response.ok) {
    throw new Error(`Feed request failed ${response.status}: ${url}`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<item\b[\s\S]*?<\/item>/gi)]
    .slice(0, 6)
    .map(([item]) => ({
      source: name,
      title: sanitizeText(getTagValue(item, 'title')),
      url: getTagValue(item, 'link'),
      score: 0,
      comments: 0,
    }))
    .filter((item) => item.title && item.url);
};

const getStackExchangeQuestions = async () => {
  const json = await fetchJson(
    'https://api.stackexchange.com/2.3/questions?pagesize=10&order=desc&sort=activity&tagged=seo&site=webmasters'
  );

  return (json.items ?? []).map((item) => ({
    source: 'Webmasters StackExchange',
    title: sanitizeText(item.title),
    url: item.link,
    score: item.score ?? 0,
    comments: item.answer_count ?? 0,
  }));
};

const getRedditAccessToken = async () => {
  if (!redditClientId || !redditClientSecret) return undefined;

  const auth = Buffer.from(`${redditClientId}:${redditClientSecret}`).toString('base64');
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'seowbn.de daily SEO content research bot',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Reddit auth failed ${response.status}`);
  }

  const json = await response.json();
  return json.access_token;
};

const getRedditPosts = async () => {
  const allPosts = [];
  const accessToken = await getRedditAccessToken();

  for (const subreddit of SUBREDDITS) {
    const url = accessToken
      ? `https://oauth.reddit.com/r/${subreddit}/hot?limit=${POSTS_PER_SUBREDDIT}`
      : `https://www.reddit.com/r/${subreddit}/hot.json?limit=${POSTS_PER_SUBREDDIT}`;
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
    const json = await fetchJson(url, headers);
    const posts = json?.data?.children ?? [];

    for (const post of posts) {
      const data = post.data;
      if (!data?.title || data.stickied || data.over_18) continue;

      allPosts.push({
        subreddit,
        title: sanitizeText(data.title),
        url: `https://www.reddit.com${data.permalink}`,
        selftext: sanitizeText((data.selftext ?? '').slice(0, 500)),
        score: data.score ?? 0,
        comments: data.num_comments ?? 0,
      });
    }
  }

  return allPosts
    .sort((a, b) => b.score + b.comments * 2 - (a.score + a.comments * 2))
    .slice(0, 12);
};

const getFallbackPosts = async () => {
  const feedResults = await Promise.allSettled(FALLBACK_FEEDS.map((feed) => getFeedItems(feed)));
  const feedPosts = feedResults.flatMap((result) => (result.status === 'fulfilled' ? result.value : []));

  let stackExchangePosts = [];
  try {
    stackExchangePosts = await getStackExchangeQuestions();
  } catch (error) {
    console.warn(error);
  }

  return [...feedPosts, ...stackExchangePosts]
    .sort((a, b) => b.score + b.comments * 2 - (a.score + a.comments * 2))
    .slice(0, 12);
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

const ANCHOR_VARIATIONS = [
  'SEO WBN',
  'SEO-Agentur SEO WBN',
  'SEO WBN aus Frankfurt',
  'SEO-Experten von SEO WBN',
  'SEO WBN Frankfurt',
];

const generatePost = async (topPost, relatedPosts) => {
  const anchorText = ANCHOR_VARIATIONS[Math.floor(Math.random() * ANCHOR_VARIATIONS.length)];
  const relatedTitles = relatedPosts
    .slice(1, 4)
    .map((p) => `- ${p.title}`)
    .join('\n');
  const source = topPost.subreddit ? `r/${topPost.subreddit}` : topPost.source;

  const prompt = `Du bist ein erfahrener SEO-Experte und schreibst fuer das Blog von SEO WBN (seowbn.de), einer SEO-Beratung aus Frankfurt am Main.

Schreibe einen ausführlichen, informativen Blogartikel auf Deutsch basierend auf diesem aktuell diskutierten Thema aus der SEO-Community:

HAUPTTHEMA: "${topPost.title}"
Quelle: ${topPost.url} (${source})
${topPost.selftext ? `Kontext: ${topPost.selftext}` : ''}

Weitere aktuelle Themen der Community (zur Einordnung):
${relatedTitles}

Anforderungen an den Artikel:
- Sprache: Deutsch (klar, professionell, aber zugänglich) — immer die Sie-Form verwenden, niemals du/dich/dir/dein
- Laenge: Mindestens 800 Wörter, gerne mehr
- Fokus: Geh TIEF auf das spezifische Thema ein — nicht generisch, sondern konkret und nuetzlich
- Struktur: Mehrere H2-Abschnitte mit echtem Inhalt, keine Füllwörter
- Stil: Praktisch und handlungsorientiert — der Leser soll etwas lernen und mitnehmen
- Zielgruppe: Unternehmen und Website-Betreiber, die SEO besser verstehen wollen
- Am Ende: Kurzer Hinweis, dass SEO WBN bei solchen Themen hilft
- Externe Links: Baue maximal 2 externe Links natürlich in den Fließtext ein — nur zu offiziellen Quellen (Google Search Central, Search Engine Journal, Search Engine Roundtable, offiziellen Plugin-Seiten). Keine beliebigen Drittseiten. Format: [Linktext](https://...) direkt im Text.
- Interner Link: Baue genau einen internen Link zur Homepage ein ([Linktext](/)) — natürlich im Fließtext. Nutze GENAU diesen Ankertext: "${anchorText}" — passe ihn grammatikalisch an den Satz an, aber behalte alle Wörter bei.

Gib NUR den Markdown-Inhalt des Artikels zurück (ab dem ersten einleitenden Absatz, kein Frontmatter, kein H1-Titel). Fang direkt mit dem Einleitungsabsatz an, dann die H2-Abschnitte.`;

  const content = await callClaude(prompt);

  const slugPrompt = `Erstelle einen kurzen, prägnanten URL-Slug (auf Deutsch, maximal 5 Wörter, nur Kleinbuchstaben und Bindestriche) für einen Blogartikel über dieses SEO-Thema: "${topPost.title}". Wichtig: Nenne das konkrete Thema — keine generischen Wörter wie "seo", "tipps", "guide", "wie", "warum", "was". Gib NUR den Slug zurück, sonst nichts.`;
  const rawSlug = await callClaude(slugPrompt);
  const slug = slugify(rawSlug.trim().toLowerCase().replace(/['"]/g, ''));

  const metaPrompt = `Basierend auf diesem SEO-Thema: "${topPost.title}"

Gib mir im folgenden Format:
TITEL: [Ein prägnanter deutschen Blogtitel, max 70 Zeichen]
EXCERPT: [Ein ansprechender Teasertext, 1-2 Sätze, max 160 Zeichen]

Nur diese zwei Zeilen, nichts anderes.`;
  const metaRaw = await callClaude(metaPrompt);
  const titleMatch = metaRaw.match(/TITEL:\s*(.+)/);
  const excerptMatch = metaRaw.match(/EXCERPT:\s*(.+)/);
  const title = titleMatch ? titleMatch[1].trim() : topPost.title;
  const excerpt = excerptMatch ? excerptMatch[1].trim() : '';

  const sourceList = [topPost, ...relatedPosts.slice(1, 4)]
    .map((p) => {
      const itemSource = p.subreddit ? `r/${p.subreddit}` : p.source;
      return `- [${p.title}](${p.url}) — ${itemSource}`;
    })
    .join('\n');

  const today = new Date().toISOString().slice(0, 10);

  const frontmatter = `---
publishDate: ${today}T00:00:00Z
title: ${yamlString(title)}
excerpt: ${yamlString(excerpt)}
image: /images/seo-frankfurt.jpg
category: seo
tags:
  - SEO
  - Google
  - SEO WBN
metadata:
  canonical: ${SITE_URL}/${slug}
---

`;

  return {
    slug,
    content: frontmatter + content + `\n\n## Quellen\n\n${sourceList}\n\nDieser Beitrag wurde automatisch aus öffentlichen SEO-Diskussionen und SEO-News angestossen und redaktionell für SEO WBN eingeordnet.\n`,
  };
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let posts = [];
  try {
    posts = await getRedditPosts();
    console.log(`Fetched ${posts.length} posts from r/SEO`);
    console.log(`Top post: "${posts[0]?.title}"`);
  } catch (error) {
    console.warn(`Reddit unavailable, using fallback SEO sources. ${error.message}`);
    posts = await getFallbackPosts();
  }

  if (posts.length < 4) {
    throw new Error(`Not enough SEO discussion posts found. Got ${posts.length}.`);
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
