import fs from 'node:fs/promises';
import path from 'node:path';

const SUBREDDITS = ['Wordpress'];
const POSTS_PER_SUBREDDIT = 25;
const OUTPUT_DIR = 'src/content/post';
const SITE_URL = 'https://frankfurtmarketingstudio.de';
const isDryRun = process.env.DRY_RUN === '1';
const redditClientId = process.env.REDDIT_CLIENT_ID;
const redditClientSecret = process.env.REDDIT_CLIENT_SECRET;

const today = new Date();
const dateSlug = today.toISOString().slice(0, 10);
const outputPath = path.join(OUTPUT_DIR, `reddit-wordpress-trends-${dateSlug}.md`);

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
      'User-Agent': 'frankfurtmarketingstudio.de daily content research bot',
      Accept: 'application/json',
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Reddit request failed ${response.status}: ${url}`);
  }

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
      'User-Agent': 'frankfurtmarketingstudio.de daily content research bot',
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

const getTopicLabel = (post) => {
  const title = post.title.toLowerCase();

  if (title.includes('plugin')) return 'Plugins und Erweiterungen';
  if (title.includes('speed') || title.includes('performance') || title.includes('slow')) return 'Performance';
  if (title.includes('seo') || title.includes('google') || title.includes('ranking')) return 'SEO';
  if (title.includes('theme') || title.includes('design') || title.includes('builder')) return 'Design und Themes';
  if (title.includes('security') || title.includes('hack') || title.includes('malware')) return 'Sicherheit';
  if (title.includes('client') || title.includes('business') || title.includes('customer')) return 'Kunden und Business';

  return 'WordPress Praxis';
};

const makePost = (posts) => {
  const mainTopics = posts.slice(0, 5);
  const primaryTopic = getTopicLabel(mainTopics[0] ?? { title: 'WordPress' });
  const title = `WordPress Trends von Reddit: ${primaryTopic} im Fokus`;
  const excerpt =
    'Ein taeglicher Blick auf aktuelle Reddit-Diskussionen rund um WordPress - eingeordnet fuer Unternehmen in Frankfurt.';
  const canonicalSlug = slugify(`reddit wordpress trends ${dateSlug}`);

  const topicGroups = new Map();
  for (const post of posts) {
    const label = getTopicLabel(post);
    topicGroups.set(label, [...(topicGroups.get(label) ?? []), post]);
  }

  const sections = [...topicGroups.entries()]
    .slice(0, 5)
    .map(([label, items]) => {
      const bullets = items
        .slice(0, 3)
        .map((item) => `- In r/${item.subreddit} wird diskutiert: [${item.title}](${item.url}).`)
        .join('\n');

      return `## ${label}\n\n${bullets}\n\nFuer WordPress-Websites bedeutet das: Nicht jeder Trend muss sofort umgesetzt werden. Wichtig ist, daraus konkrete Prioritaeten abzuleiten: Was verbessert Ladezeit, Vertrauen, Sichtbarkeit oder die Pflege der Website?`;
    })
    .join('\n\n');

  const sourceList = posts
    .slice(0, 8)
    .map((post) => `- [${post.title}](${post.url}) - r/${post.subreddit}`)
    .join('\n');

  return `---
publishDate: ${today.toISOString()}
title: ${yamlString(title)}
excerpt: ${yamlString(excerpt)}
image: /images/wordpress-webseite-frankfurt.webp
category: seo
tags:
  - WordPress
  - Reddit
  - WordPress Trends
  - WordPress Frankfurt
metadata:
  canonical: ${SITE_URL}/${canonicalSlug}
---

Reddit ist kein Strategie-Ersatz, aber ein guter Fruehindikator: Dort tauchen WordPress-Fragen, Plugin-Probleme, Theme-Diskussionen und Erfahrungen aus echten Projekten oft auf, bevor sie in klassischen Blogartikeln landen. Fuer Unternehmen in Frankfurt ist spannend, welche WordPress-Themen gerade echte Nutzer beschaeftigen.

${sections}

## Was Unternehmen daraus mitnehmen koennen

Wenn mehrere Diskussionen in dieselbe Richtung zeigen, lohnt sich ein Blick auf die eigene Website. Besonders wichtig sind:

- Laedt die WordPress-Seite schnell genug auf Smartphone und Desktop?
- Sind Plugins wirklich notwendig oder verlangsamen sie das System?
- Ist die Website fuer lokale Suchanfragen in Frankfurt sauber strukturiert?
- Koennen Inhalte ohne Entwicklerwissen aktualisiert werden?
- Gibt es regelmaessige Backups, Updates und Sicherheitspruefungen?

## Quellen aus Reddit

${sourceList}

Dieser Beitrag wurde automatisch aus oeffentlichen Reddit-Diskussionen zusammengestellt und redaktionell fuer WordPress in Frankfurt eingeordnet.
`;
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  try {
    await fs.access(outputPath);
    console.log(`Post already exists for ${dateSlug}: ${outputPath}`);
    return;
  } catch {
    // Expected when today's post has not been generated yet.
  }

  const posts = await getRedditPosts();
  if (posts.length < 4) {
    throw new Error(`Not enough Reddit posts found. Got ${posts.length}.`);
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
