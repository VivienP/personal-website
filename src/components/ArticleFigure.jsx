import React from 'react';

// A framed image with a short caption, as the three build tutorials use it: a real
// <figure>/<figcaption> pair so the caption is associated with the image rather than
// floating under it as a paragraph. `className` sizes the frame, not the image.
//
// The numbered "Figure n°N" system the epibudget pieces use is a different, heavier
// convention — see FigureCaption — and the two are deliberately not merged.
const ArticleFigure = ({ src, alt, caption, className = '' }) => (
    <figure className="space-y-3">
        <div className={`border border-border-subtle ${className}`}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                className="w-full h-auto object-contain"
            />
        </div>
        {caption && <figcaption className="text-sm text-secondary italic">{caption}</figcaption>}
    </figure>
);

export default ArticleFigure;
