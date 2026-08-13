import React from 'react';
import BackLink from './BackLink';

// The frame every article page shares: the centred reading column, the <main>
// landmark, and the back link to the collection the piece belongs to. Everything
// editorial — the header, the prose, the figures, the author bio — stays in the
// article file, so journal entries, technical notes and project pages keep their
// own structure instead of being folded into one conditional component.
//
// `width` is the only presentational choice, and it is a named measure rather than
// a free class string: 'wide' is the illustrated reading column, 'narrow' the one
// the short essays and the academic publications use.
const MEASURES = {
    wide: 'max-w-4xl',
    narrow: 'max-w-3xl',
};

const ArticleLayout = ({ backTo, backLabel, width = 'wide', children }) => (
    <main className={`min-h-screen py-24 px-6 ${MEASURES[width]} mx-auto animate-in fade-in duration-700`}>
        <BackLink to={backTo} label={backLabel} />
        {/* The back link is site navigation, not part of the piece: it sits in the
            landmark but outside <article>, which is what a reader-mode extractor,
            and scripts/reading-time.mjs, treat as the body of the article. */}
        <article>{children}</article>
    </main>
);

export default ArticleLayout;
