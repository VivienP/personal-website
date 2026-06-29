import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';

const Finexov = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Finexov — An AI Platform for Public Funding Applications | Vivien Perrelle"
                description="Finexov, my first startup: an AI platform that generates public-funding applications for French startups and scale-ups. Sold to innovation-funding consultancies, with €30K in sales and partnerships with the two largest French firms in the sector."
                url="/projects/finexov"
                type="article"
                article={{ publishedTime: '2024-06-01', author: 'Vivien Perrelle', tags: ['Startup', 'AI Agents', 'Public Funding', 'Sales', 'FinTech'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": "Finexov",
                    "headline": "Finexov — An AI Platform for Public Funding Applications",
                    "datePublished": "2024-06-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "url": "https://finexov.webflow.io/",
                    "mainEntityOfPage": "https://vivienperrelle.com/projects/finexov"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Startup · AI Agents</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Finexov
                </h1>
                <p className="text-xl text-secondary font-light max-w-2xl">
                    An AI platform that generates public-funding applications.
                </p>
                <div className="pt-2 flex">
                    <a href="https://finexov.webflow.io/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>Visit Finexov</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </header>

            <div className="text-primary max-w-none space-y-10 font-light leading-relaxed">
                <p className="text-lg">
                    I launched my first real startup after my end-of-studies internship at a Parisian consulting firm. I wanted to automate my own work: after drafting around 50 public-funding applications for French startups and scale-ups, I built an AI platform to generate my clients' applications, pitched it to consulting firms, and made my first sales.
                </p>

                <section className="space-y-4">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What I did</h2>
                    <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                        <li>Led end-to-end sales — cold calling and emailing, LinkedIn inbound/outbound (100K views/month), product demos, and closing initial deals with key clients in the innovation-funding sector.</li>
                        <li>Built a minimum viable product for an AI-powered funding-application platform.</li>
                    </ul>
                </section>

                <section className="space-y-4">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Results</h2>
                    <ul className="list-disc pl-6 space-y-2 marker:text-secondary">
                        <li><span className="font-medium text-primary">€30K in sales</span> and <span className="font-medium text-primary">€20K raised</span> in public funding.</li>
                        <li>Partnership with the <span className="font-medium text-primary">two largest French innovation-funding consultancies</span> (300+ consultants).</li>
                    </ul>
                </section>

                <p className="text-secondary italic">
                    I eventually stopped this venture to pursue a global project more in line with the ambition and impact I'm after.
                </p>
            </div>
        </article>
    );
};

export default Finexov;
