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
                        Fixed-scope engineering support
                    </p>
                    <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                        Software engineering for laboratory automation workflows
                    </h1>
                    <p className="text-base text-primary leading-relaxed">
                        I take ownership of bounded software work inside existing lab automation deployments,
                        working alongside the team that already owns the protocol, instruments and physical
                        validation.
                    </p>
                    <p className="text-base text-secondary leading-relaxed">
                        Best fit: lab automation integrators, instrument and automation vendors, and internal
                        automation teams with a concrete project already in motion.
                    </p>
                </header>

                <div className="prose prose-neutral text-primary max-w-none space-y-5 font-normal">
                    <SectionTitle>Work I can take off your plate</SectionTitle>
                    <ul className="list-disc pl-6 space-y-3 text-primary">
                        <li>
                            <strong>Workflow implementation and adaptation</strong>: implement or modify
                            existing workflow logic in Python, PyLabRobot, vendor SDKs or APIs, within a
                            configuration your team already understands.
                        </li>
                        <li>
                            <strong>Instrument and software integration</strong>: connect an instrument,
                            service or data handoff to an existing workflow, including typed interfaces,
                            state transitions and failure handling.
                        </li>
                        <li>
                            <strong>Reliability and recovery engineering</strong>: make failure states
                            explicit, improve logging and recovery visibility, add bounded retry or
                            reconciliation logic where the physical semantics are known.
                        </li>
                        <li>
                            <strong>Testing, simulation and handover</strong>: regression tests, mocks or
                            simulated paths, fault cases, documentation and a clean transfer back to the
                            team that will maintain the system.
                        </li>
                    </ul>

                    <SectionTitle>A first engagement stays small</SectionTitle>
                    <p>
                        The starting point is one concrete work package: one workflow, one defined software
                        change, clear required access and an acceptance check agreed before implementation.
                        A typical first milestone is small enough to review and ship without turning into a
                        speculative automation programme.
                    </p>
                    <p>
                        If the scope is not yet clear, the first paid milestone can be a short feasibility
                        sprint that maps the current workflow, interfaces, technical unknowns and a testable
                        implementation plan.
                    </p>

                    <SectionTitle>Responsibility boundary</SectionTitle>
                    <p>
                        I own the software work I agree to deliver. Your automation or applications team
                        remains responsible for the scientific method, hardware configuration, calibration,
                        labware and consumable compatibility, physical safety, bench validation and the
                        decision to put a workflow into production. If a project needs deeper applications or
                        hardware expertise, that expertise should be identified before the engagement starts.
                    </p>

                    <SectionTitle>Selected proof</SectionTitle>

                    <Subheading>PyLabRobot: production open-source contributions</Subheading>
                    <p>
                        I contribute to{' '}
                        <ExternalLink href="https://github.com/PyLabRobot/pylabrobot">PyLabRobot</ExternalLink>,
                        an open-source lab automation framework. A merged contribution added structured
                        lifecycle events across plate readers, imagers and thermocyclers while preserving the
                        distinction between a backend call returning successfully and independent physical
                        proof that an instrument procedure occurred. The PR passed 226 tests plus 29 subtests,
                        mypy, Ruff and the documentation build.{' '}
                        <ExternalLink href="https://github.com/PyLabRobot/pylabrobot/pull/1229">
                            Review the merged PR
                        </ExternalLink>.
                    </p>

                    <Subheading>Real automation logs: what does “succeeded” actually prove?</Subheading>
                    <p>
                        I built a reproducible audit of public Chemspeed and batch-distillation logs to test
                        whether software traces can establish the physical effect of a laboratory command.
                        All 986 Chemspeed operation events paired cleanly; all 60 transfer endpoints reported
                        requested and actual volume as equal; yet the public source did not establish that the
                        reported field was an independent measurement of physical transfer. In the
                        distillation data, 34 of 79 labelled recoveries had nearby parseable log activity in
                        the primary window, which is useful context but not proof of the operator intervention
                        itself.{' '}
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
                        is my open-source experimental-data and reliability project. Its demonstrated fault
                        campaign runs 100 seeded synthetic campaigns across process-termination boundaries
                        with zero lost accepted observations, zero unintended duplicate acceptances, zero
                        hard-budget overspends, zero projection mismatches and zero package-verification
                        failures. That evidence is deliberately limited to synthetic replay infrastructure;
                        it is not presented as a live-instrument result.
                    </p>

                    <SectionTitle>How I work</SectionTitle>
                    <p>
                        I work inside the existing engineering environment rather than replacing it. The
                        engagement starts from the actual repository, workflow, API or integration task. I
                        keep scope, interfaces and failure modes explicit, write tested code, and document
                        what was validated in software versus what still requires physical confirmation.
                    </p>
                    <p>
                        Remote from France with overlap for European and US-East teams. On-site work can be
                        discussed when hardware access makes it necessary.
                    </p>

                    <SectionTitle>Common questions</SectionTitle>

                    <Subheading>What stack do you work in?</Subheading>
                    <p>
                        Primarily Python: async services, FastAPI, Pydantic, SQLAlchemy, pytest and typed
                        interfaces. For lab automation I work with PyLabRobot and can integrate against the
                        interface your project already uses, including vendor SDKs or APIs. I also build
                        agentic and MCP-based systems when they solve a concrete workflow problem rather than
                        adding an unnecessary runtime layer.
                    </p>

                    <Subheading>Do you deliver turnkey laboratory automation?</Subheading>
                    <p>
                        No. I am currently a software specialist inside the delivery team, not a substitute
                        for an experienced automation engineer, applications scientist or hardware
                        integrator. That boundary is intentional.
                    </p>

                    <Subheading>How do engagements start?</Subheading>
                    <p>
                        A short call around one active project. If there is a self-contained software package
                        I can own, I send a proposal with deliverables, dependencies, acceptance criteria and
                        the next milestone. If the task requires expertise I do not have, I will say so.
                    </p>
                </div>
            </article>

            <Contact lead="Have an active lab automation deployment with a bounded software task that needs an owner? I can take on workflow implementation, integration, reliability or testing alongside your automation team." />
        </main>
    );
};

export default FreelanceAIEngineer;
