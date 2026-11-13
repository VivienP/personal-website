import React from 'react';
import { MapPin } from 'lucide-react';
import PortraitViewer from '../components/PortraitViewer';

const Hero = () => {
    return (
        <section className="pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto w-full">
                <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-400 space-y-8">

                    <div className="space-y-6">
                        <PortraitViewer />

                        <h1 className="text-3xl md:text-4xl text-primary">Vivien Perrelle</h1>

                        <p className="text-base text-primary leading-relaxed">
                            I’m an AI engineer and founder with a background in biosensors and lab automation.
                            <br />
                            I’m at Station F with the{' '}
                            <a
                                href="https://thepioneer.vc/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="whitespace-nowrap border-b border-primary/40 hover:text-accent hover:border-accent transition-colors"
                            >
                                <img
                                    src="/media/pioneers.png"
                                    width="16"
                                    height="16"
                                    alt=""
                                    className="inline-block align-middle -mt-0.5 mr-1"
                                />
                                Pioneers
                            </a>{' '}
                            program, looking for the next company to build.
                        </p>
                    </div>

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
