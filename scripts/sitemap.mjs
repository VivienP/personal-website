import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { routeDefinitions } from '../src/routeManifest.js';

const SITE_URL = 'https://vivienperrelle.com';
const SITEMAP_PATH = new URL('../public/sitemap.xml', import.meta.url);

export const renderSitemap = () => {
    const urls = routeDefinitions
        .filter(({ sitemap = true }) => sitemap)
        .map(({ path, lastmod }) => [
            '  <url>',
            `    <loc>${SITE_URL}${path === '/' ? '/' : path}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            '  </url>',
        ].join('\n'));

    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls,
        '</urlset>',
    ].join('\n');
};

export const assertSitemapCurrent = async () => {
    const committed = await readFile(SITEMAP_PATH, 'utf8');
    const expected = `${renderSitemap()}\n`;
    if (committed.replaceAll('\r\n', '\n') !== expected) {
        throw new Error('public/sitemap.xml is stale. Run `npm run sitemap` and commit the result.');
    }
};

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
    await writeFile(SITEMAP_PATH, `${renderSitemap()}\n`, 'utf8');
}
