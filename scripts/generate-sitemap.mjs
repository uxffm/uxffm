// Manual sitemap generator. Run on demand: `npm run build` first, then `node scripts/generate-sitemap.mjs`.
// Scans the built `dist/` for pages and writes a single dist/sitemap.xml + public/sitemap.xml.
// Astro's own sitemap integration is intentionally disabled — this file is the only sitemap.
import fs from 'node:fs';
import path from 'node:path';

const SITE = 'https://frankfurtmarketingstudio.de';
const DIST = 'dist';
const POST_DIR = 'src/content/post';

// Pages to keep out of the sitemap: 301-redirects, the CMS admin, and anything
// Disallow'd in robots.txt (listing a blocked URL is a contradictory signal).
const EXCLUDE = new Set([
  '/programmierer-frankfurt',
  '/app-entwicklung-frankfurt',
  '/html5-banner-agentur',
  '/website-designer-frankfurt',
  '/wordpress-frankfurt',
  '/service/wordpress-frankfurt',
  '/website-monatlich-bezahlen',
  '/404',
  '/decapcms',
  '/imoportant',
  '/datenschutz',
  '/danke',
]);

// Build slug -> lastmod (from post publishDate) so article URLs carry a date.
const postLastmod = {};
for (const file of fs.readdirSync(POST_DIR)) {
  if (!/\.mdx?$/.test(file)) continue;
  const raw = fs.readFileSync(path.join(POST_DIR, file), 'utf8');
  const fm = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) continue;
  const slugM = fm[1].match(/^slug:\s*["']?([^"'\n\r]+)["']?/m);
  const dateM = fm[1].match(/^publishDate:\s*["']?([^"'\n\r]+)["']?/m);
  const slug = (slugM ? slugM[1] : file.replace(/\.mdx?$/, '')).trim();
  if (!dateM) continue;
  const d = new Date(dateM[1].trim());
  if (Number.isNaN(d.getTime())) continue; // guard malformed dates
  postLastmod['/' + slug] = d.toISOString().slice(0, 10);
}

// Collect URLs from every generated index.html in dist.
const urls = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (entry.name === 'index.html') {
      let pathname = '/' + path.relative(DIST, dir).split(path.sep).join('/');
      if (pathname === '/.') pathname = '/';
      pathname = pathname.replace(/\/$/, '') || '/';
      if (EXCLUDE.has(pathname)) continue;
      urls.push(pathname);
    }
  }
};
walk(DIST);

urls.sort();

const body = urls
  .map((p) => {
    const loc = `${SITE}${p === '/' ? '/' : p}`;
    const lastmod = postLastmod[p];
    return lastmod
      ? `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
      : `  <url><loc>${loc}</loc></url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml, 'utf8');
fs.writeFileSync(path.join('public', 'sitemap.xml'), xml, 'utf8');
console.log(`Wrote sitemap.xml with ${urls.length} URLs (public/ and dist/).`);
