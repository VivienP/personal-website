import React from 'react';

// The numbered caption used under every editorial figure, whether the figure is an
// inline React diagram or a static image. `className` exists so a caption can be
// held to the same measure as the image above it; the copy pattern — "Figure n°N:
// title" then "Description: …" — is the part that must not drift.
const FigureCaption = ({ number, title, description, className }) => (
    <figcaption className={['mt-4 space-y-1 text-base leading-relaxed text-primary', className].filter(Boolean).join(' ')}>
        <p className="font-semibold">Figure n°{number}: {title}</p>
        <p className="italic font-normal"><span>Description:</span> {description}</p>
    </figcaption>
);

export default FigureCaption;
