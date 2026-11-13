import { SITE_URL, FREELANCE_SERVICE_JSON_LD, TRAINING_SERVICE_JSON_LD } from './jsonld';
import { resolveOpenGraphImage } from './seoMeta';

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
            jobTitle: 'AI Engineer & Founder',
            description: 'AI engineer and founder with a background in biosensors and lab automation. Currently at Station F in Paris with the Pioneers program.',
            address: { '@type': 'PostalAddress', addressLocality: 'Paris', addressCountry: 'FR' },
            alumniOf: [
                {
                    '@type': 'CollegeOrUniversity',
                    name: 'ESILV — École Supérieure d’Ingénieurs Léonard de Vinci',
                    alternateName: 'ESILV',
                    url: 'https://www.esilv.fr/',
                },
                {
                    '@type': 'EducationalOrganization',
                    name: 'Institute for Future Technologies',
                    alternateName: 'De Vinci Innovation Center',
                    url: 'https://ift.devinci.fr/',
                },
            ],
            knowsAbout: [
                'laboratory automation',
                'scientific software engineering',
                'PyLabRobot',
                'automation reliability',
                'AI for science',
                'AI agents',
                'scientific data provenance',
                'biosensors',
                'Python',
                'FastAPI',
            ],
            hasOccupation: [
                {
                    '@type': 'Occupation',
                    name: 'AI Engineer',
                    description: 'AI engineering with a background in biosensors and lab automation.',
                    occupationLocation: { '@type': 'City', name: 'Paris' },
                },
                {
                    '@type': 'Occupation',
                    name: 'Founder',
                    description: 'Founder with experience building and selling technical B2B products.',
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
        TRAINING_SERVICE_JSON_LD,
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
    title: 'Vivien Perrelle | AI Engineer & Founder',
    description: 'AI engineer and founder with a background in biosensors and lab automation. Currently at Station F in Paris with the Pioneers program.',
    image: `${SITE_URL}/me.png`,
};

const SEO = ({
    title,
    description,
    image,
    imageWidth,
    imageHeight,
    url,
    type = 'website',
    article = null,
    noindex = false,
    jsonLd = null,
    locale = 'en_US',
    twitterCard = 'summary',
}) => {
    const openGraphImage = resolveOpenGraphImage({ image, imageWidth, imageHeight });
    const seo = {
        title: title || defaults.title,
        description: description || defaults.description,
        image: openGraphImage.src,
        url: url ? `${SITE_URL}${url}` : SITE_URL,
    };

    const effectiveJsonLd = jsonLd ?? (url === '/' ? DEFAULT_JSON_LD : null);

    if (import.meta.env.DEV && !url) {
        console.warn('[SEO] missing `url` prop: canonical and og:url will fall back to the site root.');
    }

    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
            {!noindex && <link rel="canonical" href={seo.url} />}

            <meta property="og:type" content={type} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            {openGraphImage.width && <meta property="og:image:width" content={openGraphImage.width} />}
            {openGraphImage.height && <meta property="og:image:height" content={openGraphImage.height} />}
            <meta property="og:url" content={seo.url} />
            <meta property="og:site_name" content="Vivien Perrelle" />
            <meta property="og:locale" content={locale} />

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:site" content={TWITTER_HANDLE} />
            <meta name="twitter:creator" content={TWITTER_HANDLE} />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

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

            {effectiveJsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(effectiveJsonLd)}
                </script>
            )}
        </>
    );
};

export default SEO;
