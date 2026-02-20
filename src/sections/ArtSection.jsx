import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ArtSection = () => {
    return (
        <section id="art-preview" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl text-primary">Art</h2>
                    <p className="text-base text-primary leading-relaxed">
                        Beyond technology, I used to draw.
                    </p>
                    <Link
                        to="/art"
                        className="inline-flex items-center space-x-2 text-primary border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors group"
                    >
                        <span>View Gallery</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ArtSection;
