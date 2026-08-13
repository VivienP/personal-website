import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { test } from 'node:test';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const optionalImport = async (path) => import(path).catch(() => ({}));
const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const readLossyWebpDimensions = (file) => {
    const body = readFileSync(new URL(`../${file}`, import.meta.url));
    assert.equal(body.subarray(0, 4).toString(), 'RIFF');
    assert.equal(body.subarray(8, 12).toString(), 'WEBP');
    const frameMarker = body.indexOf(Buffer.from([0x9d, 0x01, 0x2a]));
    assert.ok(frameMarker >= 0, `${file} has no VP8 frame marker`);
    return {
        width: body.readUInt16LE(frameMarker + 3) & 0x3fff,
        height: body.readUInt16LE(frameMarker + 5) & 0x3fff,
    };
};

test('email link is exposed synchronously on the activated anchor', async () => {
    const { prepareEmailLink } = await optionalImport('../src/utils/email.js');
    assert.equal(typeof prepareEmailLink, 'function', 'email helper is not implemented');

    const attributes = new Map();
    const anchor = { setAttribute: (name, value) => attributes.set(name, value) };
    const href = prepareEmailLink(anchor);

    assert.equal(href, 'mailto:vivienperrelle@gmail.com');
    assert.equal(attributes.get('href'), href);
});

test('Open Graph image metadata is truthful for defaults and custom images', async () => {
    const { resolveOpenGraphImage } = await optionalImport('../src/components/seoMeta.js');
    assert.equal(typeof resolveOpenGraphImage, 'function', 'SEO image helper is not implemented');

    assert.deepEqual(resolveOpenGraphImage({}), {
        src: 'https://vivienperrelle.com/me.png',
        width: 300,
        height: 300,
    });
    assert.deepEqual(resolveOpenGraphImage({ image: '/custom.jpg' }), {
        src: 'https://vivienperrelle.com/custom.jpg',
    });
    assert.deepEqual(
        resolveOpenGraphImage({ image: '/custom.jpg', imageWidth: 1200, imageHeight: 630 }),
        { src: 'https://vivienperrelle.com/custom.jpg', width: 1200, height: 630 },
    );
});

test('route table uses dynamic loaders and exposes a prerender resolver', () => {
    const source = read('src/routes.jsx');
    assert.doesNotMatch(source, /^import .* from '.\/(?:articles|pages|sections)\//m);
    assert.match(source, /lazy\(definition\.load\)/);
    assert.match(source, /loadPrerenderRoute/);
    assert.match(read('src/prerender.jsx'), /await loadPrerenderRoute\(url\)/);
});

test('client entry creates a dev root and hydrates prerendered pages', () => {
    const source = read('src/main.jsx');

    assert.match(source, /import \{ createRoot, hydrateRoot \} from 'react-dom\/client'/);
    assert.match(
        source,
        /if \(rootElement\.hasChildNodes\(\)\) \{\s*hydrateRoot\(rootElement, app\)\s*\} else \{\s*createRoot\(rootElement\)\.render\(app\)\s*\}/,
    );
});

test('committed sitemap is generated from the route manifest', async () => {
    const { renderSitemap } = await optionalImport('../scripts/sitemap.mjs');
    assert.equal(typeof renderSitemap, 'function', 'sitemap generator is not implemented');
    assert.equal(read('public/sitemap.xml').replaceAll('\r\n', '\n'), `${renderSitemap()}\n`);
});

test('scroll restoration lives in one place and is keyed on the route', () => {
    // ScrollToTop is mounted once, above the router outlet, and reacts to the pathname.
    // The 27 page-level `useEffect(() => window.scrollTo(0, 0), [])` copies it replaced
    // ran on mount only: they could not see a route change, and on every navigation they
    // fired after this one had already done the work.
    const scrollToTop = read('src/components/layout/ScrollToTop.jsx');
    assert.match(scrollToTop, /const \{ pathname \} = useLocation\(\)/);
    assert.match(scrollToTop, /window\.scrollTo\(0, 0\)/);
    assert.match(scrollToTop, /\}, \[pathname\]\)/, 'the reset is not keyed on the route');
    assert.match(read('src/App.jsx'), /<ScrollToTop \/>/);

    const pageFiles = [
        ...readdirSync(new URL('../src/articles/', import.meta.url), { recursive: true })
            .filter((name) => String(name).endsWith('.jsx'))
            .map((name) => `src/articles/${String(name).replaceAll('\\', '/')}`),
        ...readdirSync(new URL('../src/pages/', import.meta.url)).map((name) => `src/pages/${name}`),
        ...readdirSync(new URL('../src/sections/', import.meta.url)).map((name) => `src/sections/${name}`),
    ];

    assert.ok(pageFiles.length >= 30, `expected the page tree to be covered, found ${pageFiles.length} files`);
    for (const file of pageFiles) {
        assert.doesNotMatch(read(file), /window\.scrollTo/, `${file} reimplements the global scroll reset`);
    }
});

