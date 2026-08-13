import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { AUTHOR } from '../components/jsonld';
import AuthorBio from '../components/AuthorBio';

const Cite = ({ n }) => (
    <sup>
        <a
            href={`#ref-${n}`}
            className="text-accent no-underline hover:underline font-mono text-xs align-super"
            aria-label={`Jump to reference ${n}`}
        >
            [{n}]
        </a>
    </sup>
);

const ScienceIsEnteringItsAgenticEra = () => {
    return (
        <ArticleLayout backTo="/journal" backLabel="Journal">
            <SEO
                title="Science Is Entering Its Agentic Era | Vivien Perrelle"
                description="Exploring how agentic AI is transforming scientific research, from literature review to autonomous hypothesis generation and experimental design."
                url="/journal/science-is-entering-its-agentic-era"
                type="article"
                article={{ publishedTime: '2026-04-17', author: 'Vivien Perrelle', tags: ['AI', 'Agentic AI', 'Scientific Research', 'Research Automation', 'BioTech'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": "Science Is Entering Its Agentic Era",
                    "description": "Exploring how agentic AI is transforming scientific research, from literature review to autonomous hypothesis generation and experimental design.",
                    "image": "https://vivienperrelle.com/me.png",
                    "datePublished": "2026-04-17",
                    "dateModified": "2026-04-17",
                    "author": AUTHOR,
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "mainEntityOfPage": "https://vivienperrelle.com/journal/science-is-entering-its-agentic-era",
                    "keywords": "AI, Agentic AI, Scientific Research, Research Automation, BioTech"
                }}
            />
            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Journal Entry</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Science Is Entering Its Agentic Era
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    How agentic AI is transforming scientific research from assistive tools to autonomous discovery systems.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-light">
                    <span>By Vivien Perrelle · April 17, 2026</span>
                </div>
            </header>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">

                <section className="space-y-6">
                    <p>
                        Science has always been bottlenecked by human time. PubMed holds more than 38 million papers. ClinicalTrials.gov registers more than 500,000 trials. The combinatorial space of chemistry and biology exceeds what any individual researcher, or any team, can navigate in a lifetime. This has been the quiet ceiling on scientific velocity for decades.
                    </p>
                    <p>
                        Large language models cracked a first layer of that ceiling in 2023. Tools like Consensus, Elicit, and Scite turned static literature into conversational knowledge. Useful, but incremental: they summarized what was already known.
                    </p>
                    <p>
                        What is happening now is different in kind. We are moving from assistive AI that helps humans read faster, to agentic AI that conducts research autonomously: formulating hypotheses, designing experiments, executing code, reading full-text papers through tools, and writing manuscripts. The loop is starting to close.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Signals From the Last Twelve Months</h2>
                    <p>
                        A few facts worth noting:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>FutureHouse, the AI-for-science lab co-founded by Sam Rodriques and Andrew White, launched its public platform on May 1, 2025, with five specialized agents (Crow, Falcon, Owl, Phoenix, and Finch), each built for a distinct stage of the research process.<Cite n={1} /> A commercial spinoff, Edison Scientific, followed in November 2025.<Cite n={2} /></li>
                        <li>In May 2025, FutureHouse demonstrated a multi-agent workflow that identified a novel therapeutic candidate for dry age-related macular degeneration, a leading cause of irreversible blindness.<Cite n={3} /></li>
                        <li>Sakana AI's <a href="https://github.com/SakanaAI/AI-Scientist" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>AI Scientist</em></a> autonomously generates research ideas, writes code, runs experiments via agentic tree search, produces full manuscripts, and performs its own peer review.<Cite n={4} /> In its template-free mode, the system submitted three papers to an ICLR 2025 workshop. One would have been accepted had it not been withdrawn per protocol.<Cite n={5} /> The paper's scientific quality improves predictably with both compute budget and base model capability: the exact scaling dynamic that turns early demos into massively-adopted tools.<Cite n={4} /></li>
                        <li>Argonne,<Cite n={6} /> Oak Ridge,<Cite n={7} /> and Lawrence Berkeley<Cite n={8} /> National Laboratories now operate autonomous, AI-driven materials laboratories.</li>
                    </ul>
                    <p>
                        None of this is finished work. These agents still hallucinate citations and miss methodological subtleties. But machine learning follows a consistent pattern: once a capability starts to work (even poorly), scale and better base models tend to push it past human performance faster than most people expect.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">What It Actually Means</h2>
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
                        The AI Scientist makes these dynamics tangible.<Cite n={4} /> A single run (about fifteen hours and twenty dollars of compute) covers ideation, implementation, experimentation, and write-up. Its template-free mode surfaces research directions a human researcher might never prioritize. And its agentic tree search closes the loop entirely in silico: generating code, executing it, debugging failures, plotting results, and iterating — no human in the loop until the manuscript exists.
                    </p>
                    <p>
                        By 2030, AI agents will run fully autonomous loops of scientific knowledge production, from hypothesis to manuscript, with human or robotic intervention only where real-world experiments require it.
                    </p>
                    <p>
                        The risks are real: AI slop, reproducibility crises, misuse. But the counterfactual is not a pristine slow science; it is the current system, which already produces an overwhelming and partly unreliable literature. Agents that verify, cross-check, and stress-test other agents' output will matter as much as agents that generate.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Why I Am Moving in This Direction</h2>
                    <p>
                        My background is biosensing, wearable technology, and applied AI. For the past two months I have been building <a href="https://locuslabhq.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">LocusLab</a>, regulatory verification tooling for BioTech submissions. Useful work, but downstream of the actual bottleneck.
                    </p>
                    <p>
                        The bottleneck is the rate at which humanity produces validated knowledge. Agents that generate hypotheses, run experiments, and verify scientific claims act directly on that rate. Nothing else I could build moves the needle as much.
                    </p>
                    <p>
                        So that is what I am building.
                    </p>
                    <p>
                        Over the coming weeks:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Talking to active researchers (PhDs, postdocs, PIs) about where their workflows break with and without AI.</li>
                        <li>Contributing to the open systems shipping in this space, starting with FutureHouse and Sakana AI.</li>
                        <li>Shipping small, opinionated agents in domains I already know: biosensing, regulated biology, and scientific verification.</li>
                    </ul>
                    <p>
                        The first is already live: an <a href="https://github.com/VivienP/scientific-claim-verification-engine" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">open-source scientific claim verifier</a> that beats naive Claude by 30 F1 points on SciFact (<Link to="/projects/scientific-claim-verifier" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">read the project write-up</Link>). More coming.
                    </p>
                    <p>
                        If you are working on something adjacent, I want to hear from you.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">A Note On The Process</h2>
                    <p>
                        Whenever I catch weak signals that I may be heading in the wrong direction, I have learned (the hard way) not to push through them. I take time to write, to discuss with friends, and to brainstorm with Claude. Putting thoughts on a page forces clarity. Talking to people who know me breaks the echo chamber. Working with an AI that will push back honestly catches the rationalizations I can't catch alone.
                    </p>
                    <p>
                        Things worth doing always take longer than expected. Part of that time is execution; part of it is making sure you are executing on the right thing.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-light">
                        <li id="ref-1" className="scroll-mt-24">FutureHouse. <em>Launching FutureHouse Platform: Superintelligent AI Agents for Scientific Discovery</em> (1 May 2025). <a href="https://www.futurehouse.org/research-announcements/launching-futurehouse-platform-ai-agents" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">futurehouse.org/research-announcements/launching-futurehouse-platform-ai-agents</a></li>
                        <li id="ref-2" className="scroll-mt-24">Edison Scientific. <em>Kosmos: the AI Scientist for R&amp;D teams</em> — company site of the FutureHouse spinout. <a href="https://www.edisonscientific.com/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">edisonscientific.com</a></li>
                        <li id="ref-3" className="scroll-mt-24">Ghareeb, A. E., Chang, B., Mitchener, L., Yiu, A., Szostkiewicz, C. J., Laurent, J. M., Razzak, M. T., White, A. D., Hinks, M. M. &amp; Rodriques, S. G. <em>Robin: A multi-agent system for automating scientific discovery</em>. arXiv:2505.13400 (19 May 2025). <a href="https://arxiv.org/abs/2505.13400" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">arxiv.org/abs/2505.13400</a></li>
                        <li id="ref-4" className="scroll-mt-24">Lu, C., Lu, C., Lange, R. T., Yamada, Y., Hu, S., Foerster, J., Ha, D. &amp; Clune, J. <em>Towards end-to-end automation of AI research</em>. Nature 651, 914–919 (2026). <a href="https://doi.org/10.1038/s41586-026-10265-5" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">doi:10.1038/s41586-026-10265-5</a></li>
                        <li id="ref-5" className="scroll-mt-24">Sakana AI. <em>The AI Scientist Generates its First Peer-Reviewed Scientific Publication</em> (March 2025). <a href="https://sakana.ai/ai-scientist-first-publication/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">sakana.ai/ai-scientist-first-publication</a></li>
                        <li id="ref-6" className="scroll-mt-24">Argonne National Laboratory. <em>Autonomous Discovery</em> — self-driving laboratories programme. <a href="https://www.anl.gov/autonomous-discovery" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">anl.gov/autonomous-discovery</a></li>
                        <li id="ref-7" className="scroll-mt-24">Oak Ridge National Laboratory. <em>Autonomous Science</em>. <a href="https://www.ornl.gov/autonomousscience" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">ornl.gov/autonomousscience</a></li>
                        <li id="ref-8" className="scroll-mt-24">Szymanski, N. J. et al. <em>An autonomous laboratory for the accelerated synthesis of inorganic materials</em>. Nature 624, 86–91 (2023). Berkeley Lab A-Lab. <a href="https://doi.org/10.1038/s41586-023-06734-w" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words">doi:10.1038/s41586-023-06734-w</a></li>
                    </ol>
                </section>

            </div>

            <AuthorBio readNext={[
                { to: '/journal/ai-for-science-is-becoming-a-systems-problem', label: 'AI for Science Is Moving From Prediction to Closed-Loop Research Systems' },
                { to: '/journal/regulators-dont-accept-vibes', label: "Regulators Don't Accept Vibes: The Two Layers Pharma AI Is Missing" },
                { to: '/projects/scientific-claim-verifier', label: 'Scientific Claim Verifier — open-source claim-to-source verification (F1 0.92 on SciFact)' },
            ]} />
        </ArticleLayout>
    );
};

export default ScienceIsEnteringItsAgenticEra;
