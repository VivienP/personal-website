import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';

const REPO = 'https://github.com/MCP4Public/landing-page';
const VIDEO_EMBED = 'https://www.youtube.com/embed/7jalJhWDMec?si=CGrJ-VBoOY7SFRna';

const MistralAIHackathon = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Mistral AI MCP Hackathon: MCP Server for European Funding | Vivien Perrelle"
                description="A short project page for the Mistral AI MCP Hackathon: an MCP server built with Andrea Gemelli, Alexandros Popov PhD, and Ali Ahmadi to help companies find European funding calls from Le Chat."
                url="/projects/mistral-ai-hackathon"
                type="article"
                article={{ publishedTime: '2025-10-01', author: 'Vivien Perrelle', tags: ['MCP', 'Mistral AI', 'Public Funding', 'Hackathon', 'Le Chat'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": "Mistral AI MCP Hackathon",
                    "headline": "Mistral AI MCP Hackathon: MCP Server for European Funding",
                    "datePublished": "2025-10-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "about": [
                        { "@type": "Organization", "name": "Mistral AI", "url": "https://mistral.ai" },
                        { "@type": "Thing", "name": "Model Context Protocol" }
                    ],
                    "codeRepository": REPO,
                    "video": "https://youtu.be/7jalJhWDMec",
                    "mainEntityOfPage": "https://vivienperrelle.com/projects/mistral-ai-hackathon"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Hackathon / MCP / Public Funding</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Mistral AI MCP Hackathon
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    A weekend hackathon: an MCP server to help companies find the right European funding calls, directly from Le Chat.
                </p>
                <div className="pt-2 flex flex-wrap gap-4">
                    <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>View GitHub repo</span>
                        <ExternalLink size={14} />
                    </a>
                    <a href="https://www.linkedin.com/posts/vivien-perrelle_we-have-built-an-mcp-server-to-facilitate-activity-7373368028241022977-YFGp" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>LinkedIn Post</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </header>

            <div className="w-full overflow-hidden border border-border-subtle mb-12 bg-black aspect-video">
                <iframe
                    className="w-full h-full"
                    src={VIDEO_EMBED}
                    title="Mistral AI MCP Hackathon demo"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </div>

            <div className="text-primary max-w-none space-y-8 font-light leading-relaxed text-base">
                <p>
                    During Mistral AI's MCP Hackathon, I contributed to Look 4 Fundings with Andrea Gemelli, Alexandros Popov PhD, and Ali Ahmadi.
                </p>
                <p>
                    The server analyzes a company's profile, searches relevant European calls for projects, and starts generating the application file. Stack: Alpic, Weights &amp; Biases, Mistral AI API, and OCR.
                </p>
                <p className="text-secondary italic">
                    I was a contributor, not the author of the repository. The demo is the best way to understand the project.
                </p>
            </div>
        </article>
    );
};

export default MistralAIHackathon;
