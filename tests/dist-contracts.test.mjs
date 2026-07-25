import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Contracts over the built output rather than over source text.
 *
 * These assert what a crawler and a JS-less reader actually receive. That makes them
 * survive refactors that move markup between components — unlike assertions pinned to
 * Tailwind class strings, which lock in formatting and, in at least one case in
 * site-contracts.test.mjs, locked in classes that emit no CSS at all.
 *
 * Requires a prior `npm run build`.
 */

const SITE_URL = 'https://vivienperrelle.com';
const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const MANIFEST = fileURLToPath(new URL('../src/routeManifest.js', import.meta.url));

const htmlFiles = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        if (entry.isDirectory()) return htmlFiles(full);
        return entry.name.endsWith('.html') ? [full] : [];
    });

const filesUnder = (dir) =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = join(dir, entry.name);
        return entry.isDirectory() ? filesUnder(full) : [full];
    });

/** dist/blog/foo/index.html -> /blog/foo ; dist/index.html -> / ; dist/404.html -> /404 */
const routeOf = (file) => {
    const rel = relative(DIST, file).replaceAll('\\', '/');
    if (rel === 'index.html') return '/';
    if (rel === '404.html') return '/404';
    return `/${rel.replace(/\/index\.html$/, '')}`;
};

const manifestRoutes = () =>
    [...readFileSync(MANIFEST, 'utf8').matchAll(/path: '([^']+)'/g)].map((m) => m[1]);

const pages = existsSync(DIST)
    ? htmlFiles(DIST).map((file) => ({ file, route: routeOf(file), html: readFileSync(file, 'utf8') }))
    : [];

test('the build output exists and covers every manifest route', () => {
    assert.ok(pages.length > 0, 'dist/ is empty — run `npm run build` first');
    const built = new Set(pages.map((p) => p.route));
    for (const route of manifestRoutes()) {
        assert.ok(built.has(route), `route ${route} produced no HTML file`);
    }
    assert.equal(pages.length, manifestRoutes().length);
});

test('the build output is newer than its source inputs', () => {
    assert.ok(pages.length > 0, 'dist/ is empty — run `npm run build` first');

    const root = fileURLToPath(new URL('../', import.meta.url));
    const inputs = [
        ...filesUnder(join(root, 'src')),
        join(root, 'index.html'),
        join(root, 'package.json'),
        join(root, 'package-lock.json'),
        join(root, 'vite.config.js'),
        join(root, 'scripts', 'build.mjs'),
        join(root, 'scripts', 'sitemap.mjs'),
        join(root, 'public', 'sitemap.xml'),
    ];
    const newestInput = Math.max(...inputs.map((file) => statSync(file).mtimeMs));
    const oldestPage = Math.min(...pages.map(({ file }) => statSync(file).mtimeMs));

    assert.ok(
        oldestPage >= newestInput,
        'dist/ is older than a build input — run `npm run build` before `npm test`',
    );
});

test('every indexable route is reachable from another prerendered page', () => {
    // A route present in the sitemap but with no inbound <a href> anywhere is invisible
    // to a crawler following links. Three project routes were in exactly that state:
    // Projects.jsx kept them behind a useState-driven "Load more", so they never reached
    // the static markup.
    const orphans = manifestRoutes()
        .filter((route) => route !== '/' && route !== '/404')
        .filter((route) => !pages.some((p) => p.route !== route && p.html.includes(`href="${route}"`)));

    assert.deepEqual(orphans, [], `routes with no inbound link: ${orphans.join(', ')}`);
});

test('each page canonical points at that page', () => {
    for (const { route, html } of pages) {
        const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];

        if (/<meta name="robots" content="noindex/.test(html)) {
            // A canonical alongside noindex sends contradictory signals.
            assert.equal(canonical, undefined, `${route} is noindex but declares a canonical`);
            continue;
        }

        assert.equal(canonical, `${SITE_URL}${route}`, `${route} canonical mismatch`);
    }
});

const jsonLdBlocks = (html) =>
    [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));

test('the site entity graph is declared on the homepage only', () => {
    // Omitting SEO's `url` prop used to fall back to DEFAULT_JSON_LD, so /404 shipped
    // the same Person+Service+WebSite @graph as the homepage. The check is on the
    // top-level @graph, not on the string "Person": a nested author:{@type:Person} is
    // correct schema.org and appears on nearly every page.
    for (const { route, html } of pages) {
        const hasGraph = jsonLdBlocks(html).some((block) => Array.isArray(block['@graph']));
        assert.equal(hasGraph, route === '/', `${route} should${route === '/' ? '' : ' not'} carry the site entity @graph`);
    }
});

test('structured data is valid JSON and attributed to its own page', () => {
    // mainEntityOfPage is the field that claims "this entity is this page", so it is
    // the one that must agree with the route. A top-level `url` is not: /projects/finexov
    // legitimately describes a product whose url is the external Finexov site.
    let checked = 0;

    for (const { route, html } of pages) {
        for (const block of jsonLdBlocks(html)) {
            const main = block.mainEntityOfPage;
            if (!main) continue;
            const declared = typeof main === 'string' ? main : main['@id'];
            assert.equal(declared, `${SITE_URL}${route}`, `${route} attributes its main entity to ${declared}`);
            checked += 1;
        }
    }

    assert.ok(checked >= 20, `expected the article pages to declare mainEntityOfPage, only ${checked} did`);
});

test('the contact address is a real mailto in the static markup', () => {
    const home = pages.find((p) => p.route === '/');
    assert.match(home.html, /href="mailto:[^"@]+@[^"]+"/);
    assert.doesNotMatch(home.html, /<a[^>]+href="#"/, 'a dead href="#" anchor shipped in the prerendered HTML');
});

test('each page has exactly one h1 and at most one main landmark', () => {
    for (const { route, html } of pages) {
        const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
        const main = (html.match(/<main[\s>]/g) ?? []).length;
        assert.equal(h1, 1, `${route} has ${h1} h1 elements`);
        assert.ok(main <= 1, `${route} has ${main} main landmarks`);
    }
    // 22 of 27 routes still render no <main>: article pages return a bare <article>.
    // ArticleLayout fixes that in phase 2, at which point this tightens to `=== 1`.
});

test('an inline SVG title is an accessible name, not the document title', () => {
    // prerender.jsx lifts React-hoisted <title>/<meta>/<link> out of the rendered body.
    // <title> is also a legitimate SVG child, so without masking the SVG subtrees an
    // inline figure loses its accessible name — and one rendered before <SEO> would
    // take over the page's document title.
    const article = pages.find((p) => p.route === '/blog/designing-protein-experiments-for-epistasis');

    assert.match(article.html, /<svg[^>]*role="img"[^>]*aria-labelledby=/);
    assert.match(article.html, /<title id="[^"]*">Loop-count selection at a fixed budget of 3<\/title>/);

    for (const { route, html } of pages) {
        const head = html.replace(/<!--[\s\S]*?-->/g, '').slice(0, html.indexOf('</head>'));
        assert.equal((head.match(/<title>/g) ?? []).length, 1, `${route} does not have exactly one document title`);
    }
});

test('the main content of an article is present without JavaScript', () => {
    const article = pages.find((p) => p.route === '/blog/designing-protein-experiments-for-epistasis');
    assert.ok(article, 'flagship article was not prerendered');
    const body = article.html.replace(/<script[\s\S]*?<\/script>/g, '');
    assert.ok(body.length > 20_000, `prerendered body is only ${body.length} bytes — content is not in the static HTML`);
});
