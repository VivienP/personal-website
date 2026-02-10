const SITE_URL = 'https://vivienperrelle.com';

const defaults = {
    title: 'Vivien Perrelle | AI Product & Strategy',
    description: 'Portfolio of an AI Developer & Entrepreneur exploring Old Money aesthetics in Tech.',
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
}) => {
    const seo = {
        title: title || defaults.title,
        description: description || defaults.description,
        image: image?.startsWith('http') ? image : `${SITE_URL}${image || '/me.png'}`,
        url: url ? `${SITE_URL}${url}` : SITE_URL,
    };

    return (
        <>
            <title>{seo.title}</title>
            <meta name="description" content={seo.description} />
            <link rel="canonical" href={seo.url} />

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={seo.title} />
            <meta property="og:description" content={seo.description} />
            <meta property="og:image" content={seo.image} />
            <meta property="og:url" content={seo.url} />
            <meta property="og:site_name" content="Vivien Perrelle" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@PerrelleVivien" />
            <meta name="twitter:title" content={seo.title} />
            <meta name="twitter:description" content={seo.description} />
            <meta name="twitter:image" content={seo.image} />

            {/* Article meta */}
            {article?.publishedTime && (
                <meta property="article:published_time" content={article.publishedTime} />
            )}
            {article?.author && (
                <meta property="article:author" content={article.author} />
            )}

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* JSON-LD */}
            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </>
    );
};

export default SEO;
