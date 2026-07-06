// Shared JSON-LD building blocks. Kept out of SEO.jsx so that component file
// only exports components (react-refresh/only-export-components).

export const SITE_URL = 'https://vivienperrelle.com';

// Canonical author node. Articles reference the same @id as the home-page
// Person graph node so search/AI engines resolve every byline to one entity.
export const AUTHOR = {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: 'Vivien Perrelle',
    url: SITE_URL,
};

// The freelance offer as a machine-readable Service. Shared between the home
// page graph and the landing page so both reference one entity.
export const FREELANCE_SERVICE_JSON_LD = {
    '@type': 'Service',
    '@id': `${SITE_URL}/#freelance`,
    name: 'Freelance AI engineering for biology and scientific research teams',
    serviceType: 'AI agents, RAG, verification, scientific tooling',
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/freelance-ai-engineer-biology`,
};
