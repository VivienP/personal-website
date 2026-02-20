import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const articles = [
{
        date: "2026-02-19",
        title: "OpenClaw & the Infrastructure of Sovereign Intelligence",
        slug: "openclaw"
    },
    {
        date: "2026-02-10",
        title: "Dubai Is Not Just for Influencers Anymore.",
        slug: "dubai"
    },
    {
        date: "2026-02-09",
        title: "Trauma-Driven VS Purpose-Driven Entrepreneurship",
        slug: "trauma-vs-purpose"
    },
    {
        date: "2023-09-15",
        title: "BioWatch — A Smartwatch Prototype for Wearable Biosensors",
        slug: "biowatch"
    },
    {
        date: "2023-06-20",
        title: "How to Build a Lactate Biosensor?",
        slug: "lactate"
    }
];

import { Link } from 'react-router-dom';

const JournalItem = ({ article }) => (
    <Link
        to={`/blog/${article.slug}`}
        className="group flex items-center justify-between py-5 px-4 border-b border-border-subtle hover:bg-white/50 transition-colors cursor-pointer"
    >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12 w-full pr-8">
            <span className="font-mono text-xs text-secondary w-32 shrink-0">{article.date}</span>
            <h3 className="text-base text-primary group-hover:text-accent transition-colors flex-1 mt-1 md:mt-0">
                {article.title}
            </h3>
        </div>
        <ArrowUpRight size={16} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
    </Link>
);

const Journal = () => {
    return (
        <section id="journal" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl text-primary">Journal</h2>
                </div>

                <div className="flex flex-col">
                    {articles.map((article) => (
                        <JournalItem key={article.slug} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Journal;
