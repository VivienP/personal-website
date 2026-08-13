import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { journalArticles } from '../src/data/journalArticles.js';

// 180 words per minute rather than the usual web figure of 200-250: this Journal is
// technical prose with equations, protein nomenclature and electrochemistry, which is
// read more slowly than general copy. It also lands the flagship research note on the
// ~15 minutes its own reading-level banner states.
export const READING_WPM = 180;

const DIST = new URL('../dist/', import.meta.url);

/**
 * Words a reader actually moves through in a prerendered article: the <article>
 * body, minus scripts, styles, SVG labels and the AuthorBio footer.
 */
export const countWords = (html) => {
    const article = html.match(/<article\b[\s\S]*?<\/article>/)?.[0] ?? html;
    return article
        .replace(/<script[\s\S]*?<\/script>/g, ' ')
        .replace(/<style[\s\S]*?<\/style>/g, ' ')
        .replace(/<svg[\s\S]*?<\/svg>/g, ' ')
        .replace(/<footer[\s\S]*?<\/footer>/g, ' ')
        .replace(/<[^>]+>/g, ' ')
        .replace(/&[a-z#0-9]+;/gi, ' ')
        .split(/\s+/)
        .filter(Boolean).length;
};

export const estimateReadingMinutes = (html) => Math.max(1, Math.round(countWords(html) / READING_WPM));

export const measureJournal = () =>
    journalArticles.map(({ slug, readingMinutes }) => {
        const html = readFileSync(new URL(`journal/${slug}/index.html`, DIST), 'utf8');
        return { slug, words: countWords(html), measured: estimateReadingMinutes(html), recorded: readingMinutes };
    });

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
    console.table(measureJournal());
}
