const EMAIL_USER = 'vivienperrelle';
const EMAIL_DOMAIN = 'gmail.com';

// Called with an anchor it also sets the attribute; called bare it just returns
// the href, which is how the address reaches the prerendered markup.
export const prepareEmailLink = (anchor) => {
    const href = `mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`;
    anchor?.setAttribute('href', href);
    return href;
};

// Obfuscating behind a click handler shipped href="#" in the static HTML — a dead
// link for anyone without JS — while EMAIL_USER and EMAIL_DOMAIN travelled in the
// bundle as plain literals anyway. It bought nothing and cost the no-JS contract.
export const EMAIL_HREF = prepareEmailLink();
