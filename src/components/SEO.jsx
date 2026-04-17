const SITE_URL = 'https://vivienperrelle.com';
const TWITTER_HANDLE = '@PerrelleVivien';

const DEFAULT_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Vivien Perrelle',
    url: SITE_URL,
    jobTitle: 'AI Agent Architect',
    description: 'Portfolio of an AI Developer & Entrepreneur exploring agentic AI and Pharmaceutical regulations.',
    image: `${SITE_URL}/me.png`,
    sameAs: [
        'https://x.com/PerrelleVivien',
        'https://www.linkedin.com/in/vivien-perrelle/',
    ],
};

const defaults = {
    title: 'Vivien Perrelle | AI Agent Architect',
    description: 'Portfolio of an AI Developer & Entrepreneur exploring agentic AI and Pharmaceutical regulations.',
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
            <link rel="canonical" href={seo.url} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={seo.url} />
            <meta property="og:site_name" content="Vivien Perrelle" />
            <meta property="og:locale" content={locale} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
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
