import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Thumb = ({ src, alt }) => (
    <div className="aspect-square w-full overflow-hidden border border-border-subtle mb-4">
        <img
            src={src}
            alt={alt}
            loading="lazy"
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
    </div>
);

const BeyondWork = () => {
    return (
        <section id="beyond-work" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl text-primary mb-12">Beyond Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Engagement */}
                    <div className="group">
                        <Thumb src="/other/army.jpg" alt="Vivien Perrelle as an Air Force reservist" />
                        <h3 className="text-xl text-primary mb-2">Engagement</h3>
                        <p className="text-sm text-secondary leading-relaxed">
                            I enlisted as a reservist in the French Air Force at 18.
                        </p>
                    </div>

                    {/* Hiking */}
                    <div className="group">
                        <Thumb src="/other/hiking.jpg" alt="Hiking in the French Alps" />
                        <h3 className="text-xl text-primary mb-2">Hiking</h3>
                        <p className="text-sm text-secondary leading-relaxed">
                            I love hiking in the French Alps.
                        </p>
                    </div>

                    {/* Art — clickable, links to the gallery */}
                    <Link to="/art" className="group block">
                        <Thumb src="/other/drawing.webp" alt="Charcoal drawing of an eye and flowing hair" />
                        <h3 className="text-xl text-primary group-hover:text-accent transition-colors mb-2">Art</h3>
                        <p className="text-sm text-secondary leading-relaxed mb-3">
                            I used to draw.
                        </p>
                        <span className="inline-flex items-center space-x-2 text-sm text-primary border-b border-primary pb-0.5 group-hover:text-accent group-hover:border-accent transition-colors">
                            <span>View gallery</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default BeyondWork;
