import React from 'react';
import CollectionListItem from '../components/CollectionListItem';
import { academicWorks } from '../data/academicWorks';

const AcademicWork = () => {
    return (
        <section id="academic-work" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl text-primary">Academic Work</h2>
                </div>

                <div className="flex flex-col">
                    {academicWorks.map((work) => (
                        <CollectionListItem
                            key={work.slug}
                            to={`/academic-work/${work.slug}`}
                            date={work.date}
                            title={work.title}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicWork;
