import React from 'react';
import { getJournalArticle } from '../data/journalArticles';

// The byline every Journal article ends its header with: author, publication date,
// reading time. Both values come from src/data/journalArticles.js so the listing and
// the article can never disagree, and so the wording stays identical across the
// collection. Deliberately says nothing about revisions — a modification date belongs
// in the JSON-LD and the sitemap, not in the reader's first line.
const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const formatPublicationDate = (iso) => {
    const [year, month, day] = iso.split('-').map(Number);
    return `${MONTHS[month - 1]} ${day}, ${year}`;
};

const ArticleByline = ({ slug }) => {
    // Unknown slug throws rather than rendering an empty line: prerendering runs this
    // for every article, so the failure lands in `npm run build`, not on the page.
    const entry = getJournalArticle(slug);

    return (
        <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-normal">
            {/* One interpolation, so SSR emits a single text node rather than splitting the
                line with <!-- --> markers between each value. */}
            <span>{`By Vivien Perrelle · ${formatPublicationDate(entry.date)} · ${entry.readingMinutes} min read`}</span>
        </div>
    );
};

export default ArticleByline;
