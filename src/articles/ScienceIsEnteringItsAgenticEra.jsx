import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const ScienceIsEnteringItsAgenticEra = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Science Is Entering Its Agentic Era | Vivien Perrelle"
                description="Exploring how agentic AI is transforming scientific research, from literature review to autonomous hypothesis generation and experimental design."
                url="/blog/science-is-entering-its-agentic-era"
                type="article"
                article={{ publishedTime: '2026-04-17', author: 'Vivien Perrelle', tags: ['AI', 'Agentic AI', 'Scientific Research', 'Research Automation', 'Biotech'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "Science Is Entering Its Agentic Era",
                    "datePublished": "2026-04-17",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "mainEntityOfPage": "https://vivienperrelle.com/blog/science-is-entering-its-agentic-era",
                    "keywords": "AI, Agentic AI, Scientific Research, Research Automation, Biotech"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Journal Entry</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Science Is Entering Its Agentic Era
                </h1>
                <p className="text-xl text-secondary font-light max-w-2xl">
                    How agentic AI is transforming scientific research from assistive tools to autonomous discovery systems.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-light">
                    <span>Published on April 17, 2026</span>
                </div>
            </header>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">

                <section className="space-y-6">
                    <p>
                        Science has always been bottlenecked by human time. PubMed holds more than 38 million papers. ClinicalTrials.gov registers more than 500,000 trials. The combinatorial space of chemistry and biology exceeds what any individual researcher — or any team — can navigate in a lifetime. This has been the quiet ceiling on scientific velocity for decades.
                    </p>
                    <p>
                        Large language models cracked a first layer of that ceiling in 2023. Tools like Consensus, Elicit, and Scite turned static literature into conversational knowledge. Useful, but incremental: they summarized what was already known.
                    </p>
                    <p>
                        What is happening now is different in kind. We are moving from assistive AI that helps humans read faster, to agentic AI that conducts research autonomously — formulating hypotheses, designing experiments, executing code, reading full-text papers through tools, and writing manuscripts. The loop is starting to close.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Signals From the Last Twelve Months</h2>
                    <p>
                        A few facts worth noting:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>FutureHouse, the AI-for-science lab co-founded by Sam Rodriques and Andrew White, launched its public platform on May 1, 2025, with five specialized agents — Crow, Falcon, Owl, Phoenix, and Finch — each built for a distinct stage of the research process. A commercial spinoff, Edison Scientific, followed in November 2025.</li>
                        <li>In May 2025, FutureHouse demonstrated a multi-agent workflow that identified a novel therapeutic candidate for dry age-related macular degeneration — a leading cause of irreversible blindness.</li>
                        <li>Sakana AI's <a href="https://github.com/SakanaAI/AI-Scientist" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>AI Scientist</em></a> autonomously generates research ideas, writes code, runs experiments via agentic tree search, produces full manuscripts, and performs its own peer review. In its template-free mode, the system submitted three papers to an ICLR 2025 workshop — one would have been accepted had it not been withdrawn per protocol. The paper's scientific quality improves predictably with both compute budget and base model capability — the exact scaling dynamic that turns early demos into massively-adopted tools.</li>
                        <li>Argonne, Oak Ridge, and Lawrence Berkeley National Laboratories now operate autonomous, AI-driven materials laboratories.</li>
                    </ul>
                    <p>
                        None of this is finished work. These agents still hallucinate citations and miss methodological subtleties. But machine learning follows a consistent pattern: once a capability starts to work — even poorly — scale and better base models tend to push it past human performance faster than most people expect.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What It Actually Means</h2>
                    <p>
                        The right analogy is not ChatGPT. It is the printing press, or the moment computational simulation entered the physicist's toolkit.
                    </p>
                    <p>
                        Three compounding effects are plausible over the next five years:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-base">
                        <li><strong>Throughput.</strong> Literature review and hypothesis generation collapse from weeks to minutes, letting individual researchers explore ten to fifty times more paths in the same calendar time.</li>
                        <li><strong>Coverage.</strong> Sub-fields too small or too niche to attract sustained human attention become economically searchable.</li>
                        <li><strong>Integration.</strong> Dry-lab and wet-lab loops begin to close, with agents triggering real experiments, reading real results, and updating their own models.</li>
                    </ol>
                    <p>
                        The AI Scientist makes these dynamics tangible. A single run — about fifteen hours and twenty dollars of compute — covers ideation, implementation, experimentation, and write-up. Its template-free mode surfaces research directions a human researcher might never prioritize. And its agentic tree search closes the loop entirely in silico: generating code, executing it, debugging failures, plotting results, and iterating — no human in the loop until the manuscript exists.
                    </p>
                    <p>
                        By 2030, AI agents will run fully autonomous loops of scientific knowledge production — from hypothesis to manuscript — with human or robotic intervention only where real-world experiments require it.
                    </p>
                    <p>
                        The risks are real — AI slop, reproducibility crises, misuse. But the counterfactual is not a pristine slow science; it is the current system, which already produces an overwhelming and partly unreliable literature. Agents that verify, cross-check, and stress-test other agents' output will matter as much as agents that generate.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Why I Am Moving in This Direction</h2>
                    <p>
                        My background is in biosensing, wearable technology, and applied AI. For the past two months, I have been building <a href="https://locuslabhq.com" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">LocusLab</a> — regulatory tooling for biotech submissions, downstream of science, in the compliance layer. It is a real problem worth solving, but it is not where I want to spend the next decade.
                    </p>
                    <p>
                        I want to work on the upstream bottleneck: the rate at which humanity generates validated knowledge. Building agents that accelerate hypothesis generation, experimental design, and scientific verification is the most direct lever I can think of on that goal.
                    </p>
                    <p>
                        This post is a commitment marker. Over the next weeks, I am:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Talking to active researchers — PhDs, postdocs, PIs — about their current workflows with and without AI.</li>
                        <li>Contributing to open-source work in the space, starting with the published systems from FutureHouse and Sakana AI.</li>
                        <li>Prototyping small, opinionated agents in domains I already know — biosensing, regulated biology, and scientific verification.</li>
                    </ul>
                    <p>
                        If you are working on something adjacent, or want to compare notes, I would like to hear from you.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">A Note On The Process</h2>
                    <p>
                        Whenever I catch weak signals that I may be heading in the wrong direction, I have learned (the hard way) not to push through them. I take time to write, to discuss with friends, and to brainstorm with Claude. Putting thoughts on a page forces clarity. Talking to people who know me breaks the echo chamber. Working with an AI that will push back honestly catches the rationalizations I can't catch alone.
                    </p>
                    <p>
                        Things worth doing always take longer than expected. Part of that time is execution; part of it is making sure you are executing on the right thing.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">References</h2>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Lu, C., Lu, C., Lange, R. T., Yamada, Y., Hu, S., Foerster, J., Ha, D. & Clune, J. <em>Towards end-to-end automation of AI research</em>. Nature 651, 914–919 (2026). <a href="https://doi.org/10.1038/s41586-026-10265-5" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">doi:10.1038/s41586-026-10265-5</a></li>
                        <li>Sakana AI. <em>The AI Scientist</em> — open-source code. <a href="https://github.com/SakanaAI/AI-Scientist" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">github.com/SakanaAI/AI-Scientist</a></li>
                        <li>FutureHouse. <em>Launching FutureHouse Platform: Superintelligent AI Agents for Scientific Discovery</em> (May 2025).</li>
                        <li>MIT News. <em>Accelerating scientific discovery with AI</em> (June 2025).</li>
                        <li>Singularity Hub. <em>What the Rise of AI Scientists May Mean for Human Research</em> (February 2026).</li>
                    </ul>
                </section>

            </div>
        </article>
    );
};

export default ScienceIsEnteringItsAgenticEra;