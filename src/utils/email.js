const EMAIL_USER = 'vivienperrelle';
const EMAIL_DOMAIN = 'gmail.com';

export const prepareEmailLink = (anchor) => {
    const href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
    anchor?.setAttribute('href', href);
    return href;
};
