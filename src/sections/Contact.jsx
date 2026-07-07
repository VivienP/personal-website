import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCalApi } from '@calcom/embed-react';
import { ArrowUpRight, Mail, Calendar } from 'lucide-react';

// Email is assembled at runtime so the raw address never sits in the
// static HTML as scrapable plain text.
const EMAIL_USER = 'vivienperrelle';
const EMAIL_DOMAIN = 'gmail.com';

const CAL_NAMESPACE = 'quick-chat';

// showServicesLink is off on the freelance landing page, where the "more on
// how I work" link would point to itself.
const Contact = ({ showServicesLink = true }) => {
    const [href, setHref] = useState('#');

    // Initialise the Cal.com embed once; the modal loads on element click,
    // so nothing heavy runs for visitors who don't book.
    useEffect(() => {
        (async () => {
            const cal = await getCalApi({ namespace: CAL_NAMESPACE });
            cal('ui', {
                hideEventTypeDetails: false,
                layout: 'month_view',
                cssVarsPerTheme: {
                    light: { 'cal-brand': '#1B3022' },
                    dark: { 'cal-brand': '#1B3022' },
                },
            });
        })();
    }, []);

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
                    I take on selective freelance engagements with biology, biotech, and
                    AI-for-science teams — AI agents, context engineering over
                    scientific literature, evaluation, and scientific tooling. The same
                    systems I build for my own verification work at LocusLab.
                    {showServicesLink && (
                        <>
                            {' '}
                            <Link
                                to="/freelance-ai-engineer-biology"
                                className="text-primary border-b border-primary/40 hover:text-accent hover:border-accent transition-colors"
                            >
                                More on how I work →
                            </Link>
                        </>
                    )}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <button
                        type="button"
                        data-cal-namespace={CAL_NAMESPACE}
                        data-cal-link="vivienperrelle/quick-chat"
                        data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
                        className="group inline-flex items-center justify-center space-x-2 px-6 py-3 border border-accent bg-accent/[0.04] text-sm text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                        <Calendar size={16} />
                        <span>Book a call</span>
                    </button>

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
