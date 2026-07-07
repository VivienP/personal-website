import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';

const Oseille = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Oseille AI: An Agent for French Innovation Subsidies | Vivien Perrelle"
                description="Oseille AI, a project launched during my time at Finexov, is a specialized agent on Bpifrance innovation subsidies. Through LinkedIn content it helped around ten startups navigate French public funding."
                url="/projects/oseille"
                image="/oseille/oseille-ai-white-preview.jpg"
                type="article"
                article={{ publishedTime: '2024-01-01', author: 'Vivien Perrelle', tags: ['AI Agents', 'Public Funding', 'Bpifrance', 'Startups', 'SaaS'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": "Oseille AI",
                    "headline": "Oseille AI: An Agent for French Innovation Subsidies",
                    "datePublished": "2024-01-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/oseille/oseille-ai-white-preview.jpg",
                    "url": "https://oseille.ai",
                    "mainEntityOfPage": "https://vivienperrelle.com/projects/oseille"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">AI Agents · Public Funding</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Oseille AI
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    An agent for French innovation subsidies. <span className="text-secondary/70">("Oseille" is French slang for "money.")</span>
                </p>
            </header>

            {/* Platform screenshot */}
            <div className="w-full overflow-hidden border border-border-subtle mb-16">
                <img
                    src="/oseille/oseille-preview.avif"
                    alt="The Oseille AI platform interface"
                    className="w-full h-auto object-contain"
                />
            </div>

            <div className="text-primary max-w-none space-y-8 font-light leading-relaxed text-base">
                <p>
                    I launched Oseille AI during my time at Finexov, the consultancy where I built AI agents to streamline R&D documentation for public funding. The idea was simple: turn the dense, ever-changing world of <span className="font-medium text-primary">Bpifrance innovation subsidies</span> into something a founder could actually navigate. Oseille AI is a specialized agent that answers questions about French innovation grants (eligibility, deadlines, the right scheme for a given stage) in plain language.
                </p>
                <p>
                    Rather than a pure product play, I used it as a way to help founders directly. Through <span className="font-medium text-primary">LinkedIn content</span> built around the agent, I ended up guiding around ten startups through their public-funding decisions: which grants to target, how to frame their R&D, and where the common mistakes hide.
                </p>
                <p>
                    Along the way I also launched <span className="font-medium text-primary">boursefrenchtech.fr</span>, a companion resource on the French Tech grant. It is no longer maintained today, but it was part of the same effort: making opaque public funding legible to the people it is meant to serve.
                </p>

                <div className="pt-2">
                    <a
                        href="https://oseille.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm"
                    >
                        <span>Visit oseille.ai</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>

            {/* Astronaut — full bleed at the bottom */}
            <div className="w-full overflow-hidden border border-border-subtle mt-20 bg-black">
                <img
                    src="/oseille/oseille-ai-white-preview.jpg"
                    alt="Oseille.ai"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                />
            </div>
        </article>
    );
};

export default Oseille;
