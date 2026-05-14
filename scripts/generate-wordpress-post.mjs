import fs from 'node:fs/promises';
import path from 'node:path';

const SUBREDDIT = 'wordpress';
const POSTS_PER_FETCH = 25;
const OUTPUT_DIR = 'src/content/post';
const SITE_URL = 'https://frankfurtmarketingstudio.de';
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
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80);

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

const getRedditPosts = async () => {
  const accessToken = await getRedditAccessToken();
  const url = accessToken
    ? `https://oauth.reddit.com/r/${SUBREDDIT}/hot?limit=${POSTS_PER_FETCH}`
    : `https://www.reddit.com/r/${SUBREDDIT}/hot.json?limit=${POSTS_PER_FETCH}`;
  const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  const json = await fetchJson(url, headers);
  const posts = json?.data?.children ?? [];

  return posts
    .filter((post) => post.data?.title && !post.data.stickied && !post.data.over_18)
    .map((post) => ({
      title: sanitizeText(post.data.title),
      url: `https://www.reddit.com${post.data.permalink}`,
      score: post.data.score ?? 0,
      comments: post.data.num_comments ?? 0,
      selftext: sanitizeText(post.data.selftext ?? ''),
    }))
    .sort((a, b) => b.score + b.comments * 2 - (a.score + a.comments * 2))
    .slice(0, 12);
};

