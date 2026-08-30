import React from 'react';
import { Link } from 'react-router-dom';
import BackLink from '../components/BackLink';
import SEO from '../components/SEO';
import { SectionTitle, Subheading } from '../components/LandingHeadings';
import { FREELANCE_SERVICE_JSON_LD } from '../components/jsonld';
import Contact from '../sections/Contact';

const InlineLink = ({ to, children }) => (
    <Link to={to} className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
        {children}
    </Link>
);

const FreelanceAIEngineer = () => {
    return (
        <main className="min-h-screen animate-in fade-in duration-700">
            <SEO
                title="Freelance AI & Scientific Software Engineer for Biology R&D | Vivien Perrelle"
                description="Freelance engineer for biology and AI-for-science R&D: scientific data infrastructure, evaluation, AI workflows and experimental design. Book an intro call."
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
                        Scientific Software &amp; AI Engineering for R&amp;D Teams
                    </h1>
                    <p className="text-base text-primary leading-relaxed">
                        I build reliable software at the boundary between models, scientific data and
                        experiments: the data infrastructure, the evaluation, the AI workflows and the
                        experimental tooling that turn a research capability into a system a team can
                        depend on.
                    </p>
                </header>

                <div className="prose prose-neutral text-primary max-w-none space-y-5 font-normal">
                    <SectionTitle>What I build</SectionTitle>
                    <p>Most projects need several of these at once:</p>
                    <ul className="list-disc pl-6 space-y-2 text-primary">
                        <li>
                            <strong>Scientific products and platforms</strong>: Python services, APIs and
                            internal research tools that take an ambiguous research need to something
                            scientists can use without its author beside them.
                        </li>
                        <li>
                            <strong>Scientific data infrastructure</strong>: ingestion, validation,
                            structured metadata, provenance and versioned transformations, so a processed
                            result can be traced back to the raw measurement and re-derived.
                        </li>
                        <li>
                            <strong>Evaluation and reliability</strong>: harnesses, regression suites,
                            deterministic checks and documented failure modes, so a probabilistic system
                            becomes testable rather than merely convincing.
                        </li>
                        <li>
                            <strong>AI workflows grounded in scientific data</strong>: agents, tool
                            calling, structured outputs and retrieval over primary sources, with humans
                            approving the steps that are expensive to undo.
                        </li>
                        <li>
                            <strong>Experimental design and decision systems</strong>: the layer that
                            turns model output into the next experiment, choosing what to measure under a
                            real budget.
                        </li>
                    </ul>

                    <SectionTitle>From experiments to software</SectionTitle>
                    <p>
                        I started on the experimental side. My{' '}
                        <InlineLink to="/academic-work/smartwatch-embedded-biosensors">
                            MSc thesis
                        </InlineLink>{' '}
                        covered two years of wearable biosensor work at the Institute for Future
                        Technologies: the{' '}
                        <InlineLink to="/projects/biowatch">BioWatch</InlineLink>, a smartwatch I built
                        from scratch to carry the enzymatic biosensors I was developing, and a
                        microneedle lactate module for it. I then joined R&amp;D at{' '}
                        <InlineLink to="/projects/pkvitality">PKvitality</InlineLink> as a research
                        assistant, running in vitro tests on electrochemical microneedle CGM prototypes
                        and documenting the anomalies that guided the next iteration.
                    </p>
                    <p>
                        Which is why I don&rsquo;t treat scientific data as clean input. Measurements are
                        noisy, instruments drift, protocols change between runs. It is the question I now
                        ask of software: what happens when the data is wrong, and how would we find out?
                    </p>

                    <SectionTitle>Selected evidence</SectionTitle>
                    <ul className="list-disc pl-6 space-y-2 text-primary">
                        <li>
                            <strong>
                                <InlineLink to="/projects/epibudget">epibudget</InlineLink>
                            </strong>
                            : an open-source tool that spends a fixed experimental budget on the protein
                            variants exposing interaction structure, not the ones a model predicts will
                            score well. Success criteria were registered before the results, and an
                            earlier interpretation was withdrawn once an audit contradicted it.
                        </li>
                        <li>
                            <strong>
                                <InlineLink to="/projects/scientific-claim-verifier">
                                    Scientific Claim Verifier
                                </InlineLink>
                            </strong>
                            : an open-source engine checking each cited claim against the source it
                            points to. Everything that does not need a model stays deterministic, every
                            step emits provenance, and a regression guard fails the build if SciFact F1
                            drops below its committed baseline (0.92 against 0.62 naive, verifier-only).
                        </li>
                        <li>
                            <strong>Founder-level ownership</strong>:{' '}
                            <InlineLink to="/projects/finexov">Finexov</InlineLink>, an AI platform for
                            public-funding applications taken from cold calls to &euro;30K in sales, and{' '}
                            <InlineLink to="/projects/oseille">Oseille AI</InlineLink>, an agent for
                            French innovation subsidies. Unclear problems, systems defined from scratch,
                            nobody else to hand the ambiguity to.
                        </li>
                    </ul>

                    <SectionTitle>How I think about AI for Science</SectionTitle>
                    <p>
                        The question I keep returning to is not what a scientific system can generate,
                        but how it finds out that it is wrong. Feedback from reality has both a cost and
                        a fidelity, and the two do not move together: the cheapest loops are the easiest
                        to scale and the easiest to fool yourself with. Closing that gap, then using the
                        result to choose the next experiment, is where I find the interesting
                        engineering.
                    </p>
                    <p>
                        I wrote that argument out in{' '}
                        <InlineLink to="/journal/ai-for-science-is-becoming-a-systems-problem">
                            AI for Science Is Moving From Prediction to Closed-Loop Research Systems
                        </InlineLink>
                        , applied it to protein experiments in{' '}
                        <InlineLink to="/journal/designing-protein-experiments-for-epistasis">
                            Measure for Information, Not for Fitness
                        </InlineLink>
                        , and to research agents in{' '}
                        <InlineLink to="/journal/science-is-entering-its-agentic-era">
                            Science Is Entering Its Agentic Era
                        </InlineLink>
                        .
                    </p>

                    <SectionTitle>Who I work with</SectionTitle>
                    <p>
                        R&amp;D teams at the point where a model, a prototype or a research workflow has
                        to become dependable software: AI-native biology and TechBio startups, scientific
                        platform teams, and AI-for-science groups inside larger organisations. Biology is
                        where I am most fluent, but the work generalises wherever models, data and
                        experiments have to line up.
                    </p>
                    <p>
                        I like working inside a team rather than beside it, close to the scientists who
                        will use the system, where it is easier to see which part of their workflow
                        actually breaks. I take one problem at a time and stay with it through the parts
                        nobody could specify at the start, and I write production code with tests and
                        explicit failure modes. Remote on CET hours with comfortable overlap for EU and
                        US-East teams, and glad to relocate for long-term work.
                    </p>

                    <SectionTitle>Common questions</SectionTitle>

                    <Subheading>What stack do you work in?</Subheading>
                    <p>
                        Python: async services with FastAPI and Pydantic, typed and tested (mypy
                        --strict, pytest). LLM APIs and MCP servers, retrieval over CrossRef, OpenAlex
                        and PubMed, ESM-2 where the science calls for it, and Docker deployment,
                        including the air-gapped environments I build under at{' '}
                        <a href="https://www.locuslabhq.com/" target="_blank" rel="noopener noreferrer" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                            LocusLab
                        </a>
                        .
                    </p>

                    <Subheading>How do engagements start?</Subheading>
                    <p>
                        A 30-minute intro call. If the problem is a fit, I send a concrete proposal
                        within a few days: scope, deliverables, timeline. If it isn&rsquo;t, I&rsquo;ll
                        say so directly.
                    </p>
                </div>
            </article>

            {/* The reader is already on the engineering offer, so the closing block
                restates that one rather than reintroducing both. */}
            <Contact lead="I take on selective freelance engagements with biology, TechBio and AI-for-science R&D teams: scientific data infrastructure, evaluation and reliability, AI workflows, and the systems that turn model output into the next experiment." />
        </main>
    );
};

export default FreelanceAIEngineer;
