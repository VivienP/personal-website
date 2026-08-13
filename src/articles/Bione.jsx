import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import { ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

const Bione = () => {
    return (
        <ArticleLayout backTo="/" backLabel="Back">
            <SEO
                title="Bione: A 3D Interactive App to Learn About Biosensors | Vivien Perrelle"
                description="An open-source WebGL app built on Cables.gl that illustrates a microneedle glucose biosensor in 3D, making biosensing concepts accessible and easy to assimilate."
                url="/projects/bione"
                image="/bione/overview-diagram.jpg"
                imageWidth={1200}
                imageHeight={903}
                type="article"
                article={{ publishedTime: '2023-01-01', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "Bione: A 3D Interactive App to Learn About Biosensors",
                    "datePublished": "2023-01-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "image": "https://vivienperrelle.com/bione/overview-diagram.jpg",
                    "mainEntityOfPage": "https://vivienperrelle.com/projects/bione"
                }}
            />
            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Programming · WebGL</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Bione
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    A 3D interactive app to learn about biosensors.
                </p>
            </header>

            {/* YouTube — full width */}
            <div className="w-full aspect-video border border-border-subtle mb-16 bg-black">
                <iframe
                    src="https://www.youtube.com/embed/ddxQ8p3oF04"
                    title="Bione: interactive 3D biosensor app"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full border-0"
                />
            </div>

            <div className="text-primary max-w-none space-y-16 font-light leading-relaxed">

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Overview</h2>
                    <p>
                        Bione is an open-source WebGL app I coded on the <a href="https://cables.gl/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Cables.gl</a> platform. It illustrates a microneedle glucose sensor that monitors the glucose levels of diabetics in their skin, similar to the one developed by the start-up <a href="https://www.pkvitality.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">PKvitality</a>. The interactive app seeks to make biosensing concepts accessible and easily assimilated, thanks to a 3D interactive wearable biosensor. This is the first 3D educational application for biosensors.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-2">
                        <a href="https://www.youtube.com/watch?v=ddxQ8p3oF04" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                            <span>Watch the demo</span>
                            <ExternalLink size={14} />
                        </a>
                        <a href="https://github.com/VivienP/bione/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                            <span>View on GitHub</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Code architecture</h2>
                    <figure className="space-y-3">
                        <div className="w-full overflow-hidden border border-border-subtle">
                            <img
                                src="/bione/overview-diagram.jpg"
                                alt="Visual architecture of the JavaScript code on Cables.gl"
                                loading="lazy"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        <figcaption className="text-sm text-secondary italic">
                            Visual architecture of the JavaScript code.
                        </figcaption>
                    </figure>
                </section>

                <footer className="pt-12 border-t border-border-subtle">
                    <p className="text-sm text-secondary">
                        © Vivien Perrelle. Open-source WebGL project.
                    </p>
                </footer>

            </div>
        </ArticleLayout>
    );
};

export default Bione;
