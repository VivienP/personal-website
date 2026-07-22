import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { test } from 'node:test';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
const optionalImport = async (path) => import(path).catch(() => ({}));

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
    assert.equal(read('public/sitemap.xml'), `${renderSitemap()}\n`);
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
