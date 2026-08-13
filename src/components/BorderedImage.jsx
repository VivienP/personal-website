import React from 'react';

// A bare photograph or screenshot inside the site's hairline frame, used inside
// prose where the surrounding paragraph already says what the image shows. When the
// image needs a caption of its own, use ArticleFigure instead.
const BorderedImage = ({ src, alt, className = '' }) => (
    <div className="border border-border-subtle">
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className={`w-full h-auto object-contain ${className}`}
        />
    </div>
);

export default BorderedImage;
