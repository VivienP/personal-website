import React from 'react';

// Figures narrower than the reading column: a square, portrait or low-resolution
// image shown at full width would fill the screen or be stretched. They are centred,
// and the cap sits on the <figure> so the caption stays under the image.
const SIZES = {
    medium: 'max-w-lg mx-auto',
    small: 'max-w-sm mx-auto',
};

// A framed image with a short caption, as the three build tutorials use it: a real
// <figure>/<figcaption> pair so the caption is associated with the image rather than
// floating under it as a paragraph. `className` styles the frame, not the image;
// `size` narrows the whole figure. `width`/`height` are the image's real pixel
// dimensions: they reserve its space so the text below does not jump while it loads.
//
// The numbered "Figure n°N" system the epibudget pieces use is a different, heavier
// convention — see FigureCaption — and the two are deliberately not merged.
const ArticleFigure = ({ src, alt, caption, size, width, height, className = '' }) => (
    <figure className={['space-y-3', SIZES[size]].filter(Boolean).join(' ')}>
        <div className={`border border-border-subtle ${className}`}>
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                loading="lazy"
                className="w-full h-auto object-contain"
            />
        </div>
        {caption && <figcaption className="text-sm text-secondary italic">{caption}</figcaption>}
    </figure>
);

export default ArticleFigure;