test('every article page is framed by the shared layout, not by its own copy of it', () => {
    // The container, the <main> landmark and the back link used to be pasted into each
    // article; the three-word difference between two copies is how /freelance and the
    // collections ended up labelling the same destination differently. ArticleLayout
    // owns the frame — an article that hand-rolls one again is drift, not a variant.
    const articles = readdirSync(new URL('../src/articles/', import.meta.url), { recursive: true })
        .filter((name) => String(name).endsWith('.jsx'))
        .map((name) => `src/articles/${String(name).replaceAll('\\', '/')}`);

    assert.ok(articles.length >= 23, `expected every article to be covered, found ${articles.length}`);

    for (const path of articles) {
        const source = read(path);
        assert.match(source, /<ArticleLayout backTo="[^"]+" backLabel="[^"]+"/, `${path} does not use ArticleLayout`);
        assert.doesNotMatch(source, /<article className=/, `${path} re-implements the article container`);
        assert.doesNotMatch(source, /inline-flex items-center space-x-2 text-sm text-secondary/, `${path} re-implements the back link`);
    }

    // Only two reading measures exist, and they are named rather than spelled as classes.
    const layout = read('src/components/ArticleLayout.jsx');
    assert.match(layout, /<main className=/, 'the layout does not provide the main landmark');
    assert.match(layout, /<article>/, 'the layout drops the article element');
    assert.deepEqual(
        [...layout.matchAll(/^ {4}(\w+): '[^']+',$/gm)].map((match) => match[1]),
        ['wide', 'narrow'],
        'the reading measures are the only presentational choice the layout offers',
    );
});

test('every citation marker resolves and every reference is cited', () => {
    // Reference lists drift out of the prose they support: a numbered entry stays
    // behind after an edit and nothing links to its #ref-N anchor, or a marker
    // survives its reference. Both leave the academic apparatus quietly broken.
    const articles = readdirSync(new URL('../src/articles/', import.meta.url), { recursive: true })
        .filter((name) => String(name).endsWith('.jsx'))
        .map((name) => `src/articles/${String(name).replaceAll('\\', '/')}`);

    const uniqueNumbers = (source, pattern) =>
        [...new Set([...source.matchAll(pattern)].map((match) => Number(match[1])))].sort((a, b) => a - b);

    let checked = 0;

    for (const path of articles) {
        const source = read(path);
        const markers = uniqueNumbers(source, /<Cite n=\{(\d+)\}/g);
        const references = uniqueNumbers(source, /id="ref-(\d+)"/g);
        if (markers.length === 0 && references.length === 0) continue;

        assert.deepEqual(
            references.filter((n) => !markers.includes(n)),
            [],
            `${path} has reference entries nothing cites`,
        );
        assert.deepEqual(
            markers.filter((n) => !references.includes(n)),
            [],
            `${path} cites references that do not exist`,
        );
        checked += 1;
    }

    assert.ok(checked >= 9, `expected the cited articles to be covered, only ${checked} were`);
});

test('unused dependency and dead Header component are removed', () => {
    const packageJson = JSON.parse(read('package.json'));
    assert.equal(packageJson.dependencies['react-tweet'], undefined);
    assert.equal(existsSync(new URL('../src/components/Header.jsx', import.meta.url)), false);
});

test('locked Vite release contains the dev-server file-read patch', () => {
    const lock = JSON.parse(read('package-lock.json'));
    const version = lock.packages['node_modules/vite'].version.split('.').map(Number);
    assert.ok(version[0] > 7 || (version[0] === 7 && (version[1] > 3 || (version[1] === 3 && version[2] >= 2))), `unsafe Vite ${version.join('.')}`);
});

test('direct build and router dependencies meet audited safe minimums', () => {
    const packageJson = JSON.parse(read('package.json'));
    const lock = JSON.parse(read('package-lock.json'));
    assert.equal(packageJson.dependencies['react-router'], '^7.18.1');
    assert.equal(packageJson.dependencies['react-router-dom'], '^7.18.1');
    assert.equal(packageJson.devDependencies.postcss, '^8.5.21');

    const minimums = {
        'node_modules/react-router': [7, 15, 1],
        'node_modules/react-router-dom': [7, 15, 1],
        'node_modules/postcss': [8, 5, 10],
        'node_modules/rollup': [4, 59, 0],
    };

    for (const [name, minimum] of Object.entries(minimums)) {
        const actual = lock.packages[name].version.split('.').map(Number);
        const safe = actual.findIndex((part, index) => part !== minimum[index]);
        assert.ok(safe === -1 || actual[safe] > minimum[safe], `${name} ${actual.join('.')} is below ${minimum.join('.')}`);
    }
});

test('package exposes the regression suite', () => {
    const packageJson = JSON.parse(read('package.json'));
    assert.equal(packageJson.scripts.test, 'node --test');
});

test('epibudget editorial figures are images, not links to their assets', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const figureHelper = article.match(/const Figure = \([\s\S]*?\n\);\r?\n\r?\nconst WhatShouldWeMeasureNext/)?.[0] ?? '';

    assert.ok(figureHelper, 'Figure helper is missing');
    assert.match(figureHelper, /<img\b/);
    assert.doesNotMatch(figureHelper, /<a\b|href=|target=|Open Figure/);
});

