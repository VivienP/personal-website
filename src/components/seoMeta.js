import { SITE_URL } from './jsonld.js';

const DEFAULT_IMAGE = {
    src: `${SITE_URL}/me.png`,
    width: 300,
    height: 300,
};

export const resolveOpenGraphImage = ({ image, imageWidth, imageHeight } = {}) => {
    if (!image) return DEFAULT_IMAGE;

    const result = {
        src: image.startsWith('http') ? image : `${SITE_URL}${image}`,
    };
    if (Number.isInteger(imageWidth) && imageWidth > 0 && Number.isInteger(imageHeight) && imageHeight > 0) {
        result.width = imageWidth;
        result.height = imageHeight;
    }
    return result;
};
