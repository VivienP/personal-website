import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CollectionListItem from '../components/CollectionListItem';
import SEO from '../components/SEO';
import { academicWorks } from '../data/academicWorks';

const AcademicWorkPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Academic Work | Vivien Perrelle"
                description="Academic publications by Vivien Perrelle on wearable biosensors: a master's thesis on smartwatch-embedded biosensors for healthcare monitoring, and a literature review on activity-induced lactate pharmacokinetics for minimally-invasive monitoring."
                url="/academic-work"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Academic Work — Vivien Perrelle",
                    "description": "Academic publications by Vivien Perrelle on wearable biosensors and minimally-invasive health monitoring.",
                    "url": "https://vivienperrelle.com/academic-work",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "hasPart": [
                        {
                            "@type": "ScholarlyArticle",
                            "headline": "Smartwatch-Embedded Biosensors For Healthcare Monitoring",
                            "datePublished": "2023-10-01",
                            "learningResourceType": "Master's Thesis",
                            "author": { "@type": "Person", "name": "Vivien Perrelle" },
                            "url": "https://vivienperrelle.com/academic-work/smartwatch-embedded-biosensors"
                        },
                        {
                            "@type": "ScholarlyArticle",
                            "headline": "Exploring Activity-Induced Lactate Pharmacokinetics: Implications for Minimally-Invasive Monitoring",
                            "datePublished": "2023-08-01",
                            "learningResourceType": "Literature Review",
                            "author": { "@type": "Person", "name": "Vivien Perrelle" },
                            "url": "https://vivienperrelle.com/academic-work/lactate-pharmacokinetics"
                        }
                    ]
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Home</span>
            </Link>

            <header className="mb-12 space-y-4">
                <h1 className="text-3xl md:text-4xl text-primary">Academic Work</h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    Peer-shared research on wearable biosensors and minimally-invasive health monitoring.
                </p>
            </header>

            <div className="flex flex-col">
                {academicWorks.map((work) => (
                    <CollectionListItem
                        key={work.slug}
                        to={`/academic-work/${work.slug}`}
                        date={work.date}
                        tag={work.type}
                        title={work.title}
                        headingLevel="h2"
                    />
                ))}
            </div>
        </main>
    );
};

export default AcademicWorkPage;
