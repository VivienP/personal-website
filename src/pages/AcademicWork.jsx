import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';

const works = [
    {
        date: "2023-10",
        type: "Master's Thesis",
        title: "Smartwatch-Embedded Biosensors For Healthcare Monitoring",
        slug: "smartwatch-embedded-biosensors"
    },
    {
        date: "2023-08",
        type: "Literature Review",
        title: "Exploring Activity-Induced Lactate Pharmacokinetics: Implications for Minimally-Invasive Monitoring",
        slug: "lactate-pharmacokinetics"
    }
];

const WorkItem = ({ work }) => (
    <Link
        to={`/academic-work/${work.slug}`}
        className="group flex items-center justify-between py-5 px-4 border-b border-border-subtle hover:bg-white/50 transition-colors cursor-pointer"
    >
        <div className="flex flex-col md:flex-row md:items-baseline md:space-x-12 w-full pr-8">
            <span className="font-mono text-xs text-secondary w-40 shrink-0">{work.date} · {work.type}</span>
            {/* h2, not h3: this list sits directly under the page h1 and an h3 skips a level. */}
            <h2 className="text-base font-normal text-primary group-hover:text-accent transition-colors flex-1 mt-1 md:mt-0">
                {work.title}
            </h2>
        </div>
        <ArrowUpRight size={16} className="text-secondary opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity shrink-0" />
    </Link>
);

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
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <h1 className="text-3xl md:text-4xl text-primary">Academic Work</h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    Peer-shared research on wearable biosensors and minimally-invasive health monitoring.
                </p>
            </header>

            <div className="flex flex-col">
                {works.map((work) => (
                    <WorkItem key={work.slug} work={work} />
                ))}
            </div>
        </main>
    );
};

export default AcademicWorkPage;
