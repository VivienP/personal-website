import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';

const PKvitality = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Research Intern @ PKvitality — Building a Pandiabetic Smartwatch | Vivien Perrelle"
                description="How the BioWatch prototype landed me an R&D internship at PKvitality, a 50-person startup that raised several million euros to build the first glucose-monitoring smartwatch for diabetics."
                url="/projects/pkvitality"
                image="/pkvitality/pkvitality.jpg"
                type="article"
                article={{ publishedTime: '2023-08-01', author: 'Vivien Perrelle', tags: ['PKvitality', 'Continuous Glucose Monitoring', 'Wearable Biosensors', 'R&D', 'Internship'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": "Research Intern @ PKvitality",
                    "headline": "Research Intern @ PKvitality — Building a Pandiabetic Smartwatch",
                    "datePublished": "2023-08-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/pkvitality/pkvitality.jpg",
                    "about": { "@type": "Organization", "name": "PKvitality", "url": "https://www.pkvitality.com/" },
                    "mainEntityOfPage": "https://vivienperrelle.com/projects/pkvitality"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">MedTech · R&amp;D</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Research Intern @ PKvitality
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    How a prototype opened the door to building a pandiabetic smartwatch.
                </p>
            </header>

            <div className="w-full overflow-hidden border border-border-subtle mb-16">
                <img
                    src="/pkvitality/pkvitality.jpg"
                    alt="Vivien Perrelle in front of the PKvitality stand: Continuous Glucose Monitoring in a Smartwatch"
                    className="w-full h-auto object-cover"
                />
            </div>

            <div className="text-primary max-w-none space-y-8 font-light leading-relaxed text-base">
                <p>
                    The <Link to="/projects/biowatch" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">BioWatch</Link> prototype I built during my master's is what landed me an internship at <a href="https://www.pkvitality.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">PKvitality</a> — a 50-person startup that raised several million euros to build the first glucose-monitoring smartwatch for diabetics.
                </p>
                <p>
                    I joined their R&amp;D team as a research assistant, working on the same minimally-invasive biosensing technology the BioWatch had let me prototype: micro-needles that read glucose in the dermal interstitial fluid, painlessly and continuously. It was the moment a student project turned into hands-on work on a product heading to market.
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                    <a
                        href="https://www.youtube.com/watch?v=4zz6rDdbdZY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm"
                    >
                        <span>Watch the K'Watch presentation</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </article>
    );
};

export default PKvitality;
