import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCalApi } from '@calcom/embed-react';
import { ArrowRight, ArrowUpRight, Mail, Calendar } from 'lucide-react';
import { EMAIL_HREF } from '../utils/email';

const CAL_NAMESPACE = 'quick-chat';

// The two ways of working with me, as the homepage presents them. Deliberately
// the Beyond Work column rhythm rather than the bordered Projects card: this
// section closes the page and should read as two short paragraphs with a way in,
// not as a pricing grid.
const OFFERS = [
    {
        title: 'AI Engineering',
        body: 'Software at the boundary between models, scientific data and experiments: scientific data infrastructure, evaluation and reliability, AI workflows, and the systems that turn model output into the next experiment. For biology, TechBio and AI-for-science R&D teams.',
        to: '/freelance-ai-engineer-biology',
        cta: 'Explore AI engineering',
    },
    {
        title: 'AI Training & Workshops',
        body: 'Practical AI training for professional teams, built around the work they actually do: confidential AI use, local models, and Claude, ChatGPT and MCP workflows. Delivered to law firms, accounting professionals, business leaders and university audiences.',
        to: '/ai-training',
        cta: 'Explore AI training',
    },
];

const Offers = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 max-w-4xl mb-12">
        {OFFERS.map(({ title, body, to, cta }) => (
            <div key={to}>
                <h3 className="text-xl text-primary mb-3">{title}</h3>
                <p className="text-sm text-secondary leading-relaxed mb-4">{body}</p>
                <Link
                    to={to}
                    className="group inline-flex items-center space-x-2 text-sm text-primary border-b border-primary pb-0.5 hover:text-accent hover:border-accent transition-colors"
                >
                    <span>{cta}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        ))}
    </div>
);

// The booking block that closes every commercial page. `lead` is what sits between
// the heading and the controls: the landing pages pass a paragraph scoped to the
// offer the reader has just finished, and the homepage, which has to introduce
// both, falls through to the two offers instead.
const Contact = ({ lead = null }) => {
    // Initialise the Cal.com embed once; the modal loads on element click,
    // so nothing heavy runs for visitors who don't book.
    useEffect(() => {
        (async () => {
            const cal = await getCalApi({ namespace: CAL_NAMESPACE });
            cal('ui', {
                hideEventTypeDetails: false,
                layout: 'month_view',
                cssVarsPerTheme: {
                    light: { 'cal-brand': '#3A2328' },
                    dark: { 'cal-brand': '#3A2328' },
                },
            });
        })();
    }, []);

    return (
        <section id="contact" className="py-24 px-6 border-t border-border-subtle/30">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl text-primary mb-6">Work with me</h2>

                {lead ? (
                    <p className="text-base text-secondary leading-relaxed max-w-2xl mb-10">{lead}</p>
                ) : (
                    <Offers />
                )}

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
                        href={EMAIL_HREF}
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
