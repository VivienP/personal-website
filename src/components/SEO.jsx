import { SITE_URL, FREELANCE_SERVICE_JSON_LD } from './jsonld';

const TWITTER_HANDLE = '@PerrelleVivien';

const DEFAULT_JSON_LD = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Vivien Perrelle',
            url: SITE_URL,
            image: `${SITE_URL}/me.png`,
            jobTitle: 'Founder & Freelance AI Engineer, AI for Biology',
            description: 'Founder building verification infrastructure for biology research. Freelance AI engineer for biology, TechBio, and AI-for-science teams: AI agents, RAG, scientific tooling.',
            address: { '@type': 'PostalAddress', addressLocality: 'Lyon', addressCountry: 'FR' },
            alumniOf: { '@type': 'EducationalOrganization', name: 'De Vinci Innovation Center' },
            knowsAbout: [
                'AI for science',
                'AI agents',
                'retrieval-augmented generation (RAG)',
                'scientific claim verification',
                'LLM engineering',
                'scientific tooling',
                'biosensors',
                'Python',
                'FastAPI',
            ],
            hasOccupation: [
                {
                    '@type': 'Occupation',
                    name: 'Founder',
                    description: 'Founder of LocusLab, verification infrastructure for biology research.',
                },
                {
                    '@type': 'Occupation',
                    name: 'Freelance AI Engineer',
                    description: 'Freelance AI engineering for biology, TechBio, and AI-for-science teams.',
                    occupationLocation: { '@type': 'City', name: 'Lyon' },
                },
            ],
            sameAs: [
                'https://x.com/PerrelleVivien',
                'https://www.linkedin.com/in/vivien-perrelle/',
                'https://github.com/VivienP',
                'https://www.malt.fr/profile/vivienperrelle',
            ],
        },
        FREELANCE_SERVICE_JSON_LD,
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'Vivien Perrelle',
            publisher: { '@id': `${SITE_URL}/#person` },
            inLanguage: 'en',
        },
    ],
};

const defaults = {
    title: 'Vivien Perrelle | AI Engineer & Founder, AI for Biology',
    description: 'I help TechBio and AI-for-biology teams ship AI agents, RAG pipelines, and scientific tooling. Selective freelance engagements. Book an intro call.',
    image: `${SITE_URL}/me.png`,
};

const SEO = ({
    title,
    description,
    image,
    url,
    type = 'website',
    article = null,
    noindex = false,
    jsonLd = null,
    locale = 'en_US',
}) => {
    const seo = {
        title: title || defaults.title,
        description: description || defaults.description,
        image: image?.startsWith('http') ? image : `${SITE_URL}${image || '/me.png'}`,
        url: url ? `${SITE_URL}${url}` : SITE_URL,
    };

    const effectiveJsonLd = jsonLd ?? (url === '/' || !url ? DEFAULT_JSON_LD : null);

    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
            {/* A canonical alongside noindex sends contradictory signals — omit it. */}
            {!noindex && <link rel="canonical" href={seo.url} />}

            {/* Open Graph. me.png really is 300x300; declare honest dimensions
                and a square summary card until a true 1200x630 asset exists. */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:image:width" content="300" />
            <meta property="og:image:height" content="300" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:site_name" content="Vivien Perrelle" />
            <meta property="og:locale" content={locale} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            {/* Article meta */}
            {article?.publishedTime && (
                <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article?.modifiedTime && (
                <meta property="article:modified_time" content={article.modifiedTime} />
            )}
            {article?.author && (
                <meta property="article:author" content={article.author} />
            )}
            {article?.section && (
                <meta property="article:section" content={article.section} />
            )}

            {/* JSON-LD */}
            {effectiveJsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(effectiveJsonLd)}
                </script>
            )}
        </>
    );
};

export default SEO;
