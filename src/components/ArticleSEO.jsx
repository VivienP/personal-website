import React from 'react';
import SEO from './SEO';
import { AUTHOR, SITE_URL } from './jsonld';
import { resolveOpenGraphImage } from './seoMeta';
import { getJournalArticle } from '../data/journalArticles';

// Person node used as the publisher of every entry. The author node is the shared
// AUTHOR from jsonld.js, so a byline and this publisher resolve to one entity.
const PUBLISHER = { '@type': 'Person', name: AUTHOR.name };

/**
 * Head metadata for a Journal entry, derived from its listing record.
 *
 * A published article used to restate its own slug five times (route manifest,
 * canonical, JSON-LD mainEntityOfPage, byline, listing) and its publication date
 * three (listing, article:published_time, datePublished). Here the article names
 * its slug once; the URL, the canonical, the dates, the author and the publisher
 * come from src/data/journalArticles.js, which fails the build if the slug is
 * unknown or the record incomplete.
 *
 * `jsonLd` carries only what is genuinely per-article — the schema.org type when it
 * is not a BlogPosting, keywords, `about` — and is spread over the derived defaults
 * so an entry can still override one of them deliberately.
 */
const ArticleSEO = ({
    slug,
    title,
    description,
    image,
    imageWidth,
    imageHeight,
    section,
    modifiedTime,
    jsonLd,
}) => {
    const entry = getJournalArticle(slug);
    const url = `/journal/${slug}`;
    const published = entry.date;
    const modified = modifiedTime ?? published;
    const socialImage = resolveOpenGraphImage({
        image: entry.socialImage ?? image,
        imageWidth: entry.socialImageWidth ?? imageWidth,
        imageHeight: entry.socialImageHeight ?? imageHeight,
    });

    return (
        <SEO
            title={title}
            description={description}
            url={url}
            image={socialImage.src}
            imageWidth={socialImage.width}
            imageHeight={socialImage.height}
            twitterCard="summary_large_image"
            type="article"
            article={{
                publishedTime: published,
                // Only announce a revision when there has been one: article:modified_time
                // echoing the publication date tells a crawler nothing.
                ...(modified !== published && { modifiedTime: modified }),
                author: AUTHOR.name,
                section,
            }}
            jsonLd={{
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: entry.title,
                description,
                image: socialImage.src,
                ...jsonLd,
                // Identity and provenance are derived last: they are what makes the
                // listing, the canonical URL and the visible byline agree, so an
                // article cannot quietly disagree with the record it is listed under.
                datePublished: published,
                dateModified: modified,
                author: AUTHOR,
                publisher: PUBLISHER,
                mainEntityOfPage: `${SITE_URL}${url}`,
            }}
        />
    );
};

export default ArticleSEO;
