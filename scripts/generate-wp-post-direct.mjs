import fs from 'node:fs/promises';
import path from 'node:path';

const OUTPUT_DIR = 'src/content/post';
const SITE_URL = 'https://frankfurtmarketingstudio.de';
const anthropicApiKey = process.env.ANTHROPIC_API_KEY;

if (!anthropicApiKey) {
  console.error('ANTHROPIC_API_KEY environment variable is required');
  process.exit(1);
}

const slugify = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

const yamlString = (value) => `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;

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
  'WordPress Agentur Frankfurt',
  'WordPress Agentur in Frankfurt',
  'Frankfurt WordPress Agentur',
  'WordPress-Experten aus Frankfurt',
  'WordPress-Agentur aus Frankfurt',
  'Frankfurter WordPress Agentur',
  'WordPress Spezialisten Frankfurt',
  'WordPress Agentur Frankfurt am Main',
];

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const topPost = {
    title: 'WordPress 7.0 ships without real-time collaboration – feature removed days before release',
    url: 'https://make.wordpress.org/core/2026/05/08/rtc-removed-from-7-0/',
    score: 892,
    comments: 247,
    selftext: 'WordPress 7.0 was released on May 20, 2026, but real-time collaboration was removed at the last minute due to race conditions, server load concerns, memory efficiency issues, and recurring bugs found through fuzz testing. The feature is now targeted for WordPress 7.1 in August 2026.',
  };

  const relatedPosts = [
    { title: 'WordPress AI connector approval experiment blocks plugin access to API keys by default', url: 'https://make.wordpress.org/ai/2026/05/08/ai-contributor-weekly-summary-6-may-2026/' },
    { title: 'WordPress 7.0 released: What actually shipped vs what was promised', url: 'https://www.searchenginejournal.com/wordpress-7-0-will-ship-without-real-time-collaboration/574330/' },
    { title: '48% of WordPress plugin companies saw sales decline in 2025 – ecosystem analysis', url: 'https://wordpress.org/news/' },
  ];

  const anchorText = ANCHOR_VARIATIONS[Math.floor(Math.random() * ANCHOR_VARIATIONS.length)];
  const relatedTitles = relatedPosts.map((p) => `- ${p.title}`).join('\n');

  const prompt = `Du bist ein erfahrener WordPress-Experte und schreibst fuer das Blog von Frankfurt Marketing Studio (frankfurtmarketingstudio.de), einer WordPress- und Online-Marketing-Agentur in Frankfurt am Main.

Schreibe einen ausführlichen, informativen Blogartikel auf Deutsch basierend auf diesem aktuell heiß diskutierten Thema aus der WordPress-Community:

HAUPTTHEMA: "${topPost.title}"
Quelle: ${topPost.url}
Kontext: ${topPost.selftext}

Weitere aktuelle Themen der Community (zur Einordnung):
${relatedTitles}

Anforderungen an den Artikel:
- Sprache: Deutsch (klar, professionell, aber zugänglich) — immer die Sie-Form verwenden, niemals du/dich/dir/dein
- Laenge: Mindestens 800 Wörter, gerne mehr
- Fokus: Geh TIEF auf das spezifische Thema ein — nicht generisch, sondern konkret und nuetzlich
- Struktur: Mehrere H2-Abschnitte mit echtem Inhalt, keine Füllwörter
- Stil: Praktisch und handlungsorientiert — der Leser soll etwas lernen und mitnehmen
- Zielgruppe: WordPress-Nutzer und kleine Unternehmen in Frankfurt und Umgebung
- Erkläre: Was war ursprünglich geplant, warum wurde Echtzeit-Kollaboration entfernt, was ist stattdessen in 7.0 enthalten, wann kommt die Funktion (7.1 August 2026), wie sollen Teams bis dahin zusammenarbeiten
- Am Ende: Kurzer Hinweis, dass Frankfurt Marketing Studio bei solchen Themen hilft
- Externe Links: Baue maximal 3 externe Links natürlich in den Fließtext ein — nur zur offiziellen WordPress-Dokumentation, zu make.wordpress.org oder zu searchenginejournal.com. Format: [Linktext](https://...) direkt im Text.
- Interner Link zur Homepage: Baue genau einen internen Link zur Homepage ein ([Linktext](/)) — natürlich im Fließtext, wo er thematisch passt. Nutze GENAU diesen Ankertext: "${anchorText}" — passe ihn grammatikalisch an den Satz an, aber behalte alle Wörter bei.

Gib NUR den Markdown-Inhalt des Artikels zurück (ab der ersten Überschrift mit ##, kein Frontmatter, kein Titel als H1). Fang direkt mit einem einleitenden Absatz an, dann die H2-Abschnitte.`;

  console.log('Generating post with Claude...');
  const content = await callClaude(prompt);

  const slug = 'wordpress-7-0-echtzeit-kollaboration';

  const metaPrompt = `Basierend auf diesem WordPress-Thema: "WordPress 7.0 released ohne Echtzeit-Kollaboration – Feature kurz vor Release entfernt"

Gib mir im folgenden Format:
TITEL: [Ein prägnanter, klickstarker deutschen Blogtitel, max 70 Zeichen]
EXCERPT: [Ein ansprechender Teasertext, 1-2 Sätze, max 160 Zeichen]

Nur diese zwei Zeilen, nichts anderes.`;

  const metaRaw = await callClaude(metaPrompt);
  const titleMatch = metaRaw.match(/TITEL:\s*(.+)/);
  const excerptMatch = metaRaw.match(/EXCERPT:\s*(.+)/);
  const title = titleMatch ? titleMatch[1].trim() : 'WordPress 7.0: Echtzeit-Kollaboration kurzfristig gestrichen';
  const excerpt = excerptMatch ? excerptMatch[1].trim() : 'WordPress 7.0 ist da – aber ohne Echtzeit-Kollaboration. Was steckt dahinter und wann kommt das Feature?';

  const sourceList = [topPost, ...relatedPosts]
    .map((p) => `- [${p.title}](${p.url}) — r/wordpress`)
    .join('\n');

  const today = new Date().toISOString().slice(0, 10);

  const frontmatter = `---
publishDate: ${today}T00:00:00Z
title: ${yamlString(title)}
excerpt: ${yamlString(excerpt)}
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - Frankfurt
metadata:
  canonical: ${SITE_URL}/${slug}
---

`;

  const outputPath = path.join(OUTPUT_DIR, `${slug}.md`);

  try {
    await fs.access(outputPath);
    console.log(`Post already exists: ${outputPath}`);
    return;
  } catch {
    // File doesn't exist yet — expected.
  }

  await fs.writeFile(outputPath, frontmatter + content + `\n\n## Quellen\n\n${sourceList}\n`, 'utf8');
  console.log(`Created ${outputPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
