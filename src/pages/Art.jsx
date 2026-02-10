import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const Art = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen py-24 px-6 max-w-6xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Art | Vivien Perrelle"
                description="Paintings and drawings by Vivien Perrelle."
                url="/art"
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12">
                <p className="text-lg text-primary">
                    Here are some of my painting and drawings.
                </p>
            </header>

            <div className="w-full aspect-[4/3] md:aspect-[16/10]">
                <iframe
                    src="https://www.behance.net/embed/project/125683349?ilo0=1"
                    allowFullScreen
                    loading="lazy"
                    frameBorder="0"
                    allow="clipboard-write"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className="w-full h-full border-0"
                />
            </div>
        </div>
    );
};

export default Art;
