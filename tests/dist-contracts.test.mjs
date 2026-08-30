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

/** dist/journal/foo/index.html -> /journal/foo ; dist/index.html -> / ; dist/404.html -> /404 */
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

test('every route rendered — no page fell back to an error boundary', () => {
    // renderToString swallows a throwing page into a Suspense fallback and the build
    // still reports success, so a broken route ships as an empty <div id="root">.
    // `<!--$!-->` is React's marker for exactly that. One undefined component in
    // /freelance-ai-engineer-biology got through the build this way.
    for (const { route, html } of pages) {
        assert.doesNotMatch(html, /<!--\$!-->/, `${route} threw during prerendering and shipped an error fallback`);
    }
});

test('each page has exactly one h1 and exactly one main landmark', () => {
    for (const { route, html } of pages) {
        const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
        const main = (html.match(/<main[\s>]/g) ?? []).length;
        assert.equal(h1, 1, `${route} has ${h1} h1 elements`);
        assert.equal(main, 1, `${route} has ${main} main landmarks`);
    }
});

test('no page skips a heading level', () => {
    // Screen-reader users navigate by heading level; a jump from h1 to h3 reads as a
    // missing section. Checked on the output because headings come from several
    // components (ArticleLayout's children, AuthorBio, the collection lists).
    for (const { route, html } of pages) {
        const levels = [...html.matchAll(/<h([1-6])[\s>]/g)].map((match) => Number(match[1]));
        assert.equal(levels[0], 1, `${route} opens on h${levels[0]} instead of its h1`);
        for (let i = 1; i < levels.length; i += 1) {
            assert.ok(
                levels[i] <= levels[i - 1] + 1,
                `${route} jumps from h${levels[i - 1]} to h${levels[i]}`,
            );
        }
    }
});

test('every article returns to the collection it belongs to', () => {
    // The back link moved into ArticleLayout; what matters is that each piece still
    // offers the way out, and that a Journal entry goes back to the Journal rather
    // than to the homepage.
    const collectionOf = (route) => {
        if (route.startsWith('/journal/')) return { href: '/journal', label: 'Journal' };
        if (route.startsWith('/academic-work/')) return { href: '/academic-work', label: 'Academic Work' };
        if (route.startsWith('/projects/')) return { href: '/', label: 'Back' };
        return null;
    };

    let checked = 0;
    for (const { route, html } of pages) {
        const collection = collectionOf(route);
        if (!collection) continue;
        assert.match(
            html,
            new RegExp(`<a[^>]+href="${collection.href}"[^>]*>(?:(?!</a>)[\\s\\S])*<span>${collection.label}</span>`),
            `${route} has no back link to ${collection.href}`,
        );
        checked += 1;
    }
    assert.ok(checked >= 20, `expected every article page to be covered, only ${checked} were`);
});

test('the collection pages return home and the gallery toggle is a real button', () => {
    for (const route of ['/journal', '/academic-work']) {
        const page = pages.find((p) => p.route === route);
        assert.match(
            page.html,
            /<a[^>]+href="\/"[^>]*>(?:(?!<\/a>)[\s\S])*<span>Home<\/span>/,
            `${route} does not offer a way home`,
        );
    }

    const art = pages.find((p) => p.route === '/art');
    assert.match(art.html, /<button[^>]+aria-pressed="(?:true|false)"/, 'the framed/unframed toggle is not a button with a pressed state');
});

test('an inline SVG title is an accessible name, not the document title', () => {
    // prerender.jsx lifts React-hoisted <title>/<meta>/<link> out of the rendered body.
    // <title> is also a legitimate SVG child, so without masking the SVG subtrees an
    // inline figure loses its accessible name — and one rendered before <SEO> would
    // take over the page's document title.
    const article = pages.find((p) => p.route === '/journal/designing-protein-experiments-for-epistasis');

    assert.match(article.html, /<svg[^>]*role="img"[^>]*aria-labelledby=/);
    assert.match(article.html, /<title id="[^"]*">Loop-count selection at a fixed budget of 3<\/title>/);

    for (const { route, html } of pages) {
        const head = html.replace(/<!--[\s\S]*?-->/g, '').slice(0, html.indexOf('</head>'));
        assert.equal((head.match(/<title>/g) ?? []).length, 1, `${route} does not have exactly one document title`);
    }
});

test('every Journal article shows one byline: author, publication date, reading time', async () => {
    // The reading time is recorded in src/data/journalArticles.js rather than computed at
    // render time, so it can drift away from the prose it describes. Hold it against the
    // real prerendered word count, and keep revision dates out of the reader's first line.
    const { journalArticles } = await import('../src/data/journalArticles.js');
    const { measureJournal } = await import('../scripts/reading-time.mjs');

    const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    for (const { date, slug, readingMinutes } of journalArticles) {
        const page = pages.find((p) => p.route === `/journal/${slug}`);
        assert.ok(page, `/journal/${slug} was not prerendered`);

        const [year, month, day] = date.split('-').map(Number);
        const byline = `By Vivien Perrelle · ${MONTHS[month - 1]} ${day}, ${year} · ${readingMinutes} min read`;
        const bylines = page.html.match(/By Vivien Perrelle[^<]*/g) ?? [];

        assert.deepEqual(bylines, [byline], `/journal/${slug} byline mismatch`);
        assert.doesNotMatch(page.html, /updated \w+ \d+, \d{4}/, `/journal/${slug} shows a revision date`);
    }

    for (const { slug, words, measured, recorded } of measureJournal()) {
        assert.ok(
            Math.abs(measured - recorded) <= 1,
            `/journal/${slug} records ${recorded} min but its ${words} words measure ${measured} min`,
        );
    }
});

