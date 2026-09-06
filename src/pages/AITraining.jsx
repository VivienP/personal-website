import React from 'react';
import { Link } from 'react-router-dom';
import BackLink from '../components/BackLink';
import BorderedImage from '../components/BorderedImage';
import SEO from '../components/SEO';
import { SectionTitle, Subheading } from '../components/LandingHeadings';
import { TRAINING_SERVICE_JSON_LD } from '../components/jsonld';
import Contact from '../sections/Contact';

// A real photograph from a session, in the same frame the project pages use.
// `src` is empty until the file is committed, and the figure is skipped entirely
// while it is: a missing image would break the page at its most visible point.
//
// To enable it: put the photo at public/training/workshop.webp (git-tracked, or
// it 404s in production), optimised like public/art — long edge <= 1600 px, WebP
// quality 80 — then set `src` below and correct `width`/`height` to the file's
// real pixel dimensions so the layout reserves the right space.
const SESSION_PHOTO = {
    src: '',
    width: 1600,
    height: 1067,
    alt: 'Vivien Perrelle running an AI workshop with a professional team',
};

const AITraining = () => {
    return (
        <main className="min-h-screen animate-in fade-in duration-700">
            <SEO
                title="AI Training & Workshops for Professional Teams | Vivien Perrelle"
                description="Practical AI training for companies and professional teams: Claude and ChatGPT workflows, confidential AI use, local models, MCP connectors. Each workshop built around your team's own work."
                url="/ai-training"
                jsonLd={{
                    '@context': 'https://schema.org',
                    ...TRAINING_SERVICE_JSON_LD,
                }}
            />

            <article className="py-24 px-6 max-w-3xl mx-auto">
                <BackLink to="/" label="Back" />

                <header className="mb-10 space-y-6">
                    <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                        AI Training &amp; Workshops for Professional Teams
                    </h1>
                    <p className="text-base text-primary leading-relaxed">
                        I&rsquo;m an AI engineer, and alongside the systems I build I run practical AI
                        training for professional teams: hands-on sessions designed around the work the
                        participants actually do, from confidential use of AI and local models through to
                        Claude, ChatGPT, MCP connectors and the workflows that make them repeatable.
                        People leave with tools they use the next morning, not a folder of slides.
                    </p>
                    <p className="text-base text-secondary leading-relaxed">
                        Workshops and teaching delivered to law firms, accounting professionals,
                        business leaders and university audiences.
                    </p>
                </header>

                {SESSION_PHOTO.src ? (
                    <div className="mb-12">
                        <BorderedImage
                            src={SESSION_PHOTO.src}
                            alt={SESSION_PHOTO.alt}
                            width={SESSION_PHOTO.width}
                            height={SESSION_PHOTO.height}
                        />
                    </div>
                ) : null}

                <div className="prose prose-neutral text-primary max-w-none space-y-5 font-normal">
                    <SectionTitle>What the workshops cover</SectionTitle>
                    <p>
                        Four areas, in the order teams usually need them. Each session draws on them in
                        the proportion that fits the room.
                    </p>

                    <Subheading>Foundations and everyday workflows</Subheading>
                    <p>
                        Using Claude and ChatGPT properly: what the interfaces actually offer, which
                        tool or model suits which task, and how Projects, custom instructions and
                        reusable context let an assistant start each task already knowing the work.
                        Then the output professionals need, from documents and analyses to
                        presentation decks, and a method for telling which recurring tasks in the
                        business are worth handing to AI in the first place.
                    </p>

                    <Subheading>Confidential and responsible use</Subheading>
                    <p>
                        What can reasonably be sent to an external AI provider and what cannot, how to
                        anonymise or pseudonymise material before it leaves the organisation, and how
                        your own professional secrecy obligations and internal AI policy bear on that
                        decision. When a cloud tool is the right choice, and when a local model is
                        better: we install one with Ollama or LM Studio and see first-hand what it can
                        and cannot do. Running a model locally changes where the data goes; it does not
                        by itself make a use case compliant. I&rsquo;m an engineer, not a lawyer, so the
                        training gives your team the technical reasoning and the questions to take to
                        counsel or to your DPO.
                    </p>

                    <Subheading>Beyond the chat window</Subheading>
                    <p>
                        Connecting assistants to the tools and information a team already works with,
                        through MCP connectors, including services such as email where that is
                        appropriate. Reusable capabilities, Skills, recurring automated tasks, and the
                        persistent instructions that turn a good result into a repeatable one. Taught
                        for professionals rather than developers: it is configuration and judgement, not
                        code.
                    </p>

                    <Subheading>Applied to your team&rsquo;s own work</Subheading>
                    <p>
                        We work on the participants&rsquo; real tasks, with their own tools and
                        constraints, and build the two or three workflows that will still matter once I
                        leave. No two workshops are the same: the use cases worth having in a law firm,
                        an accounting practice and a research team have almost nothing in common.
                    </p>

                    <SectionTitle>How I design a session</SectionTitle>
                    <p>
                        I prepare each workshop for the people who will be in the room. It usually goes
                        like this:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-primary">
                        <li>
                            A scoping call: who is in the room, what they already use, how their work
                            flows, and what they are not allowed to share.
                        </li>
                        <li>
                            A shortlist of the use cases where AI would genuinely save them time, agreed
                            with you rather than assumed.
                        </li>
                        <li>
                            A session built on that shortlist, with hands-on exercises on real material
                            instead of generic demonstrations.
                        </li>
                        <li>
                            Technical depth adjusted as we go, so the confident participants keep moving
                            and nobody is left behind.
                        </li>
                        <li>
                            A written recap of the workflows, instructions and settings we built
                            together, so the team can keep using and extending them.
                        </li>
                    </ol>

                    <SectionTitle>Why me</SectionTitle>
                    <p>
                        I teach what I build. My daily work is engineering AI systems for research and
                        regulated environments, including on-premise and air-gapped deployments at{' '}
                        <a href="https://www.locuslabhq.com/" target="_blank" rel="noopener noreferrer" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                            LocusLab
                        </a>{' '}
                        where data cannot leave the client&rsquo;s infrastructure, and{' '}
                        <Link to="/lab-automation-software-engineer" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                            freelance software engineering
                        </Link>{' '}
                        for laboratory automation teams. That is what the sessions carry back into the
                        room: where these tools are genuinely strong, where they fail quietly, and what
                        that means for work that has to be right.
                    </p>

                    <SectionTitle>Who I work with</SectionTitle>
                    <p>
                        The sessions adapt to very different profiles: independent professionals, SME
                        leadership teams, consulting and professional-services firms, specialist
                        practices, and university audiences. What changes between them is the pace, the
                        examples and the technical depth, never how hands-on the session is.
                    </p>

                    <SectionTitle>Format</SectionTitle>
                    <p>
                        Half-day or full-day sessions, on site or remote, in French or English. Longer
                        programmes run as several sessions, spaced so participants can put each one into
                        practice before the next. None of that is fixed: a short call beforehand scopes
                        the content, the depth and the format to your team&rsquo;s tools, constraints
                        and hardware.
                    </p>

                    <SectionTitle>Common questions</SectionTitle>

                    <Subheading>Do participants need a technical background?</Subheading>
                    <p>
                        No. The sessions are built for professionals, not developers. Everything
                        hands-on, including running a model on your own machine, is done step by step
                        together.
                    </p>

                    <Subheading>Can you work within our confidentiality constraints?</Subheading>
                    <p>
                        Yes, and it is usually the first thing we scope. Your constraints decide which
                        tools are on the table, which material can be worked on live, and whether we run
                        anything locally, so they belong in the design of the session rather than in a
                        disclaimer at the end of it.
                    </p>

                    <Subheading>How does an engagement start?</Subheading>
                    <p>
                        A 30-minute call. If the fit is there, I send a concrete proposal within a few
                        days: content, format, dates. If it isn&rsquo;t, I&rsquo;ll say so directly.
                    </p>
                </div>
            </article>

            {/* The reader is already on the training offer, so the closing block
                restates that one rather than reintroducing both. */}
            <Contact lead="I run AI training and workshops for professional teams, each one built around the work the participants actually do. If you are considering a session, the easiest first step is a short call." />
        </main>
    );
};

export default AITraining;