const detectTopic = (posts) => {
  const combined = posts
    .slice(0, 5)
    .map((p) => p.title.toLowerCase())
    .join(' ');

  if (combined.includes('plugin') || combined.includes('plugins')) {
    return {
      title: 'Die besten WordPress Plugins: Worauf es wirklich ankommt',
      slug: `wordpress-plugins-${new Date().toISOString().slice(0, 10)}`,
      tag: 'WordPress Plugins',
      intro:
        'WordPress lebt von seinen Plugins — aber zu viele oder falsch gewaehlte Plugins koennen eine Website verlangsamen oder unsicher machen.',
      sections: [
        {
          heading: 'Wann braucht man ein Plugin?',
          body: 'Nicht jede Funktion braucht ein Plugin. Pruefe zuerst, ob WordPress die Funktion bereits eingebaut hat. Weniger aktive Plugins bedeuten weniger Angriffsvektoren und schnellere Ladezeiten.',
        },
        {
          heading: 'Worauf bei der Plugin-Wahl achten?',
          body: 'Achte auf aktive Entwicklung, gute Bewertungen und Kompatibilitaet mit der aktuellen WordPress-Version. Plugins, die seit ueber einem Jahr nicht aktualisiert wurden, koennen ein Sicherheitsrisiko darstellen.',
        },
        {
          heading: 'Plugin-Konflikte erkennen und loesen',
          body: 'Wenn die Website nach einer Plugin-Installation Probleme macht, deaktiviere alle Plugins und reaktiviere sie einzeln. So laesst sich der Verursacher schnell finden.',
        },
      ],
      checks: [
        'Wird das Plugin aktiv gepflegt?',
        'Wie viele aktive Installationen hat es?',
        'Gibt es Support-Antworten im Repository?',
        'Verlangsamt das Plugin die Seite messbar?',
      ],
    };
  }

  if (combined.includes('woocommerce') || combined.includes('shop') || combined.includes('ecommerce')) {
    return {
      title: 'WooCommerce: Was du vor dem Start wissen solltest',
      slug: `woocommerce-tipps-${new Date().toISOString().slice(0, 10)}`,
      tag: 'WooCommerce',
      intro:
        'WooCommerce macht WordPress zum vollstaendigen Online-Shop — aber eine gute Planung vor dem Launch spart spaeter viel Aufwand.',
      sections: [
        {
          heading: 'Hosting richtig waehlen',
          body: 'WooCommerce braucht mehr Ressourcen als ein normales Blog. Shared Hosting reicht fuer kleine Shops, fuer groessere Kataloge empfiehlt sich ein dedizierter Managed-WordPress-Host.',
        },
        {
          heading: 'Zahlungsanbieter integrieren',
          body: 'PayPal, Stripe und Klarna sind die haeufigsten Zahlungsanbieter in Deutschland. Pruefe, welche Anbieter deine Zielgruppe bevorzugt und welche Gebuehren anfallen.',
        },
        {
          heading: 'Performance im Shop',
          body: 'Jede Sekunde laengere Ladezeit kostet Conversions. Nutze Caching-Plugins, optimiere Produktbilder und teste mit Google PageSpeed Insights.',
        },
      ],
      checks: [
        'Ist das Hosting fuer WooCommerce optimiert?',
        'Sind alle Zahlungsanbieter korrekt konfiguriert?',
        'Laeuft der Checkout auf mobilen Geraeten reibungslos?',
        'Sind steuerliche Einstellungen fuer Deutschland korrekt?',
      ],
    };
  }

  if (combined.includes('block') || combined.includes('gutenberg') || combined.includes('fse') || combined.includes('full site')) {
    return {
      title: 'Gutenberg und Full Site Editing: WordPress ohne Page Builder',
      slug: `gutenberg-full-site-editing-${new Date().toISOString().slice(0, 10)}`,
      tag: 'Gutenberg',
      intro:
        'Full Site Editing bringt die Block-Logik von Gutenberg auf das gesamte Theme. Das veraendert, wie WordPress-Websites gebaut werden.',
      sections: [
        {
          heading: 'Was ist Full Site Editing?',
          body: 'Mit FSE koennen Header, Footer und globale Layouts direkt im Block-Editor bearbeitet werden — ohne PHP oder separate Theme-Templates anfassen zu muessen.',
        },
        {
          heading: 'Klassische Themes vs. Block-Themes',
          body: 'Klassische Themes mit Child-Theme oder Page-Buildern funktionieren weiterhin. Block-Themes sind der neue Standard, erfordern aber ein Umdenken in der Theme-Entwicklung.',
        },
        {
          heading: 'Wann lohnt sich der Umstieg?',
          body: 'Fuer Neuprojekte ist ein Block-Theme oft die bessere Wahl. Fuer bestehende Sites mit viel Custom-Logik ist eine Migration aufwaendig und nicht immer sinnvoll.',
        },
      ],
      checks: [
        'Unterstuetzt das Theme Full Site Editing?',
        'Koennen alle benoetigten Layouts mit Bloecken umgesetzt werden?',
        'Sind Custom-Bloecke fuer wiederkehrende Elemente angelegt?',
        'Ist der Block-Editor fuer Redakteure einfach genug?',
      ],
    };
  }

  if (combined.includes('security') || combined.includes('hack') || combined.includes('malware') || combined.includes('vulnerability')) {
    return {
      title: 'WordPress Sicherheit: Die wichtigsten Massnahmen gegen Angriffe',
      slug: `wordpress-sicherheit-${new Date().toISOString().slice(0, 10)}`,
      tag: 'WordPress Sicherheit',
      intro:
        'WordPress ist das weltweit meistgenutzte CMS — und deshalb auch ein beliebtes Ziel fuer Angreifer. Wer die Grundlagen der Absicherung kennt, kann die meisten Angriffe verhindern.',
      sections: [
        {
          heading: 'Updates als erste Verteidigungslinie',
          body: 'Die meisten erfolgreichen Angriffe nutzen bekannte Sicherheitsluecken in veralteten Plugins oder WordPress-Core. Automatische Updates fuer Core und Plugins sind Pflicht.',
        },
        {
          heading: 'Starke Passwoerter und Zwei-Faktor-Authentifizierung',
          body: 'Brute-Force-Angriffe auf Login-Seiten sind alltaeglich. Verwende starke, einzigartige Passwoerter und aktiviere 2FA fuer alle Admin-Konten.',
        },
        {
          heading: 'Backups und Monitoring',
          body: 'Regelmaessige Backups an einem externen Speicherort sind die letzte Absicherung. Tools wie Jetpack, UpdraftPlus oder ManageWP automatisieren das.',
        },
      ],
      checks: [
        'Sind WordPress-Core, Themes und Plugins aktuell?',
        'Ist der Standard-Admin-Benutzername geaendert?',
        'Gibt es automatische Backups auf einem externen Speicher?',
        'Ist ein Sicherheits-Plugin wie Wordfence aktiv?',
      ],
    };
  }

  if (combined.includes('speed') || combined.includes('performance') || combined.includes('slow') || combined.includes('cache')) {
    return {
      title: 'WordPress Performance: So wird deine Website schneller',
      slug: `wordpress-performance-${new Date().toISOString().slice(0, 10)}`,
      tag: 'WordPress Performance',
      intro:
        'Eine langsame WordPress-Website verliert Besucher und Rankings. Mit den richtigen Massnahmen laesst sich die Ladezeit deutlich verbessern.',
      sections: [
        {
          heading: 'Caching richtig einsetzen',
          body: 'Ein Caching-Plugin wie WP Super Cache oder W3 Total Cache speichert fertig generierte Seiten und reduziert die Serverlast erheblich. Fuer das beste Ergebnis kombiniere es mit einem CDN.',
        },
        {
          heading: 'Bilder optimieren',
          body: 'Unkomprimierte Bilder sind oft die groesste Bremse. Nutze WebP-Format und lazy loading. Plugins wie Imagify oder ShortPixel automatisieren die Komprimierung.',
        },
        {
          heading: 'Hosting und Datenbank',
          body: 'Guenstiges Shared Hosting hat oft zu wenig Ressourcen fuer WordPress. Regelmaessiges Datenbankoptimieren und ein schnelles Hosting verbessern die Time-to-First-Byte spuerbar.',
        },
      ],
      checks: [
        'Ist ein Caching-Plugin aktiv und korrekt konfiguriert?',
        'Werden alle Bilder in modernen Formaten ausgeliefert?',
        'Sind Skripte und Stylesheets minimiert?',
        'Zeigt Google PageSpeed Insights gute Core Web Vitals?',
      ],
    };
  }

  if (combined.includes('theme') || combined.includes('design') || combined.includes('template')) {
    return {
      title: 'Das richtige WordPress Theme waehlen: Worauf es ankommt',
      slug: `wordpress-theme-waehlen-${new Date().toISOString().slice(0, 10)}`,
      tag: 'WordPress Themes',
      intro:
        'Das Theme bestimmt Aussehen und Performance deiner WordPress-Website. Die Wahl sollte nicht nur nach Optik, sondern auch nach technischer Qualitaet getroffen werden.',
      sections: [
        {
          heading: 'Kostenloses vs. Premium Theme',
          body: 'Kostenlose Themes aus dem WordPress-Repository werden geprueft und sind sicher. Premium-Themes bieten oft mehr Optionen, koennen aber auch aufgeblaehter und langsamer sein.',
        },
        {
          heading: 'Performance als Auswahlkriterium',
          body: 'Lade das Demo des Themes und teste es mit PageSpeed Insights, bevor du kaufst. Viele optisch aufwendige Themes laden zu viele Ressourcen und bremsen die Seite.',
        },
        {
          heading: 'Kompatibilitaet mit Plugins',
          body: 'Pruefe, ob das Theme mit den Plugins kompatibel ist, die du benoetigst — besonders WooCommerce, SEO-Plugins und Caching-Loesungen.',
        },
      ],
      checks: [
        'Ist das Theme fuer aktuelle WordPress-Versionen optimiert?',
        'Gibt es regelmaessige Updates vom Entwickler?',
        'Ist die Performance im Test akzeptabel?',
        'Unterstuetzt es das bevorzugte Page-Builder-Plugin?',
      ],
    };
  }

  // Default: general WordPress tips
  return {
    title: `WordPress aktuell: Was die Community gerade beschaeftigt`,
    slug: `wordpress-tipps-${new Date().toISOString().slice(0, 10)}`,
    tag: 'WordPress',
    intro:
      'Die WordPress-Community diskutiert taeglich ueber Probleme, Best Practices und neue Entwicklungen. Ein Blick auf aktuelle Themen zeigt, was WordPress-Nutzer gerade beschaeftigt.',
    sections: [
      {
        heading: 'WordPress sauber halten',
        body: 'Regelmassige Updates, aufgeraeuemte Plugins und eine optimierte Datenbank halten WordPress stabil und sicher. Entferne Plugins und Themes, die du nicht verwendest.',
      },
      {
        heading: 'Content Workflow optimieren',
        body: 'Der Gutenberg-Editor bietet mit Reusable Blocks und Templates Moeglichkeiten, den Redaktionsworkflow zu beschleunigen. Gut geplante Block-Bibliotheken sparen langfristig Zeit.',
      },
      {
        heading: 'WordPress als Plattform fuer lokale Unternehmen',
        body: 'Fuer Unternehmen in Frankfurt und der Rhein-Main-Region ist WordPress oft die beste Wahl: kostenguenstig, flexibel und mit guter Plugin-Unterstuetzung fuer lokale SEO.',
      },
    ],
    checks: [
      'Sind alle Updates eingespielt?',
      'Laufen unnoetigen Plugins noch?',
      'Ist die Datenbank optimiert?',
      'Wie ist die aktuelle Ladezeit der Website?',
    ],
  };
};

