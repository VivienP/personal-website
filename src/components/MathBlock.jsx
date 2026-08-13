import React from 'react';

// Display equation for the long-form articles. The site has no math typesetter:
// formulas are plain Unicode set in the serif face, with `label` carrying the
// spoken form so screen readers do not have to decode the glyphs.
const MathBlock = ({ label, children }) => (
    <div
        role="math"
        aria-label={label}
        className="my-8 border-y border-border-subtle py-6 px-4 text-center text-base sm:text-xl md:text-2xl font-serif leading-relaxed [text-wrap:balance]"
    >
        {children}
    </div>
);

export default MathBlock;
