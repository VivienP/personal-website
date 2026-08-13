import React, { useState } from 'react';
import BackLink from '../components/BackLink';
import SEO from '../components/SEO';
import { SITE_URL } from '../components/jsonld';

// Display order. `framed` is the photo shown at rest; hovering or tapping a
// framed piece crossfades to `unframed`; `fullWidth` spans both grid columns.
// Files live in public/art (must be git-tracked or they 404 in production).
const ARTWORKS = [
    {
        title: 'Ambition',
        medium: 'Fusain & craie blanche | Charcoal & white chalk',
        size: '40 × 50 cm',
        framed: { src: '/art/ambition-framed.webp', width: 1329, height: 1597 },
        unframed: { src: '/art/ambition.webp', width: 962, height: 1292 },
    },
    {
        title: 'Ragnar Lothbrok',
        medium: 'Crayon & fusain | Pencil & charcoal',
        size: '40 × 50 cm',
        framed: { src: '/art/ragnar-lothbrok-framed.webp', width: 1309, height: 1585 },
        unframed: { src: '/art/ragnar-lothbrok.webp', width: 1271, height: 1600 },
    },
    {
        title: 'Romane',
        medium: 'Crayon | Pencil',
        size: '40 × 60 cm',
        framed: { src: '/art/romane-framed.webp', width: 1149, height: 1600 },
        unframed: { src: '/art/romane.webp', width: 1009, height: 1600 },
    },
    {
        title: 'Joel Miller',
        medium: 'Crayon | Pencil',
        size: '40 × 60 cm',
        framed: { src: '/art/joel-miller-framed.webp', width: 1165, height: 1600 },
        unframed: { src: '/art/joel-miller.webp', width: 1060, height: 1600 },
    },
    {
        title: 'Autre monde | Other world',
        medium: 'Pastel sec | Soft pastel',
        size: '50 × 70 cm',
        framed: null,
        unframed: { src: '/art/other-world.webp', width: 1600, height: 1153 },
        fullWidth: true,
    },
];

const ART_JSON_LD = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/art`,
    name: 'Art | Vivien Perrelle',
    url: `${SITE_URL}/art`,
    inLanguage: 'en',
    hasPart: ARTWORKS.map((a) => ({
        '@type': 'VisualArtwork',
        name: a.title,
        creator: { '@id': `${SITE_URL}/#person` },
        artform: 'Drawing',
        artMedium: a.medium.split(' | ').pop(),
        image: `${SITE_URL}${(a.framed ?? a.unframed).src}`,
    })),
};

const ArtworkCard = ({ artwork, eager }) => {
    // Touch fallback: tapping toggles what hover does on desktop.
    const [revealed, setRevealed] = useState(false);
    const base = artwork.framed ?? artwork.unframed;
    const swap = artwork.framed && artwork.unframed ? artwork.unframed : null;
    const details = `${artwork.medium} · ${artwork.size}`;
    const media = (
        <>
            <img
                src={base.src}
                alt={`${artwork.title} · ${details}`}
                width={base.width}
                height={base.height}
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                className={`w-full h-auto transition-opacity duration-500 ${
                    swap ? (revealed ? 'opacity-0' : 'group-hover:opacity-0') : ''
                }`}
            />
            {swap && (
                <img
                    src={swap.src}
                    alt=""
                    aria-hidden="true"
                    width={swap.width}
                    height={swap.height}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ${
                        revealed ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                />
            )}
        </>
    );

    const toggleReveal = (event) => {
        const isKeyboardActivation = event.detail === 0;
        if (isKeyboardActivation || window.matchMedia('(hover: none)').matches) {
            setRevealed((value) => !value);
        }
    };

    return (
        <figure className={artwork.fullWidth ? 'sm:col-span-2' : undefined}>
            {swap ? (
                <button
                    type="button"
                    className="relative group block w-full border-0 bg-transparent p-0 text-left"
                    onClick={toggleReveal}
                    aria-pressed={revealed}
                    aria-label={`${revealed ? 'Show framed' : 'Show unframed'} ${artwork.title}`}
                >
                    {media}
                </button>
            ) : (
                <div className="relative group">{media}</div>
            )}
            <figcaption className="mt-4">
                <h2 className="text-primary font-medium">{artwork.title}</h2>
                <p className="text-sm text-secondary mt-1">{details}</p>
            </figcaption>
        </figure>
    );
};

const Art = () => {
    return (
        <main className="min-h-screen py-24 px-6 max-w-6xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Art | Vivien Perrelle"
                description="Charcoal, pencil and soft pastel drawings by Vivien Perrelle."
                url="/art"
                jsonLd={ART_JSON_LD}
            />
            <BackLink to="/" label="Back" />

            <header className="mb-12 space-y-4">
                <h1 className="text-3xl md:text-4xl text-primary">Art</h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    A selection of my drawings in charcoal, pencil and soft pastel.
                </p>
            </header>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-14 items-start">
                {ARTWORKS.map((artwork, i) => (
                    <ArtworkCard key={artwork.title} artwork={artwork} eager={i === 0} />
                ))}
            </div>
        </main>
    );
};

export default Art;
