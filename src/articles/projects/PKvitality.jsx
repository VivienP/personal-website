import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../../components/SEO';

const PKvitality = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Research Intern @ PKvitality: Building a Pandiabetic Smartwatch | Vivien Perrelle"
                description="How the BioWatch prototype landed me an R&D internship at PKvitality, a 50-person startup that raised several million euros to build the first glucose-monitoring smartwatch for diabetics."
                url="/projects/pkvitality"
                image="/pkvitality/pkvitality.jpg"
                imageWidth={782}
                imageHeight={782}
                type="article"
                article={{ publishedTime: '2023-08-01', author: 'Vivien Perrelle', tags: ['PKvitality', 'Continuous Glucose Monitoring', 'Wearable Biosensors', 'R&D', 'Internship'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "CreativeWork",
                    "name": "Research Intern @ PKvitality",
                    "headline": "Research Intern @ PKvitality: Building a Pandiabetic Smartwatch",
                    "datePublished": "2023-08-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/pkvitality/pkvitality.jpg",
                    "video": "https://www.youtube.com/watch?v=VQMigUZQrfE",
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

            <div className="w-full aspect-video overflow-hidden border border-border-subtle mb-16 bg-black">
                <iframe
                    src="https://www.youtube.com/embed/VQMigUZQrfE"
                    title="K'Watch glucose-monitoring smartwatch presentation"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="w-full h-full border-0"
                />
            </div>

            <div className="text-primary max-w-none space-y-8 font-light leading-relaxed text-base mb-12">
                <p>
                    The <Link to="/projects/biowatch" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">BioWatch</Link> prototype I built during my master's led directly to an R&amp;D internship at <a href="https://www.pkvitality.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">PKvitality</a>, a 50-person startup that had raised several million euros to develop the first glucose-monitoring smartwatch for people with diabetes.
                </p>
                <p>
                    At PKvitality, I joined the R&amp;D team as a research assistant and returned to the same minimally invasive biosensing principle I had explored with BioWatch: microneedles designed to measure glucose continuously and painlessly in dermal interstitial fluid. It was the point at which a student prototype became hands-on work on a product moving toward the market.
                </p>
                <p>
                    Working in a multidisciplinary laboratory, I combined daily experimentation with data analysis and scientific monitoring. I ran in vitro tests on electrochemical microneedle CGM prototypes, analyzed the results, documented anomalies and findings, and helped guide the team's next R&amp;D iterations. Alongside this laboratory work, I reviewed the scientific literature and published a <Link to="/academic-work/lactate-pharmacokinetics" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">literature review on lactate pharmacokinetics</Link> during physical activity.
                </p>
            </div>

            <div className="w-full max-w-[600px] mx-auto overflow-hidden border border-border-subtle">
                <img
                    src="/pkvitality/pkvitality.jpg"
                    alt="Vivien Perrelle in front of the PKvitality stand: Continuous Glucose Monitoring in a Smartwatch"
                    loading="lazy"
                    className="w-full h-auto object-cover"
                />
            </div>
        </article>
    );
};

export default PKvitality;