const makePost = (posts, topic) => {
  const primaryPost = posts[0];
  const checklist = topic.checks.map((item) => `- ${item}`).join('\n');
  const sourceList = posts
    .slice(0, 5)
    .map((post) => `- [${post.title}](${post.url}) - r/wordpress`)
    .join('\n');
  const sectionsMarkdown = topic.sections
    .map((s) => `## ${s.heading}\n\n${s.body}`)
    .join('\n\n');

  return `---
title: ${yamlString(topic.title)}
excerpt: ${yamlString(topic.intro + ' Ein Ueberblick fuer WordPress-Nutzer in Frankfurt.')}
image: /images/seo-frankfurt.jpg
category: wordpress
tags:
  - WordPress
  - ${topic.tag}
  - Frankfurt
metadata:
  canonical: ${SITE_URL}/${topic.slug}
---

${topic.intro}

Ausgangspunkt sind aktuelle Diskussionen bei [r/wordpress](https://www.reddit.com/r/wordpress/): [${primaryPost.title}](${primaryPost.url}). Diese Themen zeigen, womit sich WordPress-Nutzer gerade beschaeftigen.

${sectionsMarkdown}

## Checkliste

${checklist}

## Fazit fuer Unternehmen in Frankfurt

Eine gut gepflegte WordPress-Website ist eine solide Grundlage fuer Online-Marketing. Wer regelmaessig aktualisiert, performant bleibt und die richtigen Tools einsetzt, hat gegenueber Wettbewerbern einen klaren Vorteil — auch in der lokalen Suche.

Bei Fragen zur WordPress-Entwicklung oder -Optimierung fuer dein Unternehmen in Frankfurt kannst du uns gerne kontaktieren.

## Quellen

${sourceList}

Dieser Beitrag wurde auf Basis aktueller Diskussionen in der WordPress-Community erstellt und fuer Frankfurtmarketingstudio.de redaktionell aufbereitet.
`;
};

const run = async () => {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  let posts = [];
  try {
    posts = await getRedditPosts();
    console.log(`Fetched ${posts.length} posts from r/wordpress`);
  } catch (error) {
    throw new Error(`Failed to fetch r/wordpress: ${error.message}`);
  }

  if (posts.length < 3) {
    throw new Error(`Not enough posts from r/wordpress. Got ${posts.length}.`);
  }

  const topic = detectTopic(posts);
  const outputPath = path.join(OUTPUT_DIR, `${topic.slug}.md`);

  try {
    await fs.access(outputPath);
    if (!isDryRun) {
      console.log(`Post already exists: ${outputPath}`);
      return;
    }
  } catch {
    // File doesn't exist yet — expected.
  }

  if (isDryRun) {
    console.log(makePost(posts, topic).slice(0, 3000));
    console.log(`\nDry run complete. Would create ${outputPath}`);
    return;
  }

  const content = makePost(posts, topic);
  await fs.writeFile(outputPath, content, 'utf8');
  console.log(`Created ${outputPath}`);
};

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
