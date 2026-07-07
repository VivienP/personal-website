import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';
import PdfEmbed from '../../components/PdfEmbed';
import { AUTHOR } from '../../components/jsonld';

const RESEARCHGATE_URL = 'https://www.researchgate.net/publication/375227950_Smartwatch-Embedded_Biosensors_For_Healthcare_Monitoring';
const PDF_URL = '/papers/PERRELLE-Embedded-2023.pdf';

const SmartwatchBiosensorsThesis = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-3xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Smartwatch-Embedded Biosensors For Healthcare Monitoring | Vivien Perrelle"
                description="Master's thesis (October 2023) on two years of wearable biosensor research at the DVIC: the BioWatch smartwatch and a microneedle lactate sensor module, advocating a systemic design approach balancing technical performance, user experience, and medical relevance."
                url="/academic-work/smartwatch-embedded-biosensors"
                image="/biowatch/biowatch-grand-angle.jpg"
                type="article"
                article={{ publishedTime: '2023-10-01', author: 'Vivien Perrelle', tags: ['Wearable Biosensors', 'Smartwatch', 'Healthcare Monitoring', 'Microneedle', 'Lactate', 'Master Thesis'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "ScholarlyArticle",
                    "headline": "Smartwatch-Embedded Biosensors For Healthcare Monitoring",
                    "name": "Smartwatch-Embedded Biosensors For Healthcare Monitoring",
                    "datePublished": "2023-10-01",
                    "inLanguage": "en",
                    "genre": "Master's Thesis",
                    "author": AUTHOR,
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "abstract": "This master's thesis delves into two years of work on wearable biosensors at the De Vinci Innovation Center. It covers the BioWatch development and the design of a microneedle lactate sensor module for the BioWatch. Beyond exploring smartwatches' potential, this thesis advocates a systemic design approach to wearable biomonitoring systems, driven by the triptych of technical performance, user experience, and medical relevance.",
                    "image": "https://vivienperrelle.com/biowatch/biowatch-grand-angle.jpg",
                    "keywords": "wearable biosensors, smartwatch, healthcare monitoring, microneedle, lactate, BioWatch, biomonitoring",
                    "url": "https://vivienperrelle.com/academic-work/smartwatch-embedded-biosensors",
                    "sameAs": RESEARCHGATE_URL,
                    "mainEntityOfPage": "https://vivienperrelle.com/academic-work/smartwatch-embedded-biosensors",
                    "encoding": {
                        "@type": "MediaObject",
                        "contentUrl": `https://vivienperrelle.com${PDF_URL}`,
                        "encodingFormat": "application/pdf"
                    }
                }}
            />
            <Link to="/academic-work" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Academic Work</span>
            </Link>

            <header className="mb-10 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Master's Thesis · October 2023</span>
                <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                    Smartwatch-Embedded Biosensors For Healthcare Monitoring
                </h1>
            </header>

            <div className="text-primary max-w-none space-y-8 font-light leading-relaxed text-base">
                <p>
                    This master's thesis delves into my two-year work on wearable biosensors at the DVIC. It covers the BioWatch development and the design of a microneedle lactate sensor module for the BioWatch. Beyond exploring smartwatches' potential, this thesis advocates a systemic design approach to wearable biomonitoring systems, driven by the triptych: technical performance, user experience, and medical relevance.
                </p>

                <PdfEmbed
                    src={PDF_URL}
                    poster="/papers/PERRELLE-Embedded-2023-p1.webp"
                    title="Smartwatch-Embedded Biosensors For Healthcare Monitoring — full thesis (PDF)"
                />

                <div className="pt-2">
                    <a
                        href={RESEARCHGATE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm"
                    >
                        <span>Read the full thesis on ResearchGate</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </article>
    );
};

export default SmartwatchBiosensorsThesis;
