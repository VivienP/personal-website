import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import CollectionListItem from '../components/CollectionListItem';
import { journalArticles } from '../data/journalArticles';

const featuredArticle = journalArticles.find((article) => article.featured);

export const JournalList = ({ showTags = false, headingLevel = 'h3', exclude = null }) => (
    <div className="flex flex-col">
        {journalArticles.filter((article) => article.slug !== exclude).map((article) => (
            <CollectionListItem
                key={article.slug}
                to={`/journal/${article.slug}`}
                date={article.date}
                tag={showTags ? article.tag : undefined}
                title={article.title}
                headingLevel={headingLevel}
            />
        ))}
    </div>
);

// Same card vocabulary as the featured project in Selected Work.
const FeaturedArticle = ({ article }) => (
    <Link
        to={`/journal/${article.slug}`}
        className="group mb-8 flex flex-col justify-between border border-border-subtle p-6 hover:border-accent transition-colors duration-300"
    >
        <div className="space-y-4">
            <span className="block font-mono text-xs uppercase tracking-widest text-secondary">Start here</span>
            <div className="flex justify-between items-start">
                <h3 className="text-xl text-primary group-hover:text-accent transition-colors">{article.title}</h3>
                <ArrowRight size={18} className="text-secondary group-hover:text-primary transition-colors shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" />
            </div>

            <p className="text-sm text-secondary leading-relaxed">{article.excerpt}</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-secondary px-2 py-1 bg-border-subtle/30 rounded-sm">{article.tag}</span>
            <span className="text-xs font-mono text-secondary px-2 py-1">{article.date}</span>
        </div>
    </Link>
);

const Journal = () => {
    return (
        <section id="journal" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl text-primary">Journal</h2>
                </div>

                {featuredArticle && <FeaturedArticle article={featuredArticle} />}

                <JournalList exclude={featuredArticle?.slug} />
            </div>
        </section>
    );
};

export default Journal;
