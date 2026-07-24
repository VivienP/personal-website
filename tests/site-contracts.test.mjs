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

test('committed sitemap is generated from the route manifest', async () => {
    const { renderSitemap } = await optionalImport('../scripts/sitemap.mjs');
    assert.equal(typeof renderSitemap, 'function', 'sitemap generator is not implemented');
    assert.equal(read('public/sitemap.xml').replaceAll('\r\n', '\n'), `${renderSitemap()}\n`);
});

test('collection pages expose main landmarks and keyboard gallery controls', () => {
    const art = read('src/pages/Art.jsx');
    assert.match(art, /<main\b/);
    assert.match(art, /<button\b/);
    assert.match(art, /aria-pressed=/);
    assert.match(read('src/pages/AcademicWork.jsx'), /<main\b/);
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
    assert.match(manifest, /path: '\/blog\/designing-protein-experiments-for-epistasis'.*WhatShouldWeMeasureNext\.jsx/);

    const projects = read('src/sections/Projects.jsx');
    const locus = projects.indexOf('title: "LocusLab"');
    const epibudget = projects.indexOf('title: "epibudget"');
    const verifier = projects.indexOf('title: "Scientific Claim Verifier"');
    assert.ok(locus !== -1 && epibudget > locus && epibudget < verifier, 'epibudget is not the second project');

    const journal = read('src/sections/Journal.jsx');
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
    assert.match(project, /View on GitHub/);
    assert.match(project, /Read the research story/);
    assert.match(project, /\/blog\/designing-protein-experiments-for-epistasis/);
    assert.match(article, /\/projects\/epibudget/);
    assert.doesNotMatch(article, /Illustration [1-5]|codex-inline-vis/);

    for (const source of [article, project]) {
        for (const boundary of [
            /TrpB.*info.*fitness.*random/is,
            /20\/20[\s\S]*partitions[\s\S]*GB1[\s\S]*TrpB/i,
            /masking dispersion.*not support/is,
            /provisional/i,
            /871.*imputed.*fitness\s+values/is,
        ]) {
            assert.match(source, boundary);
        }

        assert.doesNotMatch(source, /confirmatory downstream benchmark has not yet been run/i);
        assert.doesNotMatch(source, /TrpB scientific comparison is not interpretable/i);
        assert.doesNotMatch(source, /No comparative selection result is currently decision-eligible/i);
    }

    assert.match(project, /GB1 map-recovery.*inconclusive_zero_gpu/is);
    assert.match(article, /On GB1.*map-recovery.*remains\s+inconclusive/is);
    assert.doesNotMatch(article, /inconclusive_zero_gpu/);

    const allowedColors = new Set(['#FDFBF7', '#1A1A1A', '#5A5A5A', '#E5E0D8', '#1B3022']);
    for (const name of ['epistasis-loops.svg', 'allocation-strategies.svg', 'downstream-label-boundary.svg', 'structure-vs-dispersion.svg']) {
        const colors = read(`public/epibudget/${name}`).match(/#[0-9A-Fa-f]{6}/g) ?? [];
        assert.ok(colors.length > 0, `${name} has no explicit palette`);
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
    assert.match(article, /Implications for experimental design/);
});

test('epibudget article uses the established Journal typography and spacing classes', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');

    assert.match(article, /<article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">/);
    assert.match(article, /<header className="mb-12 space-y-4">/);
    assert.match(article, /<div className="flex items-center space-x-3 mb-2">\s*<span className="font-mono text-xs text-secondary tracking-widest uppercase">Journal Entry · AI for Science<\/span>\s*<\/div>/);
    assert.match(article, /<h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">/);
    assert.match(article, /<p className="text-lg text-secondary font-light max-w-2xl">/);
    assert.match(article, /<div className="pt-2 flex items-center space-x-2 text-sm text-secondary\/80 italic font-light">\s*<span>By Vivien Perrelle · July 23, 2026<\/span>\s*<\/div>/);
    assert.match(article, /<div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">/);
    assert.match(article, /<ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">/);
    assert.doesNotMatch(article, /prose prose-neutral prose-lg[^"\n]*leading-relaxed/);
});

test('epibudget article opens with Terminology, Introduction, then the epistasis section', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');
    const headingClass = 'text-2xl font-normal text-primary pb-2 border-b border-border-subtle';
    const terminology = `<h2 className="${headingClass}">Terminology</h2>`;
    const introduction = `<h2 className="${headingClass}">Introduction</h2>`;
    const epistasis = `<h2 className="${headingClass}">Epistasis makes prediction a relational problem</h2>`;

    assert.ok(article.indexOf(terminology) >= 0);
    assert.ok(article.indexOf(introduction) > article.indexOf(terminology));
    assert.ok(article.indexOf(epistasis) > article.indexOf(introduction));
    assert.doesNotMatch(article, /<p className="mb-3 font-semibold text-primary">Terminology<\/p>/);
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
        assert.match(source, /width="2048"/);
        assert.match(source, /height="900"/);
    }
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

    assert.match(article, /<a[\s\S]*?href=\{src\}[\s\S]*?<img[\s\S]*?<\/a>\s*<figcaption/);
    assert.match(article, /Figure n°\{number\}: \{title\}/);
    assert.match(article, /<span>Description:<\/span> \{description\}/);
    assert.match(article, /<figcaption className=\{`[^`]*text-base leading-relaxed[^`]*`\}>/);
    assert.doesNotMatch(article, /<figcaption className=\{`[^`]*text-lg[^`]*`\}>/);
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

test('article figures use bounded editorial widths', () => {
    const article = read('src/articles/WhatShouldWeMeasureNext.jsx');

    assert.match(article, /className=\{`block mx-auto \$\{maxWidthClass\}`\}/);
    assert.match(article, /src="\/epibudget\/epistasis-loops\.svg"[\s\S]*?maxWidthClass="max-w-\[600px\]"/);
    assert.match(article, /src="\/epibudget\/allocation-strategies\.svg"[\s\S]*?maxWidthClass="max-w-\[600px\]"/);
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
