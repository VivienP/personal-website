import React from 'react';
import CollectionListItem from '../components/CollectionListItem';
import { journalArticles } from '../data/journalArticles';

export const JournalList = ({ showTags = false, headingLevel = 'h3' }) => (
    <div className="flex flex-col">
        {journalArticles.map((article) => (
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

const Journal = () => {
    return (
        <section id="journal" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl text-primary">Journal</h2>
                </div>

                <JournalList />
            </div>
        </section>
    );
};

export default Journal;
