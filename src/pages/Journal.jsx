import React from 'react';
import BackLink from '../components/BackLink';
import SEO from '../components/SEO';
import { journalArticles } from '../data/journalArticles';
import { JournalList } from '../sections/Journal';

const JournalPage = () => {
    return (
        <main className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Journal | Vivien Perrelle"
                description="Essays by Vivien Perrelle on AI-for-science, bioengineering, agentic AI, entrepreneurship, and technology's role in society."
                url="/journal"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Journal — Vivien Perrelle",
                    "description": "Essays on AI-for-science, bioengineering, agentic AI, entrepreneurship, and technology's role in society.",
                    "url": "https://vivienperrelle.com/journal",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "hasPart": journalArticles.map(({ date, title, slug, tag }) => ({
                        "@type": "BlogPosting",
                        "headline": title,
                        "datePublished": date,
                        "about": tag,
                        "url": `https://vivienperrelle.com/journal/${slug}`
                    }))
                }}
            />

            <BackLink to="/" label="Home" />

            <header className="mb-12 space-y-4">
                <h1 className="text-3xl md:text-4xl text-primary">Journal</h1>
                <p className="text-lg text-secondary font-normal max-w-2xl">
                    Essays on AI-for-science, bioengineering, agentic systems, entrepreneurship, and technology's role in society.
                </p>
            </header>

            <JournalList showTags headingLevel="h2" />
        </main>
    );
};

export default JournalPage;
