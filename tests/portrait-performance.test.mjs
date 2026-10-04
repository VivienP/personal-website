import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { test } from 'node:test';

const portraitPath = new URL('../public/portraits/vivien-33.webp', import.meta.url);

test('homepage uses a WebP thumbnail under 15 KB', () => {
    const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
    assert.match(html, /<img[^>]*src="\/me\.webp"/);
    assert.doesNotMatch(html, /<img[^>]*src="\/me\.png"/);
    const thumbnail = new URL('../public/me.webp', import.meta.url);
    assert.ok(statSync(thumbnail).size <= 15_000, 'The thumbnail exceeds 15 KB');
});

test('homepage offers a keyboard-accessible portrait viewer without fetching the full photo', () => {
    const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
    assert.match(html, /<button[^>]*aria-label="View full portrait of Vivien Perrelle"[^>]*>/);
    assert.doesNotMatch(html, /<(?:img|link)[^>]*(?:src|href)="[^"]*portraits\/vivien-33\.webp/);
});

test('full portrait stays within a 600 KB download budget', () => {
    assert.ok(existsSync(portraitPath), 'The optimized portrait must exist');
    assert.ok(statSync(portraitPath).size <= 600_000, 'The full portrait exceeds 600 KB');
    const image = readFileSync(portraitPath);
    assert.equal(image.subarray(0, 4).toString(), 'RIFF');
    assert.equal(image.subarray(8, 12).toString(), 'WEBP');
});
