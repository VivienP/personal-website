import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';
import PdfEmbed from '../../components/PdfEmbed';
import { AUTHOR } from '../../components/jsonld';

const RESEARCHGATE_URL = 'https://www.researchgate.net/publication/375229419_Exploring_Activity-Induced_Lactate_Pharmacokinetics_Implications_for_Minimally-Invasive_Monitoring';
const PDF_URL = '/papers/PERRELLE-Exploring-2023.pdf';

const LactatePharmacokinetics = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-3xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Exploring Activity-Induced Lactate Pharmacokinetics: Implications for Minimally-Invasive Monitoring | Vivien Perrelle"
                description="Literature review (August 2023) written during an internship at PKvitality on the parameters influencing lactate diffusion and the clinical value of dermal interstitial fluid (ISF) lactate as a muscle-fatigue biomarker. A pharmacological guide for developers of lactate microneedle biosensors."
                url="/academic-work/lactate-pharmacokinetics"
                image="/build-lactate-biosensor/microneedles-gold.jpg"
                type="article"
                article={{ publishedTime: '2023-08-01', author: 'Vivien Perrelle', tags: ['Lactate', 'Pharmacokinetics', 'Interstitial Fluid', 'Microneedle Biosensors', 'Muscle Fatigue', 'Minimally-Invasive Monitoring'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "ScholarlyArticle",
                    "headline": "Exploring Activity-Induced Lactate Pharmacokinetics: Implications for Minimally-Invasive Monitoring",
                    "name": "Exploring Activity-Induced Lactate Pharmacokinetics: Implications for Minimally-Invasive Monitoring",
                    "datePublished": "2023-08-01",
                    "inLanguage": "en",
                    "genre": "Literature Review",
                    "author": AUTHOR,
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "abstract": "Faced with the lack of research on dermal interstitial fluid (ISF) lactate concentrations, this article (written during an internship at PKvitality) investigates the main parameters influencing lactate diffusion and, therefore, the clinical value of dermal ISF lactate as a muscle-fatigue biomarker. It serves as a pharmacological guide summarizing the literature for developers of lactate microneedle biosensors.",
                    "image": "https://vivienperrelle.com/build-lactate-biosensor/microneedles-gold.jpg",
                    "keywords": "lactate, pharmacokinetics, interstitial fluid, ISF, microneedle biosensors, muscle fatigue, minimally-invasive monitoring",
                    "url": "https://vivienperrelle.com/academic-work/lactate-pharmacokinetics",
                    "sameAs": RESEARCHGATE_URL,
                    "mainEntityOfPage": "https://vivienperrelle.com/academic-work/lactate-pharmacokinetics",
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
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Literature Review · August 2023</span>
                <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                    Exploring Activity-Induced Lactate Pharmacokinetics: Implications for Minimally-Invasive Monitoring
                </h1>
            </header>

            <div className="text-primary max-w-none space-y-8 font-light leading-relaxed text-base">
                <p>
                    Faced with the lack of research on dermal ISF lactate concentrations, I wrote this article during my internship at PKvitality. I investigate the main parameters influencing lactate diffusion and, therefore, the clinical value of dermal ISF lactate as a muscle fatigue biomarker. This pharmacological guide summarizes my literature research for developers of lactate microneedle biosensors.
                </p>

                <PdfEmbed
                    src={PDF_URL}
                    poster="/papers/PERRELLE-Exploring-2023-p1.webp"
                    title="Exploring Activity-Induced Lactate Pharmacokinetics — full review (PDF)"
                />

                <div className="pt-2">
                    <a
                        href={RESEARCHGATE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm"
                    >
                        <span>Read the full review on ResearchGate</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </article>
    );
};

export default LactatePharmacokinetics;
