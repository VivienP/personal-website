// Shared JSON-LD building blocks. Kept out of SEO.jsx so that component file
// only exports components (react-refresh/only-export-components).

export const SITE_URL = 'https://vivienperrelle.com';

export const AUTHOR = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Vivien Perrelle',
    url: SITE_URL,
};

export const FREELANCE_SERVICE_JSON_LD = {
    '@type': 'Service',
    '@id': `${SITE_URL}/#freelance`,
    name: 'Lab automation and scientific software engineering',
    serviceType: 'Fixed-scope laboratory automation software engineering, workflow implementation, instrument/software integration, reliability, testing and handover',
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/lab-automation-software-engineer`,
};

export const TRAINING_SERVICE_JSON_LD = {
    '@type': 'Service',
    '@id': `${SITE_URL}/#training`,
    name: 'AI training and workshops for professional teams',
    serviceType: 'AI training, workshops, confidential AI use, local models, AI workflow design',
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/ai-training`,
};
