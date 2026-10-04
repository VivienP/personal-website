import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Hero = () => {
    return (
        <section className="pt-24 pb-12 px-6">
            <div className="max-w-6xl mx-auto w-full">
                <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 space-y-8">

                    <div className="space-y-6">
                        <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-border-subtle bg-border-subtle/20">
                            <img
                                src="/me.png"
                                alt="Portrait of Vivien Perrelle"
                                width={300}
                                height={300}
                                className="w-full h-full object-cover brightness-110"
                            />
                        </div>

                        <h1 className="text-base text-primary leading-relaxed">
                            I’m Vivien Perrelle, a scientific software engineer working on{' '}
                            <Link
                                to="/lab-automation-software-engineer"
                                className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors"
                            >
                                laboratory automation
                            </Link>{' '}
                            and AI for science. I help automation teams adapt and deploy existing laboratory
                            workflows for new instruments, configurations and software integrations.
                        </h1>
                    </div>

                    <p className="text-base text-primary leading-relaxed">
                        PyLabRobot contributor · creator of LabBridge · ex-R&amp;D at PKvitality · founder of Finexov.
                    </p>

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
