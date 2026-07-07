import React from 'react';
import { Link } from 'react-router-dom';
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
                            alt="Portrait of Vivien Perrelle"
                            className="w-full h-full object-cover brightness-110"
                        />
                    </div>

                    {/* Bio / Main Title */}
                    <h1 className="text-base text-primary leading-relaxed">
                        I’m Vivien Perrelle — a founder building verification infrastructure for biology research, and a{' '}
                        <Link
                            to="/freelance-ai-engineer-biology"
                            className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors"
                        >
                            freelance AI engineer for biology
                        </Link>{' '}
                        and TechBio teams: AI agents, context engineering, and scientific tooling. <br className="hidden md:block" />
                    </h1>

                    {/* Credentials */}
                    <p className="text-base text-primary leading-relaxed">
                        MSc in Creative Technologies (Institute for Future Technologies) · ex-R&amp;D at PKvitality ·
                        founder of Finexov and LocusLab · building AI that science can trust.
                    </p>

                    {/* Location */}
                    <div className="flex items-center space-x-2 text-secondary text-sm md:text-base">
                        <MapPin size={16} className="text-secondary/70" />
                        <span>Lyon, France</span>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Hero;
