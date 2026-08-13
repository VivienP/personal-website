import React from 'react';
import { Link } from 'react-router-dom';
import BackLink from '../components/BackLink';
import SEO from '../components/SEO';
import { FREELANCE_SERVICE_JSON_LD } from '../components/jsonld';
import Contact from '../sections/Contact';

const SectionTitle = ({ children }) => (
    <h2 className="text-2xl md:text-3xl pt-10 pb-2 font-normal text-primary">{children}</h2>
);

const Question = ({ children }) => (
    <h3 className="text-lg md:text-xl font-medium text-primary pt-4">{children}</h3>
);

const FreelanceAIEngineer = () => {
    return (
        <main className="min-h-screen animate-in fade-in duration-700">
            <SEO
                title="Freelance AI Engineer for Biology Teams | Vivien Perrelle"
                description="Hire a freelance AI engineer for biology: AI agents, RAG over scientific literature, and tooling for TechBio and AI-for-science teams. Book an intro call."
                url="/freelance-ai-engineer-biology"
                jsonLd={{
                    '@context': 'https://schema.org',
                    ...FREELANCE_SERVICE_JSON_LD,
                }}
            />

            <article className="py-24 px-6 max-w-3xl mx-auto">
                <BackLink to="/" label="Back" />

                <header className="mb-10 space-y-6">
                    <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                        Freelance AI Engineer for Biology &amp; TechBio Teams
                    </h1>
                    <p className="text-base text-primary leading-relaxed">
                        I&rsquo;m Vivien Perrelle, an AI engineer specialized in AI for biology. I want
                        to work on systems that genuinely move science forward, and I believe the
                        bottleneck now is trust: AI that is plausible is not enough when the output has
                        to be correct. So I build the verification and reproducibility layer that
                        scientific AI needs. I focus on AI agents, context engineering over scientific
                        data, evaluation harnesses, and claim-to-source verification for research
                        workflows.
                    </p>
                </header>

                <div className="prose prose-neutral text-primary max-w-none space-y-5 font-light">
                    <SectionTitle>What I do</SectionTitle>
                    <p>
                        My work sits where language models meet real scientific workflows, the part
                        that has to be right rather than just plausible:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-primary">
                        <li>
                            <strong>AI agents for research workflows</strong>: agents that read, extract,
                            cross-check, and draft over your internal corpus, with humans approving the
                            irreversible steps.
                        </li>
                        <li>
                            <strong>RAG over scientific literature and internal data</strong>: retrieval
                            pipelines grounded in primary sources, built to cite what they claim.
                        </li>
                        <li>
                            <strong>Claim-to-source verification</strong>: deterministic checking that every
                            statement in a generated or human document traces back to its evidence.
                        </li>
                        <li>
                            <strong>Evaluation harnesses</strong>: measurable baselines and regression suites
                            so you know whether the system actually improved.
                        </li>
                        <li>
                            <strong>Scientific data tooling</strong>: pipelines over CrossRef, OpenAlex,
                            PubMed, and your own datasets.
                        </li>
                    </ul>

                    <SectionTitle>Who I work with</SectionTitle>
                    <p>
                        I want to work with seed-to-growth TechBio and AI-for-biology startups, and
                        AI-for-science teams inside larger organisations, at the moment a demo has to
                        become a dependable system. That transition is what I&rsquo;m built for: an AI
                        for biology engineer who writes production code, not slide decks.
                    </p>

                    <SectionTitle>Why me</SectionTitle>
                    <p>
                        I&rsquo;ve worked on both sides of the problem, the biology and the software:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-primary">
                        <li>
                            Built a{' '}
                            <Link to="/academic-work/smartwatch-embedded-biosensors" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                smartwatch with embedded enzymatic biosensors
                            </Link>{' '}
                            during my MSc in Creative Technologies at the{' '}
                            <a href="https://ift.devinci.fr/" target="_blank" rel="noopener noreferrer" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                Institute for Future Technologies
                            </a>
                            .
                        </li>
                        <li>
                            Hands-on R&amp;D at{' '}
                            <Link to="/projects/pkvitality" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                PKvitality
                            </Link>
                            , a VC-backed team building a non-invasive CGM smartwatch.
                        </li>
                        <li>
                            Founder of <a href="https://www.locuslabhq.com/" target="_blank" rel="noopener noreferrer" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">LocusLab</a>:
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
                            Shipped production AI agents in my own startups,{' '}
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
                        I fit in well with small startup teams. I go all-in on one problem at a time.
                        I work remotely on CET hours, with comfortable overlap for EU and
                        US-East teams. I&rsquo;m also glad to
                        relocate for long-term missions or roles.
                    </p>

                    <SectionTitle>Read my thinking</SectionTitle>
                    <ul className="list-disc pl-6 space-y-2 text-primary">
                        <li>
                            <Link to="/journal/ai-for-science-is-becoming-a-systems-problem" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                AI for Science Is Moving From Prediction to Closed-Loop Research Systems
                            </Link>
                        </li>
                        <li>
                            <Link to="/journal/science-is-entering-its-agentic-era" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                Science Is Entering Its Agentic Era
                            </Link>
                        </li>
                        <li>
                            <Link to="/journal/regulators-dont-accept-vibes" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                                Regulators Don&rsquo;t Accept Vibes: The Two Layers Pharma AI Is Missing
                            </Link>
                        </li>
                    </ul>

                    <SectionTitle>Common questions</SectionTitle>

                    <Question>Do you work with early-stage TechBio startups?</Question>
                    <p>
                        That&rsquo;s exactly the work I&rsquo;m set up for. Early teams usually need one
                        system taken from prototype to production fast, with verification built in so
                        it holds up. I can take that on as a defined project, or embed with the team
                        that owns it.
                    </p>

                    <Question>What stack do you work in?</Question>
                    <p>
                        Python (async, FastAPI, Pydantic), the major LLM APIs and agent frameworks,
                        retrieval infrastructure, and Docker-based deployment, including on-prem and
                        air-gapped environments when the data can&rsquo;t leave your infrastructure.
                    </p>

                    <Question>How do engagements start?</Question>
                    <p>
                        A 30-minute intro call. If the problem is a fit, I send a concrete proposal
                        within a few days: scope, deliverables, timeline. If it isn&rsquo;t, I&rsquo;ll
                        say so directly.
                    </p>
                </div>
            </article>

            <Contact showServicesLink={false} />
        </main>
    );
};

export default FreelanceAIEngineer;
