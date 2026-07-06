import React, { useState } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';

// Email is assembled at runtime so the raw address never sits in the
// static HTML as scrapable plain text.
const EMAIL_USER = 'vivienperrelle';
const EMAIL_DOMAIN = 'gmail.com';

const Contact = () => {
    const [href, setHref] = useState('#');

    // Only wire the real mailto: on user intent, keeping the address out of
    // the rendered markup until it's actually needed.
    const revealEmail = () => {
        if (href === '#') {
            setHref(`mailto:${EMAIL_USER}@${EMAIL_DOMAIN}`);
        }
    };

    return (
        <section id="contact" className="py-24 px-6 border-t border-border-subtle/30">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl text-primary mb-6">Work with me</h2>

                <p className="text-base text-secondary leading-relaxed max-w-2xl mb-10">
                    Open to selective AI-for-Science engineering work — AI agents, RAG,
                    verification, and scientific tooling. Building alongside teams pushing
                    research forward is exactly the kind of work I want.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <a
                        href={href}
                        onMouseEnter={revealEmail}
                        onFocus={revealEmail}
                        onClick={revealEmail}
                        className="group inline-flex items-center justify-center space-x-2 px-6 py-3 border border-border-subtle text-sm text-primary hover:border-accent hover:text-accent transition-colors"
                    >
                        <Mail size={16} />
                        <span>Email me</span>
                    </a>

                    <a
                        href="https://www.malt.fr/profile/vivienperrelle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center space-x-2 px-6 py-3 border border-border-subtle text-sm text-primary hover:border-accent hover:text-accent transition-colors"
                    >
                        <span>Available for freelance on Malt</span>
                        <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
