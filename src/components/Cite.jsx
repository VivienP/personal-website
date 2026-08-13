import React from 'react';

// Inline reference marker rendered as a superscript link to the numbered entry at
// the foot of the article. Nine articles carried a byte-identical private copy;
// tests/site-contracts.test.mjs checks that every marker resolves to a #ref-N
// anchor, and that check only means something if every article marks up the same way.
const Cite = ({ n }) => (
    <sup>
        <a
            href={`#ref-${n}`}
            className="text-accent no-underline hover:underline font-mono text-xs align-super"
            aria-label={`Jump to reference ${n}`}
        >
            [{n}]
        </a>
    </sup>
);

export default Cite;
