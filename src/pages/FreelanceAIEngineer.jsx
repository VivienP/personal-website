import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import { FREELANCE_SERVICE_JSON_LD } from '../components/jsonld';
import Contact from '../sections/Contact';

const SectionTitle = ({ children }) => (
    <h2 className="text-xl md:text-2xl pt-10 pb-2 font-normal text-primary">{children}</h2>
);

const Question = ({ children }) => (
    <h3 className="text-base font-medium text-primary pt-4">{children}</h3>
);

const FreelanceAIEngineer = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="min-h-screen animate-in fade-in duration-700">
            <SEO
                title="Freelance AI Engineer for Biology Teams | Vivien Perrelle"
                description="Hire a freelance AI engineer for biology — AI agents, RAG over scientific literature, and tooling for techbio and AI-for-science teams. Book an intro call."
                url="/freelance-ai-engineer-biology"
                jsonLd={{
                    '@context': 'https://schema.org',
                    ...FREELANCE_SERVICE_JSON_LD,
                }}
            />

            <article className="py-24 px-6 max-w-3xl mx-auto">
                <Link
                    to="/"
                    className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </Link>

                <header className="mb-10 space-y-6">
                    <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                        Freelance AI Engineer for Biology &amp; TechBio Teams
                    </h1>
                    <p className="text-base text-primary leading-relaxed">
                        I&rsquo;m Vivien Perrelle, a freelance AI engineer for biology based in Paris.
                        I help biotech, techbio, and AI-for-science companies design and ship AI agents,
                        RAG pipelines over scientific literature, evaluation harnesses, and scientific
                        data tooling — with verification and reproducibility built in.
                    </p>
                </header>

                <div className="prose prose-neutral text-primary max-w-none space-y-5 font-light">
                    <SectionTitle>What I do</SectionTitle>
                    <p>
                        My work sits where language models meet real scientific workflows — the part
                        that has to be right, not just plausible:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-primary">
                        <li>
                            <strong>AI agents for research workflows</strong> — agents that read, extract,
                            cross-check, and draft over your internal corpus, with humans approving the
                            irreversible steps.
                        </li>
                        <li>
                            <strong>RAG over scientific literature and internal data</strong> — retrieval
                            pipelines grounded in primary sources, built to cite what they claim.
                        </li>
                        <li>
                            <strong>Claim-to-source verification</strong> — deterministic checking that every
                            statement in a generated or human document traces back to its evidence.
                        </li>
                        <li>
                            <strong>Evaluation harnesses</strong> — measurable baselines and regression suites
                            so you know whether the system actually improved.
                        </li>
                        <li>
                            <strong>Scientific data tooling</strong> — pipelines over CrossRef, OpenAlex,
                            PubMed, and your own datasets.
                        </li>
                    </ul>

                    <SectionTitle>Who I work with</SectionTitle>
                    <p>
                        Mostly seed-to-growth techbio and AI-for-biology startups, and AI-for-science
                        teams inside larger organisations — usually at the moment a demo has to become
                        a dependable system. If you&rsquo;re looking for an AI for biology consultant who
                        writes production code rather than slide decks, that&rsquo;s the gap I fill.
                    </p>

                    <SectionTitle>Why me</SectionTitle>
                    <p>
                        I&rsquo;ve worked on both sides of the problem — the biology and the software:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-primary">
                        <li>
                            MSc research on{' '}
                            <Link to="/academic-work/smartwatch-embedded-biosensors" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                smartwatch-embedded enzymatic biosensors
                            </Link>{' '}
                            at the De Vinci Innovation Center.
                        </li>
                        <li>
                            Hands-on R&amp;D at{' '}
                            <Link to="/projects/pkvitality" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                PKvitality
                            </Link>
                            , a VC-backed team building a non-invasive CGM smartwatch.
                        </li>
                        <li>
                            Founder of <a href="https://www.locuslabhq.com/" target="_blank" rel="noopener noreferrer" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">LocusLab</a> —
                            independent evidence-assurance infrastructure for biology and regulated science.
                        </li>
                        <li>
                            Author of an open-source{' '}
                            <Link to="/projects/scientific-claim-verifier" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                scientific claim verifier
                            </Link>{' '}
                            reaching F1 0.92 on SciFact (vs 0.62 naive baseline).
                        </li>
                        <li>
                            Production AI agents shipped at{' '}
                            <Link to="/projects/finexov" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                Finexov
                            </Link>{' '}
                            and{' '}
                            <Link to="/projects/oseille" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                Oseille AI
                            </Link>
                            .
                        </li>
                    </ul>

                    <SectionTitle>How I work</SectionTitle>
                    <p>
                        Every engagement starts with a scoping call, then a fixed-scope proposal with
                        explicit deliverables. I keep the number of parallel engagements deliberately
                        small — the same systems I build for clients power my own verification work,
                        so I only take on projects I can do well. Remote-first from Paris (CET), with
                        comfortable overlap for EU and US-East teams.
                    </p>

                    <SectionTitle>Read my thinking</SectionTitle>
                    <ul className="list-disc pl-6 space-y-2 text-primary">
                        <li>
                            <Link to="/blog/ai-for-science-is-becoming-a-systems-problem" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                AI for Science Is Moving From Prediction to Closed-Loop Research Systems
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog/science-is-entering-its-agentic-era" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                Science Is Entering Its Agentic Era
                            </Link>
                        </li>
                        <li>
                            <Link to="/blog/regulators-dont-accept-vibes" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                Regulators Don&rsquo;t Accept Vibes: The Two Layers Pharma AI Is Missing
                            </Link>
                        </li>
                    </ul>

                    <SectionTitle>Common questions</SectionTitle>

                    <Question>Do you work with early-stage techbio startups?</Question>
                    <p>
                        Yes — that&rsquo;s most of my freelance work. Early teams usually need one system
                        taken from prototype to production, not a permanent hire; a fixed-scope
                        engagement fits that moment well.
                    </p>

                    <Question>What stack do you work in?</Question>
                    <p>
                        Python (async, FastAPI, Pydantic), the major LLM APIs and agent frameworks,
                        retrieval infrastructure, and Docker-based deployment — including on-prem and
                        air-gapped environments when the data can&rsquo;t leave your infrastructure.
                    </p>

                    <Question>How do engagements start?</Question>
                    <p>
                        A 30-minute intro call. If the problem is a fit, I send a fixed-scope proposal
                        within a few days; if it isn&rsquo;t, I&rsquo;ll say so and point you to someone
                        better placed.
                    </p>
                </div>
            </article>

            <Contact showServicesLink={false} />
        </main>
    );
};

export default FreelanceAIEngineer;
