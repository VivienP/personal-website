import React from 'react';

// A bare photograph or screenshot inside the site's hairline frame, used inside
// prose where the surrounding paragraph already says what the image shows. When the
// image needs a caption of its own, use ArticleFigure instead.
//
// `width`/`height` are the image's real pixel dimensions. They are optional because
// the three build tutorials predate the convention, but pass them for anything new:
// they are what reserves the space and keeps the paragraph below from jumping.
const BorderedImage = ({ src, alt, width, height, className = '' }) => (
    <div className="border border-border-subtle">
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            className={`w-full h-auto object-contain ${className}`}
        />
    </div>
);

export default BorderedImage;