test('every Journal head derives from the one listing record', async () => {
    // The article files no longer restate their URL, dates, author or headline: they
    // name a slug and src/data/journalArticles.js supplies the rest. This holds the
    // shipped head against that record, which is the only thing the derivation buys.
    const { journalArticles } = await import('../src/data/journalArticles.js');

    for (const { slug, title, date } of journalArticles) {
        const page = pages.find((p) => p.route === `/journal/${slug}`);
        assert.ok(page, `/journal/${slug} was not prerendered`);
        const canonical = `${SITE_URL}/journal/${slug}`;
        const meta = (property) =>
            page.html.match(new RegExp(`<meta property="${property}" content="([^"]*)"`))?.[1];

        assert.equal(meta('og:url'), canonical, `/journal/${slug} og:url disagrees with its canonical`);
        assert.equal(meta('og:type'), 'article');
        assert.equal(meta('article:published_time'), date, `/journal/${slug} publication date disagrees with the listing`);

        const [posting] = jsonLdBlocks(page.html);
        assert.equal(posting.headline, title, `/journal/${slug} headline disagrees with the listing`);
        assert.equal(posting.datePublished, date);
        assert.equal(posting.mainEntityOfPage, canonical);
        assert.equal(posting.author['@id'], `${SITE_URL}/#person`, `/journal/${slug} byline does not resolve to the site person`);
        assert.ok(posting.dateModified >= date, `/journal/${slug} claims a revision older than its publication`);
        // article:modified_time is only meaningful when there has been a revision.
        const modified = meta('article:modified_time');
        assert.equal(modified === undefined, posting.dateModified === date, `/journal/${slug} announces a revision it did not have`);
    }
});

test('lab command article prerenders its approved metadata and evidence', () => {
    const route = '/journal/when-a-lab-command-says-succeeded';
    const article = pages.find((page) => page.route === route);
    assert.ok(article, `${route} was not prerendered`);

    const { html } = article;
    assert.match(html, /<title>When a Lab Command Says SUCCEEDED, What Actually Happened\? \| Vivien Perrelle<\/title>/);
    assert.match(html, /Why reliable lab automation needs action-linked physical evidence and a separate effect state/);
    assert.match(html, /986\/986 operations paired cleanly/);
    assert.match(html, /34\/79 = 43\.04%/);
    assert.match(html, /34\/74 = 45\.95%/);
    assert.match(html, /17\.67%/);
    assert.match(html, /2\.60×/);
    assert.match(html, /37\/74 = 50\.0%/);
    assert.match(html, /51\.1%/);
    assert.match(html, /0\.98×/);
    assert.match(html, /p = 0\.63/);
    assert.match(html, /2\.80–2\.85×/);
    assert.match(html, /unanswerable rather than negative/);
    assert.match(html, /temporal association/);
    assert.match(html, /recipe-engine rows/);
    assert.match(html, /href="https:\/\/github\.com\/VivienP\/lab-log-observability-audit"/);
    assert.match(html, /"codeRepository":"https:\/\/github\.com\/VivienP\/lab-log-observability-audit"/);
    assert.match(html, /versioned release 21535243/);
    assert.match(html, /The design requirement is not simply more logging/);
    assert.doesNotMatch(html, /If you operate Chemspeed/);
    assert.doesNotMatch(html, /answered by practitioners|testing one question with practitioners|next three real laboratory automation stacks/);
    assert.doesNotMatch(html, /17 of the 79 windows|only eight contained|Recovery observability coverage: 43%|event_category/);
    const body = html.match(/<article\b[\s\S]*?<\/article>/)?.[0] ?? '';
    assert.doesNotMatch(body, /—/, 'the rendered article adds an em dash');
});

test('reading times stay out of the project pages', () => {
    for (const { route, html } of pages) {
        if (route.startsWith('/journal/')) continue;
        assert.doesNotMatch(html, /\d+ min read/, `${route} should not carry a reading time`);
    }
});

test('the main content of an article is present without JavaScript', () => {
    const article = pages.find((p) => p.route === '/journal/designing-protein-experiments-for-epistasis');
    assert.ok(article, 'flagship article was not prerendered');
    const body = article.html.replace(/<script[\s\S]*?<\/script>/g, '');
    assert.ok(body.length > 20_000, `prerendered body is only ${body.length} bytes — content is not in the static HTML`);
});

test('numbered figures are captioned in order, under the image they describe', () => {
    const article = pages.find((p) => p.route === '/journal/designing-protein-experiments-for-epistasis');
    // React splits interpolated text with <!-- --> markers; they are invisible to a
    // reader, so the caption is read the way a reader receives it.
    const text = article.html.replace(/<!--[\s\S]*?-->/g, '');
    const numbers = [...text.matchAll(/Figure n°(\d+):/g)].map((match) => Number(match[1]));

    assert.ok(numbers.length >= 4, `only ${numbers.length} numbered figures on the flagship article`);
    assert.deepEqual(
        numbers,
        numbers.map((_, index) => index + 1),
        `figure numbers are not consecutive in reading order: ${numbers.join(', ')}`,
    );
    // The caption belongs to the figure, and follows it: a caption rendered before its
    // image reads as an introduction to the next section instead.
    assert.match(text, /<img[^>]*>\s*<figcaption/, 'no image figure is followed by its caption');
    assert.match(text, /<figcaption[^>]*>[\s\S]{0,160}?Description:/);
});
