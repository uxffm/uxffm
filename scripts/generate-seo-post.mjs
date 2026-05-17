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
    .replace(/[\u0300-\u036f]/g, '')
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

const getTopicLabel = (post) => {
  const title = post.title.toLowerCase();

  if (title.includes('google') || title.includes('core update') || title.includes('algorithm')) return 'Google Updates';
  if (title.includes('index') || title.includes('crawl') || title.includes('canonical')) return 'Indexierung und Crawling';
  if (title.includes('content') || title.includes('ai') || title.includes('chatgpt')) return 'Content und KI';
  if (title.includes('local') || title.includes('maps') || title.includes('business profile')) return 'Local SEO';
  if (title.includes('technical') || title.includes('schema') || title.includes('performance')) return 'Technisches SEO';
  if (title.includes('link') || title.includes('backlink')) return 'Backlinks';

  return 'SEO Praxis';
};

const getSpecificTopic = (post) => {
  const title = post.title.toLowerCase();

  if (title.includes('video')) {
    return {
      title: 'Sind Videos gut fuer SEO?',
      slug: 'videos-fuer-seo',
      tag: 'Video SEO',
      angle:
        'Videos können SEO staerken, wenn sie Suchintention, Seitenstruktur und Ladezeit sinnvoll unterstuetzen.',
      checks: [
        'Gibt es eine klare Suchintention fuer das Video?',
        'Verbessert das Video die bestehende Seite wirklich?',
        'Bleibt die Ladezeit gut?',
        'Gibt es Text, Zusammenfassung oder Transkript?',
      ],
    };
  }

  if (title.includes('lazy') || title.includes('spa') || title.includes('javascript')) {
    return {
      title: 'Lazy Loading und JavaScript: Was bedeutet das fuer SEO?',
      slug: 'lazy-loading-javascript-seo',
      tag: 'Technisches SEO',
      angle:
        'Lazy Loading kann Nutzererfahrung und Ladezeit verbessern, muss aber fuer Google crawlbar und indexierbar bleiben.',
      checks: [
        'Sind wichtige Inhalte ohne Interaktion im HTML erreichbar?',
        'Werden Bilder und Inhalte erst geladen, wenn Google sie sehen kann?',
        'Sind interne Links als echte Links vorhanden?',
        'Wird die Seite mit der Google Search Console getestet?',
      ],
    };
  }

  if (title.includes('drop') || title.includes('dropping') || title.includes('ranking')) {
    return {
      title: 'Warum verliert eine Website Google Rankings?',
      slug: 'google-ranking-verlust-ursachen',
      tag: 'Google Rankings',
      angle:
        'Ranking-Verluste entstehen oft durch technische Probleme, geaenderte Suchintention, Konkurrenz oder Google-Updates.',
      checks: [
        'Gab es technische Aenderungen oder Relaunches?',
        'Sind wichtige Seiten noch indexiert?',
        'Hat sich die Suchintention veraendert?',
        'Sind Wettbewerber mit besseren Inhalten vorbeigezogen?',
      ],
    };
  }

  if (title.includes('link') || title.includes('backlink')) {
    return {
      title: 'Backlinks und SEO: Worauf kommt es wirklich an?',
      slug: 'backlinks-und-seo',
      tag: 'Backlinks',
      angle:
        'Backlinks können helfen, aber Qualität, Relevanz und ein natürliches Linkprofil sind wichtiger als reine Menge.',
      checks: [
        'Kommt der Link von einer thematisch passenden Seite?',
        'Wirkt der Ankertext natuerlich?',
        'Bringt der Link echte Nutzer oder nur eine Kennzahl?',
        'Gibt es riskante Muster im Linkprofil?',
      ],
    };
  }

  if (title.includes('ai') || title.includes('overview') || title.includes('chatgpt')) {
    return {
      title: 'KI-Suchergebnisse und SEO: Was müssen Unternehmen beachten?',
      slug: 'ki-suchergebnisse-und-seo',
      tag: 'KI SEO',
      angle:
        'KI-Antworten veraendern, wie Nutzer Suchergebnisse wahrnehmen. Gute Inhalte brauchen klare Aussagen, Vertrauen und zitierfaehige Struktur.',
      checks: [
        'Beantwortet die Seite konkrete Fragen direkt?',
        'Sind Autoritaet und Erfahrung sichtbar?',
        'Sind Inhalte klar strukturiert?',
        'Werden Marke, Bewertungen und Reputation gepflegt?',
      ],
    };
  }

  return {
    title: 'Warum SEO regelmäßige Pflege braucht',
    slug: 'seo-regelmäßig-optimieren',
    tag: 'SEO Strategie',
    angle:
      'SEO ist kein einmaliges Projekt. Rankings bleiben stabiler, wenn Inhalte, Technik und Suchintention regelmäßig geprüft werden.',
    checks: [
      'Welche Seiten bringen Anfragen?',
      'Welche Rankings verlieren Sichtbarkeit?',
      'Welche Inhalte sind veraltet?',
      'Welche technischen Probleme bremsen die Website?',
    ],
  };
};

