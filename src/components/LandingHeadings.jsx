import React from 'react';

// The two heading levels the commercial landing pages are built from
// (/freelance-ai-engineer-biology and /ai-training). They are not the article
// headings — those live inside ArticleLayout's children at a wider measure — and
// they are shared rather than pasted so the two offers keep one type scale
// instead of drifting a size apart the next time one of them is edited.
export const SectionTitle = ({ children }) => (
    <h2 className="text-2xl md:text-3xl pt-10 pb-2 font-normal text-primary">{children}</h2>
);

export const Subheading = ({ children }) => (
    <h3 className="text-lg md:text-xl font-medium text-primary pt-4">{children}</h3>
);