test('PKvitality leads with the requested smartwatch video and ends with the internship photo', () => {
    const project = read('src/articles/projects/PKvitality.jsx');
    const video = project.indexOf('src="https://www.youtube.com/embed/VQMigUZQrfE"');
    const introduction = project.indexOf('The <Link to="/projects/biowatch"');
    const contribution = project.indexOf('Working in a multidisciplinary laboratory');
    const photo = project.search(/<img\s+src="\/pkvitality\/pkvitality\.jpg"/);

    assert.ok(video !== -1 && introduction !== -1 && contribution !== -1 && photo !== -1);
    assert.ok(video < introduction && introduction < contribution && contribution < photo);
    assert.match(project, /led directly to an R&amp;D internship at/);
    assert.match(project, /microneedles designed to measure glucose continuously and painlessly in dermal interstitial fluid/);
    assert.match(project, /I ran in vitro tests on electrochemical microneedle CGM prototypes/);
    assert.match(project, /helped guide the team's next R&amp;D iterations/);
    assert.match(project, /<Link to="\/academic-work\/lactate-pharmacokinetics"[^>]*>literature review on lactate pharmacokinetics<\/Link>/);
    assert.match(project, /"video": "https:\/\/www\.youtube\.com\/watch\?v=VQMigUZQrfE"/);
    // The embed is held to the reading measure on purpose: at full column width the
    // 16:9 frame dominated the page. Kept as a class assertion because the constraint
    // is a width and has no other observable form in the static markup.
    assert.match(project, /max-w-\[600px\]/);
    assert.doesNotMatch(project, /4zz6rDdbdZY|Watch the K'Watch presentation|ExternalLink/);
});

test('academic publications cross-link without ResearchGate buttons', () => {
    const lactate = read('src/articles/academic/LactatePharmacokinetics.jsx');
    const thesis = read('src/articles/academic/SmartwatchBiosensorsThesis.jsx');

    assert.match(lactate, /to="\/academic-work\/smartwatch-embedded-biosensors"/);
    assert.match(lactate, /Read the related master's thesis/);
    assert.match(thesis, /to="\/academic-work\/lactate-pharmacokinetics"/);
    assert.match(thesis, /Read the related literature review/);

    for (const publication of [lactate, thesis]) {
        assert.doesNotMatch(publication, /ResearchGate|RESEARCHGATE_URL|ExternalLink|"sameAs"/);
    }
});

test('Journal collection reuses the homepage list and shows one of five interest tags per article', () => {
    const manifest = read('src/routeManifest.js');
    const section = read('src/sections/Journal.jsx');

    assert.equal(existsSync(new URL('../src/pages/Journal.jsx', import.meta.url)), true, 'Journal page is missing');
    assert.equal(existsSync(new URL('../src/data/journalArticles.js', import.meta.url)), true, 'Journal data module is missing');
    assert.equal(existsSync(new URL('../src/components/CollectionListItem.jsx', import.meta.url)), true, 'shared collection item is missing');
    const page = read('src/pages/Journal.jsx');
    const journalData = read('src/data/journalArticles.js');
    const collectionItem = read('src/components/CollectionListItem.jsx');
    const tags = [...journalData.matchAll(/tag: "([^"]+)"/g)].map((match) => match[1]);
    const uniqueTags = [...new Set(tags)].sort();

    assert.match(manifest, /path: '\/journal'.*pages\/Journal\.jsx/);
    assert.match(section, /import \{ journalArticles \} from '\.\.\/data\/journalArticles'/);
    assert.match(section, /import CollectionListItem from '\.\.\/components\/CollectionListItem'/);
    assert.match(section, /export const JournalList/);
    assert.match(section, /<JournalList \/>/);
    assert.match(section, /to=\{`\/journal\/\$\{article\.slug\}`\}/);
    assert.match(section, /tag=\{showTags \? article\.tag : undefined\}/);
    assert.match(section, /<h2[^>]*>Journal<\/h2>/);
    assert.doesNotMatch(section, /<Link to="\/journal"|<ArrowUpRight size=\{18\}/);
    assert.equal(tags.length, 10, 'every Journal article needs exactly one tag');
    assert.deepEqual(uniqueTags, [
        'AI-for-science',
        'Agentic AI',
        'Bioengineering',
        'Entrepreneurship',
        'Technology & society',
    ]);
    assert.ok(
        collectionItem.indexOf('{date}') < collectionItem.indexOf('{tag}') &&
            collectionItem.indexOf('{tag}') < collectionItem.indexOf('{title}'),
        'collection tags must sit below the date and before the title',
    );
    // The date column is the one width that carries meaning: a wrapped "February 20,
    // 2026" breaks the alignment the whole list is built on. The column width, gutter
    // and vertical padding that used to be pinned here are ordinary design decisions.
    assert.match(collectionItem, /whitespace-nowrap/);
    assert.match(page, /<main\b/);
    assert.match(page, /url="\/journal"/);
    assert.match(page, /<JournalList showTags headingLevel="h2" \/>/);
});

test('every Journal article renders the shared byline instead of its own', async () => {
    const { journalArticles } = await optionalImport('../src/data/journalArticles.js');
    const byline = read('src/components/ArticleByline.jsx');
    const files = {
        'epistasis-explained-best-variant-vs-best-experiment': 'src/articles/EpistasisExplained.jsx',
        'designing-protein-experiments-for-epistasis': 'src/articles/WhatShouldWeMeasureNext.jsx',
        'ai-for-science-is-becoming-a-systems-problem': 'src/articles/AIForScienceIsBecomingInfrastructure.jsx',
        'regulators-dont-accept-vibes': 'src/articles/RegulatorsDontAcceptVibes.jsx',
        'science-is-entering-its-agentic-era': 'src/articles/ScienceIsEnteringItsAgenticEra.jsx',
        openclaw: 'src/articles/OpenClaw.jsx',
        'trauma-vs-purpose': 'src/articles/TraumaVsPurpose.jsx',
        'is-technology-neutral': 'src/articles/IsTechnologyNeutral.jsx',
        lactate: 'src/articles/Lactate.jsx',
        'glucose-biosensor': 'src/articles/GlucoseBiosensor.jsx',
        smartwatch: 'src/articles/SmartWatch.jsx',
    };

    // One wording, one typography, one data source: the byline is the same component
    // everywhere and reads its date and reading time from journalArticles.
    assert.match(byline, /`By Vivien Perrelle · \$\{formatPublicationDate\(entry\.date\)\} · \$\{entry\.readingMinutes\} min read`/);
    assert.match(byline, /import \{ getJournalArticle \} from '\.\.\/data\/journalArticles'/);
    assert.doesNotMatch(byline, /updated|modified/i);

    assert.deepEqual(
        journalArticles.map(({ slug }) => slug).sort(),
        Object.keys(files).sort(),
        'the Journal listing and the article files have drifted apart',
    );

    for (const [slug, file] of Object.entries(files)) {
        const source = read(file);
        // The slug is written once per article and reused by the byline and the head.
        assert.match(source, new RegExp(`const SLUG = '${slug}';`), `${file} does not declare its slug once`);
        assert.match(source, /<ArticleByline slug=\{SLUG\} \/>/, `${file} does not use the shared byline`);
        assert.doesNotMatch(source, /<span>By Vivien Perrelle|font-mono text-sm text-secondary">By Vivien/, `${file} still hardcodes a byline`);
    }

    for (const { slug, readingMinutes } of journalArticles) {
        assert.equal(typeof readingMinutes, 'number', `${slug} has no reading time`);
        assert.ok(readingMinutes >= 1 && Number.isInteger(readingMinutes), `${slug} has a nonsensical reading time`);
    }

    // Reading time is a Journal affordance; project pages do not carry one.
    for (const project of ['src/articles/projects/Epibudget.jsx', 'src/articles/projects/ScientificClaimVerifier.jsx', 'src/articles/BioWatch.jsx']) {
        assert.doesNotMatch(read(project), /ArticleByline|min read/);
    }
});

test('Academic Work uses the shared date-tag-title collection item', () => {
    assert.equal(existsSync(new URL('../src/data/academicWorks.js', import.meta.url)), true, 'Academic Work data module is missing');
    const page = read('src/pages/AcademicWork.jsx');
    const section = read('src/sections/AcademicWork.jsx');
    const data = read('src/data/academicWorks.js');

    assert.match(data, /type: "Master Thesis"/);
    assert.match(data, /type: "Literature Review"/);
    for (const source of [page, section]) {
        assert.match(source, /import CollectionListItem from '\.\.\/components\/CollectionListItem'/);
        assert.match(source, /import \{ academicWorks \} from '\.\.\/data\/academicWorks'/);
    }
    assert.match(page, /tag=\{work\.type\}/);
    assert.match(page, /headingLevel="h2"/);
    assert.doesNotMatch(page, /\{work\.date\} · \{work\.type\}/);
    assert.doesNotMatch(section, /tag=\{work\.type\}/);
});

test('Journal articles use coherent URLs and return to the Journal collection', () => {
    const manifest = read('src/routeManifest.js');
    const redirects = read('src/routes.jsx');
    const journalPage = read('src/pages/Journal.jsx');
    const articles = [
        ['designing-protein-experiments-for-epistasis', 'src/articles/WhatShouldWeMeasureNext.jsx'],
        ['trauma-vs-purpose', 'src/articles/TraumaVsPurpose.jsx'],
        ['smartwatch', 'src/articles/SmartWatch.jsx'],
        ['glucose-biosensor', 'src/articles/GlucoseBiosensor.jsx'],
        ['is-technology-neutral', 'src/articles/IsTechnologyNeutral.jsx'],
        ['lactate', 'src/articles/Lactate.jsx'],
        ['openclaw', 'src/articles/OpenClaw.jsx'],
        ['science-is-entering-its-agentic-era', 'src/articles/ScienceIsEnteringItsAgenticEra.jsx'],
        ['ai-for-science-is-becoming-a-systems-problem', 'src/articles/AIForScienceIsBecomingInfrastructure.jsx'],
        ['regulators-dont-accept-vibes', 'src/articles/RegulatorsDontAcceptVibes.jsx'],
    ];

    // Published before the /blog -> /journal move, so each of these also owes a redirect.
    // Articles written after it (the epistasis explainer) never had a /blog URL.
    const relocated = new Set(articles.map(([slug]) => slug));
    articles.push(['epistasis-explained-best-variant-vs-best-experiment', 'src/articles/EpistasisExplained.jsx']);

    assert.match(journalPage, /`https:\/\/vivienperrelle\.com\/journal\/\$\{slug\}`/);

    for (const [slug, file] of articles) {
        const article = read(file);
        assert.match(manifest, new RegExp(`path: '/journal/${slug}'`));
        assert.doesNotMatch(manifest, new RegExp(`path: '/blog/${slug}'`));
        assert.match(article, new RegExp(`const SLUG = '${slug}';`));
        assert.match(article, /<ArticleSEO\r?\n\s+slug=\{SLUG\}/, `${file} does not derive its head from the listing`);
        assert.match(article, /<ArticleLayout backTo="\/journal" backLabel="Journal"/, `${file} does not return to the Journal`);
        // Canonical, identity and dates come from journalArticles; an article that
        // restates any of them by hand is free to disagree with its own listing entry.
        assert.doesNotMatch(
            article,
            /mainEntityOfPage|datePublished|dateModified|publishedTime|url="\/journal\//,
            `${file} restates metadata that ArticleSEO derives`,
        );
        if (relocated.has(slug)) {
            assert.match(redirects, new RegExp(`path: '/blog/${slug}', to: '/journal/${slug}'`));
        }
    }
});

test('epibudget pages and figures are present', () => {
    const requiredFiles = [
        'src/articles/projects/Epibudget.jsx',
        'src/articles/WhatShouldWeMeasureNext.jsx',
        'public/epibudget/workflow.webp',
        'public/epibudget/trpb-pairwise-map-recovery.png',
        'public/epibudget/epistasis-loops.svg',
        'public/epibudget/allocation-strategies.svg',
        'public/epibudget/downstream-label-boundary.svg',
        'public/epibudget/structure-vs-dispersion.svg',
    ];

    for (const file of requiredFiles) {
        assert.equal(existsSync(new URL(`../${file}`, import.meta.url)), true, `${file} is missing`);
    }
});

test('epibudget routes and homepage entries have flagship placement', () => {
    const manifest = read('src/routeManifest.js');
    assert.match(manifest, /path: '\/projects\/epibudget'.*Epibudget\.jsx/);
    assert.match(manifest, /path: '\/journal\/designing-protein-experiments-for-epistasis'.*WhatShouldWeMeasureNext\.jsx/);

    const projects = read('src/sections/Projects.jsx');
    const locus = projects.indexOf('title: "LocusLab"');
    const epibudget = projects.indexOf('title: "epibudget"');
    const verifier = projects.indexOf('title: "Scientific Claim Verifier"');
    assert.ok(locus !== -1 && epibudget > locus && epibudget < verifier, 'epibudget is not the second project');

    const journal = read('src/data/journalArticles.js');
    assert.ok(
        journal.indexOf('title: "Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis"') <
            journal.indexOf('title: "AI for Science Is Moving From Prediction to Closed-Loop Research Systems"'),
        'epibudget article is not the newest Journal entry',
    );
});

test('epibudget content is reciprocal, current with the tracked evidence, and uses the site palette', () => {
    assert.equal(
        existsSync(new URL('../src/articles/epibudget-blog-draft.md', import.meta.url)),
        false,
        'converted Markdown draft should not remain in production source',
    );

    const project = read('src/articles/projects/Epibudget.jsx');
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const explainer = read('src/articles/EpistasisExplained.jsx');
    assert.match(project, /View on GitHub/);
    assert.match(project, /Read the technical analysis/);
    assert.match(project, /\/journal\/designing-protein-experiments-for-epistasis/);
    assert.match(article, /\/projects\/epibudget/);
    assert.doesNotMatch(article, /Illustration [1-5]|codex-inline-vis/);

    // The 2026-07-28 audit showed that predicted and measured epistasis contrasts share the
    // purchased lower-order terms, so their correlation can rise without better prediction of
    // anything unmeasured. Every public page has to carry that withdrawal, and none of them may
    // reinstate the recovery claim or quote the tie-realization downstream counts as if they
    // estimated the method across selection seeds.
    for (const source of [article, project, explainer]) {
        for (const boundary of [
            /withdrew|withdrawn/i,
            /masking dispersion did not (?:pass|demonstrate)/i,
            /tie[- ]?seeds?|tie realization|tie-breaking seeds/i,
        ]) {
            assert.match(source, boundary);
        }

        for (const retracted of [
            /meets the registered pairwise map-recovery rule/i,
            /\b20\/20\b/,
            /demonstrat\w+ (?:epistasis-)?map (?:recovery|reconstruction)/i,
            /confirmatory downstream benchmark has not yet been run/i,
            /TrpB scientific comparison is not interpretable/i,
            /No comparative selection result is currently decision-eligible/i,
        ]) {
            assert.doesNotMatch(source, retracted);
        }
    }

    for (const source of [article, project]) {
        assert.match(source, /provisional/i);
        assert.match(source, /871.*imputed.*fitness\s+values/is);
    }

    assert.match(project, /GB1 map[- ]recovery.*inconclusive_zero_gpu/is);
    assert.match(article, /former map-recovery interpretation is withdrawn/i);
    assert.match(article, /makes no public claim that any method reconstructed an epistasis map/i);
    assert.doesNotMatch(article, /inconclusive_zero_gpu/);

    const accent = '#3A2328';
    const allowedColors = new Set(['#FDFBF7', '#1A1A1A', '#5A5A5A', '#E5E0D8', accent]);
    for (const source of [
        read('src/index.css'),
        read('src/sections/Contact.jsx'),
        read('src/components/epibudget/AllocationStrategiesDiagram.jsx'),
    ]) {
        assert.match(source, new RegExp(accent));
        assert.doesNotMatch(source, /#1B2230/);
    }

    for (const name of ['epistasis-loops.svg', 'allocation-strategies.svg', 'downstream-label-boundary.svg', 'structure-vs-dispersion.svg']) {
        const colors = read(`public/epibudget/${name}`).match(/#[0-9A-Fa-f]{6}/g) ?? [];
        assert.ok(colors.length > 0, `${name} has no explicit palette`);
        assert.ok(colors.includes(accent), `${name} does not use the site accent`);
        assert.deepEqual([...new Set(colors)].filter((color) => !allowedColors.has(color)), [], `${name} introduces a new color`);
    }
});

test('epibudget article keeps a restrained scientific voice', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const firstPersonPronouns = article.match(/\bI\b/g) ?? [];
    const emDashes = article.match(/—/g) ?? [];

    assert.ok(firstPersonPronouns.length <= 3, `article contains ${firstPersonPronouns.length} first-person pronouns`);
    assert.ok(emDashes.length <= 4, `article contains ${emDashes.length} em dashes`);
    assert.doesNotMatch(article, /The question changed/);
    assert.doesNotMatch(article, /masking dispersion did not add value/i);
    assert.match(article, /the registered analyses do not establish added value from masking dispersion beyond loop coverage/i);
    assert.match(article, /Implications for experimental design/);
});

test('epibudget article is built from the shared editorial furniture', () => {
    // What this used to pin, class string by class string, was "the flagship article
    // looks like every other Journal entry". That is now structural: the frame comes
    // from ArticleLayout, the byline from ArticleByline, the figure captions from
    // FigureCaption. The remaining assertions are the ones a class string cannot state.
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');

    assert.match(article, /<ArticleLayout backTo="\/journal" backLabel="Journal">/);
    assert.match(article, /<ArticleByline slug=\{SLUG\} \/>/);
    assert.match(article, /<FigureCaption number=\{number\} title=\{title\} description=\{description\}/);
    assert.match(article, /Journal Entry · AI for Science/);
    // `prose` sets its own line height; adding leading-relaxed on the same element made
    // the body copy and the figure captions disagree. Kept as a class assertion because
    // the conflict is between two classes and has no other observable form.
    assert.doesNotMatch(article, /prose prose-neutral prose-lg[^"\n]*leading-relaxed/);
});

test('epibudget article opens with Terminology, Introduction, then the epistasis section', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const headings = [...article.matchAll(/<h2[^>]*>([^<]+)<\/h2>/g)].map((match) => match[1]);

    assert.deepEqual(
        headings.slice(0, 3),
        ['Terminology', 'Introduction', 'Epistasis makes prediction a relational problem'],
        'the reader meets the vocabulary before the argument that uses it',
    );
    assert.doesNotMatch(article, /<p className="[^"]*">Terminology<\/p>/, 'Terminology is a section, not a bold paragraph');
});

test('epibudget article introduces the requested scientific vocabulary before using specialist terms', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const compact = article.replace(/\s+/g, ' ');

    assert.doesNotMatch(article, /The project started from a hypothesis about ESM masking dispersion/);
    assert.match(compact, /Terminology.*Variant:.*Site:.*Experimental plate:.*budget <code>B<\/code>.*Label:.*Protein landscape:/);

    for (const requiredCopy of [
        'A and B are abstract labels for mutations at two selected positions in the protein sequence',
        'Δ(v) is the measured effect of variant v relative to the reference construct',
        'is not a biological feedback loop',
        'Each site can contain any of the 20 standard amino acids',
        '<code>76</code> singles, <code>2,166</code> doubles, and <code>27,436</code> triples',
        'much as a text model learns which words are plausible from the surrounding sentence',
        'Conjoint scoring means that all mutations in a candidate are inserted into the sequence before any of them is scored',
        'measures sensitivity to artificial context perturbation; it is not calibrated predictive uncertainty',
        'a static ranking, not a sequential Bayesian design',
        'Tied candidates may therefore be selected according to enumeration order unless ties are broken explicitly',
        'A seeded tie reanalysis randomizes tied candidates while recording the random seed',
        'A registered gate is a success criterion specified before inspection of the final results',
        'public mirror does not identify them row by row',
        'it ranks the complete candidate pool once',
        'update its beliefs and uncertainty estimates for the remaining variants',
        'Calibrated predictive error:',
        'Experimental value:',
    ]) {
        assert.match(compact, new RegExp(escapeRegex(requiredCopy)));
    }

    assert.match(article, /alt="Reference-centered pairwise and third-order measurement loops showing that AB and ABC require their complete lower-order measurement families"/);
    assert.match(article, /description="Pairwise and third-order coefficients are calculated from complete families of measurements centered on the reference construct\. An isolated combination cannot determine its own epistatic effect\."/);
    assert.match(compact, /V1 selection score\(v\) = n\(v\) × τ²\(v\)/);
    assert.doesNotMatch(article, /inconclusive_zero_gpu|correlated posterior/);
});

test('interactive allocation figure fills the article column and aligns its pointer controls', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const figure = read('src/components/epibudget/AllocationStrategiesDiagram.jsx');
    const [call = ''] = article.match(/<AllocationStrategiesDiagram[\s\S]*?\/>/) ?? [];

    assert.ok(call, 'Figure 3 call site is missing');
    assert.doesNotMatch(call, /\bsrc=|maxWidthClass=/);
    assert.equal((article.match(/maxWidthClass="max-w-\[600px\]"/g) ?? []).length, 2);

    assert.doesNotMatch(figure, /Every strategy selects|Open the full static comparison|\(\{ src,/);
    assert.match(figure, /cursor-pointer disabled:cursor-default/);
    assert.match(figure, /const DIAGRAM_CENTER_Y = 126\.5;/);
    assert.match(figure, /const CANDIDATE_GRAPH_Y = DIAGRAM_CENTER_Y - CANDIDATE_GRAPH_LOCAL_CENTER_Y;/);
    assert.match(figure, /const PLATE_Y = DIAGRAM_CENTER_Y - \(PLATE_HEIGHT \/ 2\);/);
    assert.match(figure, /y1=\{DIAGRAM_CENTER_Y\}[\s\S]*?y2=\{DIAGRAM_CENTER_Y\}/);
});

test('allocation figure compares five equal-budget selections with minimal labels', () => {
    const figure = read('public/epibudget/allocation-strategies.svg');

    for (const requiredCopy of [
        'Five allocation strategies',
        'Random',
        'uniform',
        'Fitness',
        'predicted fitness',
        'Loop-count',
        'interaction coverage',
        'masking dispersion',
        'Practice',
        'singles → combinations',
        'Node = candidate variant',
        'Filled = selected for measurement',
        'Outline = not selected',
        'Dashed halo = high masking dispersion',
        'B = fixed experimental budget',
    ]) {
        assert.match(figure, new RegExp(escapeRegex(requiredCopy)));
    }

    assert.equal((figure.match(/data-selected-count="3"/g) ?? []).length, 5);
    assert.equal((figure.match(/href="#candidate-graph"/g) ?? []).length, 5);
    assert.equal((figure.match(/class="plate"/g) ?? []).length, 5);
    assert.match(figure, /<circle cx="300" cy="1302" r="12" class="selected"\/><text x="323" y="1307" class="label">Filled = selected for measurement<\/text>/);
    assert.match(figure, /<circle cx="300" cy="1350" r="12" class="node"\/><circle cx="300" cy="1350" r="20" class="halo"\/><text x="328" y="1355" class="label">Dashed halo = high masking dispersion<\/text>/);
    assert.match(
        figure,
        /<text x="42" y="34" class="key"><tspan x="42" y="34">Dispersion-<\/tspan><tspan x="42" dy="26">weighted<\/tspan><\/text>/,
    );
    assert.doesNotMatch(figure, /<text x="42" y="42" class="key">Dispersion-weighted<\/text>/);
    assert.doesNotMatch(figure, /Each strategy selects|Samples candidates|Prioritizes|Experimental plate · B fixed/);
    assert.doesNotMatch(figure, /<polygon|fill="#000000"|fill="black"/i);
});

test('epistasis figure defines WT-referenced pairwise and third-order measurement loops', () => {
    const figure = read('public/epibudget/epistasis-loops.svg');

    for (const requiredCopy of [
        'Closed measurement loops',
        'Pairwise',
        'Third-order',
        'AB alone: insufficient',
        'ABC alone: insufficient',
        'dark filled node = measured variant',
        'dashed outline = focal target',
        'dark edge = closed loop',
        'light edge = related',
    ]) {
        assert.match(figure, new RegExp(escapeRegex(requiredCopy)));
    }

    for (const variant of ['A', 'B', 'C', 'AB', 'AC', 'BC', 'ABC']) {
        assert.match(figure, new RegExp(`>${variant}<`));
    }
    assert.doesNotMatch(figure, /ε\(|with Δ\(WT\)|Pairwise epistasis compares|A combination measured in isolation/);
});

test('v1 ablation figure states the score comparison and current provisional evidence', () => {
    const figure = read('public/epibudget/structure-vs-dispersion.svg');

    for (const requiredCopy of [
        'Loop count with or without masking dispersion',
        'Loop-count baseline',
        'Dispersion-weighted',
        'score(v) = n(v)',
        'score(v) = n(v) × τ²(v)',
        'singles: 1140',
        'doubles: 39',
        'triples: 1',
        'node = candidate variant',
        'dashed halo = masking dispersion',
        'filled node = selected for measurement',
    ]) {
        assert.match(figure, new RegExp(escapeRegex(requiredCopy)));
    }

    assert.equal((figure.match(/data-candidate-set="A,B,C,D,AB,AC,BD,CD,ABC,ABD,BCD"/g) ?? []).length, 2);
    assert.equal((figure.match(/data-selected-count="3"/g) ?? []).length, 2);
    assert.equal((figure.match(/class="plate"/g) ?? []).length, 2);
    assert.doesNotMatch(figure, /Current evidence status|inconclusive_zero_gpu|not a calibrated posterior variance|All comparative results remain provisional/i);
});

test('epibudget workflow metadata matches the optimized image dimensions', () => {
    assert.deepEqual(readLossyWebpDimensions('public/epibudget/workflow.webp'), { width: 2048, height: 900 });

    for (const file of ['src/articles/projects/Epibudget.jsx', 'src/articles/WhatShouldWeMeasureNext.jsx']) {
        const source = read(file);
        assert.match(source, /imageWidth=\{2048\}/);
        assert.match(source, /imageHeight=\{900\}/);
    }

    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    assert.match(article, /src="\/epibudget\/workflow\.webp"[\s\S]*?width="2048"[\s\S]*?height="900"/);
});

test('map-recovery SVG suppresses its embedded headline and subtitle without leaving header whitespace', () => {
    const figure = read('public/epibudget/map_recovery_trpb_vs_gb1.svg');

    assert.match(figure, /<svg\b[^>]*height="620pt"[^>]*viewBox="0 80 590\.221875 620"/);
    assert.match(figure, /<g id="text_60" style="display: none" aria-hidden="true">/);
    assert.match(figure, /<g id="text_61" style="display: none" aria-hidden="true">/);

    assert.match(read('src/articles/WhatShouldWeMeasureNext.jsx'), /src="\/epibudget\/map_recovery_trpb_vs_gb1\.svg"[\s\S]*?height="620"/);
});

test('the map-recovery figure survives only as a labelled withdrawn diagnostic', () => {
    // The figure is kept for transparency, not as evidence. It therefore lives behind a
    // disclosure inside Evidence status, carries the withdrawal in its own caption, and no
    // longer appears on the project page at all.
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const project = read('src/articles/projects/Epibudget.jsx');
    const disclosure = article.match(/<details[\s\S]*?<\/details>/)?.[0] ?? '';

    assert.ok(disclosure, 'withdrawn-diagnostic disclosure not found');
    assert.match(disclosure, /Show the withdrawn diagnostic figure/);
    assert.match(disclosure, /src="\/epibudget\/map_recovery_trpb_vs_gb1\.svg"/);
    assert.match(disclosure, /title="Withdrawn diagnostic — not evidence of epistasis-map recovery"/);
    assert.match(disclosure, /Predicted and measured contrasts share purchased lower-order terms, so correlation can rise without better prediction of unmeasured components\./);
    assert.match(disclosure, /The absence of intervals is a data-availability constraint: the public TrpB artifact does not include pointwise confidence intervals\./);
    assert.match(disclosure, /framed=\{false\}/);
    assert.match(disclosure, /spacingClass="mb-10"/);

    assert.doesNotMatch(project, /map_recovery_trpb_vs_gb1\.svg/);
});

test('Evidence status opens on the audit rather than on the withdrawn figure', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const section = article.match(/<h2[^>]*>Evidence status<\/h2>[\s\S]*?<\/section>/)?.[0] ?? '';

    assert.ok(section, 'Evidence status section not found');
    assert.match(section, /<h2[^>]*>Evidence status<\/h2>\s*<p>\s*The evidence boundary changed after a mathematical audit of the recovery metric\.\s*<\/p>/);
    assert.ok(
        section.indexOf('The former map-recovery interpretation is withdrawn') < section.indexOf('<details'),
        'the withdrawal has to be stated before the figure is offered',
    );
});

test('editorial figure captions follow images and use the approved copy', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const expectedCaptions = [
        ['1', 'From target protein to experimental plate', 'epibudget scores complete variants, maps their interaction structure, and converts a fixed experimental budget into a ranked measurement plate.'],
        ['2', 'Interaction coefficients are defined by closed measurement loops', 'Pairwise and third-order coefficients are calculated from complete families of measurements centered on the reference construct. An isolated combination cannot determine its own epistatic effect.'],
        ['3', 'Same candidates, different experimental plates', 'Five static strategies select the same number of variants from a shared candidate universe. Only the selection criterion changes which variants enter the plate.'],
        ['4', 'What masking dispersion adds to the v1 score', 'The ablation compares loop count alone with loop count weighted by ESM masking dispersion. Current evidence does not establish an additional benefit from the dispersion term.'],
    ];

    for (const [number, title, description] of expectedCaptions) {
        assert.match(article, new RegExp(`number="${number}"`));
        assert.match(article, new RegExp(`title="${escapeRegex(title)}"`));
        assert.match(article, new RegExp(`description="${escapeRegex(description)}"`));
    }

    // One caption component for static images and inline React diagrams alike, so the
    // two families cannot drift into different wording. The rendered order — image,
    // then caption — is checked on the built page in dist-contracts.test.mjs.
    const caption = read('src/components/FigureCaption.jsx');
    assert.match(caption, /<figcaption/);
    assert.match(caption, /Figure n°\{number\}: \{title\}/);
    assert.match(caption, /<span>Description:<\/span> \{description\}/);
    assert.match(article, /<img[\s\S]*?\/>\s*<FigureCaption/);
    assert.doesNotMatch(article, /<figcaption/, 'the article hand-rolls a caption instead of using FigureCaption');
    assert.doesNotMatch(article, /mobileScrollable|min-w-\[760px\]|Swipe horizontally/);
});

test('epibudget SVGs share a responsive two-size editorial system', () => {
    for (const name of ['epistasis-loops.svg', 'allocation-strategies.svg', 'downstream-label-boundary.svg', 'structure-vs-dispersion.svg']) {
        const figure = read(`public/epibudget/${name}`);
        const root = figure.match(/<svg\b[^>]*>/)?.[0] ?? '';
        const sizes = [...new Set([...figure.matchAll(/font-size:\s*(\d+px)/g)].map((match) => match[1]))].sort();

        assert.match(root, /viewBox="[^"]+"/);
        assert.doesNotMatch(root, /\s(?:width|height)="/);
        assert.match(figure, /font-family:Inter,Arial,sans-serif/);
        assert.deepEqual(sizes, ['14px', '22px'], `${name} does not use exactly the shared two-size scale`);
        assert.doesNotMatch(figure, /class="subtitle"|class="footer"/);
    }
});

test('static article figures retain bounded editorial widths', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');

    assert.match(article, /className=\{`block mx-auto w-full h-auto[^`]*\$\{maxWidthClass\}`\}/);
    assert.match(article, /src="\/epibudget\/epistasis-loops\.svg"[\s\S]*?maxWidthClass="max-w-\[600px\]"/);
    assert.match(article, /src="\/epibudget\/structure-vs-dispersion\.svg"[\s\S]*?maxWidthClass="max-w-\[600px\]"/);
});

test('Figure 4 legend has two spacious rows without right or vertical clipping', () => {
    const figure = read('public/epibudget/structure-vs-dispersion.svg');

    assert.match(figure, /viewBox="0 0 600 1210"/);
    assert.match(figure, /filled node = selected for measurement<\/text>/);
    assert.match(figure, /<circle cx="55" cy="1170" r="20" class="halo"\/>/);
    assert.match(figure, /<text x="323" y="1175" class="label">B = fixed budget<\/text>/);
});

test('production output is route-split and contains no prerender client edge', () => {
    const assets = new URL('../dist/assets/', import.meta.url);
    const scripts = readdirSync(assets).filter((file) => file.endsWith('.js'));
    const homeHtml = read('dist/index.html');
    const initialScripts = [...homeHtml.matchAll(/(?:src|href)="\/assets\/([^"?]+\.js)"/g)]
        .map((match) => match[1]);
    const initialGzip = initialScripts.reduce((sum, file) => {
        const body = readFileSync(new URL(file, assets));
        return sum + gzipSync(body).length;
    }, 0);

    assert.ok(scripts.length >= 15, `expected route chunks, found ${scripts.length}`);
    assert.ok(initialGzip < 130 * 1024, `expected <130 KiB initial gzip JS, found ${(initialGzip / 1024).toFixed(1)} KiB`);
    assert.ok(existsSync(new URL('../dist/404.html', import.meta.url)));
    assert.equal(existsSync(new URL('../dist/404/', import.meta.url)), false);

    for (const file of scripts) {
        const source = readFileSync(new URL(file, assets), 'utf8');
        assert.doesNotMatch(source, /prerender-[A-Za-z0-9_-]+\.js/);
        assert.ok(statSync(new URL(file, assets)).size > 0);
    }
});