const makePost = (posts) => {
  const primaryPost = posts[0] ?? { title: 'SEO', url: SITE_URL, source: 'SEO Community' };
  const topic = getSpecificTopic(primaryPost);
  const title = topic.title;
  const excerpt =
    `${topic.angle} Ein kurzer Leitfaden fuer SEO WBN.`;
  const canonicalSlug = slugify(topic.slug);
  const source = primaryPost.subreddit ? `r/${primaryPost.subreddit}` : primaryPost.source;

  const sourceList = posts
    .slice(0, 5)
    .map((post) => {
      const itemSource = post.subreddit ? `r/${post.subreddit}` : post.source;
      return `- [${post.title}](${post.url}) - ${itemSource}`;
    })
    .join('\n');
  const checklist = topic.checks.map((item) => `- ${item}`).join('\n');

  return `---
title: ${yamlString(title)}
excerpt: ${yamlString(excerpt)}
image: /images/seo-frankfurt.jpg
category: seo
tags:
  - SEO
  - ${topic.tag}
  - Google
  - SEO WBN
metadata:
  canonical: ${SITE_URL}/${canonicalSlug}
---

${topic.angle}

Ausgangspunkt ist eine aktuelle Diskussion bei ${source}: [${primaryPost.title}](${primaryPost.url}). Solche Fragen sind spannend, weil sie zeigen, welche SEO-Probleme gerade in echten Projekten auftauchen.

## Warum das Thema fuer SEO wichtig ist

SEO funktioniert selten über einzelne Tricks. Entscheidend ist, ob eine Maßnahme die Seite fuer Nutzer klarer, schneller oder vertrauenswürdiger macht. Google kann nur bewerten, was technisch erreichbar ist und inhaltlich sauber eingeordnet werden kann.

## Was Unternehmen pruefen sollten

${checklist}

## Einordnung fuer SEO WBN

Fuer SEO WBN ist wichtig, dass jede Optimierung einen klaren Zweck hat: mehr Sichtbarkeit, bessere Nutzererfahrung oder mehr qualifizierte Anfragen. Eine technische oder inhaltliche Optimierung sollte deshalb immer mit einer einfachen Frage verbunden sein: Hilft sie Nutzern, schneller die richtige Entscheidung zu treffen?

## Praktischer naechster Schritt

Pruefe eine wichtige Leistungsseite deiner Website und frage dich, ob sie die Suchintention wirklich besser beantwortet als die Seiten deiner Wettbewerber. Wenn nicht, ist das meist der beste Startpunkt fuer SEO.

## Quellen

${sourceList}

Dieser Beitrag wurde automatisch aus öffentlichen SEO-Diskussionen und SEO-News angestossen und redaktionell fuer SEO WBN eingeordnet.
`;
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let posts = [];
  try {
    posts = await getRedditPosts();
  } catch (error) {
    console.warn(`Reddit unavailable, using fallback SEO sources. ${error.message}`);
    posts = await getFallbackPosts();
  }

  if (posts.length < 4) {
    throw new Error(`Not enough SEO discussion posts found. Got ${posts.length}.`);
  }

  const topic = getSpecificTopic(posts[0]);
  const outputPath = path.join(OUTPUT_DIR, `${topic.slug}.md`);

  try {
    await fs.access(outputPath);
    if (!isDryRun) {
      console.log(`Post already exists: ${outputPath}`);
      return;
    }
  } catch {
    // Expected when today's post has not been generated yet.
  }

  if (isDryRun) {
    console.log(makePost(posts).slice(0, 2000));
    console.log(`\nDry run complete. Would create ${outputPath}`);
    return;
  }

  await fs.writeFile(outputPath, makePost(posts), 'utf8');
  console.log(`Created ${outputPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
