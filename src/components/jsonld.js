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
    name: 'Freelance scientific software and AI engineering for biology and research teams',
    serviceType: 'Scientific data infrastructure, evaluation and reliability, AI workflows, experimental design systems',
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/freelance-ai-engineer-biology`,
};

// The training offer, declared as its own Service rather than folded into the
// freelance one: they are bought by different people for different reasons, and
// a single blurred "AI services" node would describe neither. The Person node
// stays the engineering entity — this hangs off it, it does not restate it.
export const TRAINING_SERVICE_JSON_LD = {
    '@type': 'Service',
    '@id': `${SITE_URL}/#training`,
    name: 'AI training and workshops for professional teams',
    serviceType: 'AI training, workshops, confidential AI use, local models, AI workflow design',
    provider: { '@id': `${SITE_URL}/#person` },
    areaServed: 'Worldwide',
    url: `${SITE_URL}/ai-training`,
};
