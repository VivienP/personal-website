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

const ExternalLink = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors"
    >
        {children}
    </a>
);

const FreelanceAIEngineer = () => {
    return (
        <main className="min-h-screen animate-in fade-in duration-700">
            <SEO
                title="Lab Automation Software Engineer | Vivien Perrelle"
                description="Fixed-scope software engineering for existing laboratory automation deployments: workflow implementation, instrument/software integration, reliability, testing and handover."
                url="/lab-automation-software-engineer"
                jsonLd={{
                    '@context': 'https://schema.org',
                    ...FREELANCE_SERVICE_JSON_LD,
                }}
            />

            <article className="py-24 px-6 max-w-3xl mx-auto">
                <BackLink to="/" label="Back" />

                <header className="mb-12 space-y-6">
                    <p className="text-sm font-mono uppercase tracking-wide text-secondary">
                        Freelance software engineering
                    </p>
                    <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                        Software engineering for laboratory automation
                    </h1>
                    <p className="text-base text-primary leading-relaxed">
                        I build and improve the software behind existing laboratory automation workflows:
                        implementing protocols in Python, connecting instruments and services, and making
                        failures easier to investigate.
                    </p>
                    <p className="text-base text-primary leading-relaxed">
                        I work with integrators, instrument vendors and internal automation teams. Together,
                        we define the software change, how it will be tested, and what needs to be checked on
                        the instruments.
                    </p>
                </header>

                <div className="prose prose-neutral text-primary max-w-none space-y-5 font-normal">
                    <SectionTitle>What I can help you build</SectionTitle>
                    <ul className="list-disc pl-6 space-y-3 text-primary">
                        <li>
                            <strong>Workflow implementation</strong>: implement or adapt workflow logic in
                            Python, using PyLabRobot, vendor SDKs or APIs within your existing setup.
                        </li>
                        <li>
                            <strong>Instrument and software integration</strong>: connect instruments and
                            services to your workflow, with explicit interfaces and failure handling.
                        </li>
                        <li>
                            <strong>Reliability and recovery</strong>: make failures easier to diagnose,
                            improve logging, and add retry or reconciliation logic where the physical effects
                            are understood.
                        </li>
                        <li>
                            <strong>Testing and handover</strong>: test normal operation and failure cases
                            with mocks or simulations, and document the software for the team maintaining it.
                        </li>
                    </ul>

                    <SectionTitle>From experiments to software</SectionTitle>
                    <p>
                        I started on the experimental side, building{' '}
                        <InlineLink to="/projects/biowatch">wearable biosensors</InlineLink> and working in
                        R&amp;D at <InlineLink to="/projects/pkvitality">PKvitality</InlineLink>. That experience
                        shapes how I approach software: measurements are noisy, instruments drift, and a
                        successful command does not always tell us what happened at the bench.
                    </p>

                    <SectionTitle>Selected work</SectionTitle>

                    <Subheading>Merged contributions to PyLabRobot</Subheading>
                    <p>
                        I contributed structured lifecycle events for plate readers, imagers and thermocyclers to{' '}
                        <ExternalLink href="https://github.com/PyLabRobot/pylabrobot">PyLabRobot</ExternalLink>,
                        an open-source lab automation framework. The merged contribution makes software
                        operations easier to trace while keeping backend completion distinct from physical
                        verification.{' '}
                        <ExternalLink href="https://github.com/PyLabRobot/pylabrobot/pull/1229">
                            Review the merged PR
                        </ExternalLink>.
                    </p>

                    <Subheading>Real automation logs: what does “succeeded” actually prove?</Subheading>
                    <p>
                        I audited public Chemspeed and batch-distillation logs to examine what software
                        records establish about physical execution. All 986 Chemspeed operations had matching
                        start and end events, but the reported transfer volumes did not establish an
                        independent measurement of physical transfer. In the distillation data, nearby log
                        activity was not proof of the recovery intervention itself.{' '}
                        <ExternalLink href="https://github.com/VivienP/lab-log-observability-audit">
                            Audit, data provenance and reproduction steps
                        </ExternalLink>{' '}
                        ·{' '}
                        <InlineLink to="/journal/when-a-lab-command-says-succeeded">
                            Read the analysis
                        </InlineLink>.
                    </p>

                    <Subheading>LabBridge: failure-aware execution and evidence</Subheading>
                    <p>
                        <ExternalLink href="https://github.com/VivienP/labbridge">LabBridge</ExternalLink>{' '}
                        is my open-source project for experimental data and execution reliability. Its fault
                        campaign tests recovery after process termination across 100 seeded synthetic
                        campaigns, checking for lost observations, duplicate acceptances, budget overspends,
                        projection mismatches and package-verification failures. This validation covers
                        synthetic replay infrastructure; it is not a live-instrument result.
                    </p>

                    <SectionTitle>How we start</SectionTitle>
                    <p>
                        We start with a short call about your workflow and the software change you need.
                        I work within your existing repository and tools. We agree on the scope, access,
                        deliverables and acceptance criteria before implementation, with a first milestone
                        that your team can review and test.
                    </p>
                    <p>
                        If the scope is not yet clear, the first paid milestone can be a short feasibility
                        study covering the workflow, interfaces, technical unknowns and an implementation plan.
                    </p>
                    <p>
                        Remote from France with overlap for European and US-East teams. On-site work can be
                        discussed when hardware access makes it necessary.
                    </p>

                    <SectionTitle>Software delivery and lab validation</SectionTitle>
                    <p>
                        I deliver the agreed software, tests and documentation, including what was validated
                        in software and what still needs physical confirmation. Your automation or applications
                        team remains responsible for the scientific method, hardware configuration, calibration,
                        labware and consumable compatibility, physical safety, bench validation and the
                        decision to put a workflow into production. We identify any additional applications or
                        hardware expertise needed before the engagement starts.
                    </p>

                    <SectionTitle>Tools I work with</SectionTitle>
                    <p>
                        Primarily Python: async services, FastAPI, Pydantic, SQLAlchemy, pytest and typed
                        interfaces. For lab automation I work with PyLabRobot and can integrate against the
                        interface your project already uses, including vendor SDKs or APIs. I also build
                        agentic and MCP-based systems when they solve a concrete workflow problem.
                    </p>
                </div>
            </article>

            <Contact lead="Tell me about the workflow you are working on and the software change you need. We can start with a short call to discuss the scope, access and validation requirements." />
        </main>
    );
};

export default FreelanceAIEngineer;
