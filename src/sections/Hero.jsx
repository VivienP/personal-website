import React from 'react';

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
                        I’m Vivien, Product Designer and 2x startup founder. <br className="hidden md:block" />
                        Currently exploring AI for Regulated Industries.
                    </h1>

                    {/* Social Links List */}
                    <ul className="space-y-3 text-secondary text-sm md:text-base pl-1">
                        <li className="flex items-center space-x-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/60"></span>
                            <a
                                href="https://x.com/PerrelleVivien"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-border-subtle underline-offset-4 hover:text-primary hover:decoration-accent transition-all"
                            >
                                X
                            </a>
                        </li>
                        <li className="flex items-center space-x-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-secondary/60"></span>
                            <a
                                href="https://www.linkedin.com/in/vivien-perrelle/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline decoration-border-subtle underline-offset-4 hover:text-primary hover:decoration-accent transition-all"
                            >
                                LinkedIn
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        </section>
    );
};

export default Hero;
