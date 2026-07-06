import React from 'react';
import { MapPin } from 'lucide-react';

const Hero = () => {
    return (
        <section className="pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto w-full">
                <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-8">

                    {/* Profile Picture */}
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-border-subtle bg-border-subtle/20 grayscale hover:grayscale-0 transition-all duration-500">
                        <img
                            src="/me.png"
                            alt="Vivien"
                            className="w-full h-full object-cover brightness-110"
                        />
                    </div>

                    {/* Bio / Main Title */}
                    <h1 className="text-base text-primary leading-relaxed">
                        I’m Vivien — a founder building verification infrastructure for biology research. I also take on selective freelance work with AI-for-Science teams: AI agents, RAG, and scientific tooling. <br className="hidden md:block" />
                    </h1>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-secondary text-sm md:text-base">
                        <MapPin size={16} className="text-secondary/70" />
                        <span>Paris, France</span>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
