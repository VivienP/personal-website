import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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

const AIForScienceIsBecomingInfrastructure = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="AI for Science Is Moving From Prediction to Closed-Loop Research Systems | Vivien Perrelle"
                description="How does AI-for-science find out it's wrong? A framework mapping research loops by cost and fidelity of feedback, from code-closed to patient-closed systems."
                url="/journal/ai-for-science-is-becoming-a-systems-problem"
                image="/ai-for-science/loops-cover-small.jpg"
                imageWidth={1920}
                imageHeight={1080}
                type="article"
                article={{ publishedTime: '2026-06-01', author: 'Vivien Perrelle', tags: ['AI', 'Scientific Research', 'Drug Discovery', 'Research Automation', 'BioTech', 'Evaluation', 'Google Co-Scientist', 'Isomorphic Labs', 'SoundnessBench'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": "AI for Science Is Moving From Prediction to Closed-Loop Research Systems",
                    "description": "How does AI-for-science find out it's wrong? A framework mapping research loops by cost and fidelity of feedback, from code-closed to patient-closed systems.",
                    "image": "https://vivienperrelle.com/me.png",
                    "datePublished": "2026-06-01",
                    "dateModified": "2026-06-01",
                    "author": AUTHOR,
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "mainEntityOfPage": "https://vivienperrelle.com/journal/ai-for-science-is-becoming-a-systems-problem",
                    "keywords": "AI, Scientific Research, Drug Discovery, Research Automation, BioTech, Evaluation, Google Co-Scientist, Isomorphic Labs, SoundnessBench, AI research agents, autonomous scientific discovery, AI-first drug design, AI Scientist Sakana AI, evaluation bottleneck, Eroom's law, feedback loops, cost fidelity"
                }}
            />
            <Link to="/journal" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Journal</span>
            </Link>

            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Journal Entry</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    AI for Science Is Moving From Prediction to Closed-Loop Research Systems
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    How Does AI-for-Science Find Out It's Wrong?
                </p>
                <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-light">
                    <span>By Vivien Perrelle · June 1, 2026</span>
                </div>
            </header>

            <figure className="mb-16 -mx-6 md:mx-0 overflow-hidden md:rounded-lg border-y md:border border-border-subtle">
                <img
                    src="/ai-for-science/loops-cover-small.jpg"
                    alt="Abstract visualisation of interconnected research loops — glowing rings and particles in motion — representing the feedback cycles at the core of AI-driven scientific discovery."
                    className="w-full h-auto object-cover"
                    loading="eager"
                />
            </figure>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">

                <section className="space-y-6">
                    <p>
                        For decades, pharma got better at generating drug candidates.
                    </p>
                    <p>
                        More targets, more compounds, more screening, more automation, more spend. And yet the number of new drugs approved per inflation-adjusted billion dollars of R&D fell for most of that period. In 2012, Jack Scannell and colleagues named this pattern Eroom's law: Moore's law spelled backwards, because it described the opposite of technological progress.<Cite n={1} />
                    </p>
                    <p>
                        The inputs that scaled were ideas.
                    </p>
                    <p>
                        The thing that did not scale was the loop that turns an idea into validated knowledge.
                    </p>
                    <p>
                        That loop is simple to describe (idea, evidence, experiment, interpretation, decision) and hard to execute. A hypothesis has to be grounded in prior evidence. An experiment has to test the right thing. Results have to be interpreted correctly. A decision has to be made under uncertainty. And in biology, every step can be slow, expensive, noisy, or misleading.
                    </p>
                    <p>
                        This is why the latest AI-for-science wave matters. Not because AI suddenly gives science more ideas: ideas were never the bottleneck. Because software is starting to touch more of the loop itself: generating hypotheses, searching evidence, writing code, running computational experiments, designing proteins, simulating biological systems, supporting decisions.
                    </p>
                    <p>
                        But these loops are not equivalent. The key question is not what a system can generate. It is: how does the system find out that it is wrong?
                    </p>
                    <p>
                        That depends on two variables that are easy to confuse. The cost of feedback is how slow, expensive, or operationally difficult it is to get a correction from reality. The fidelity of feedback is how directly that correction reflects the thing you actually care about. The two do not move together, and that gap is the whole story. Some feedback is fast and cheap but only loosely connected to the real question. Other feedback is slow and costly yet far more faithful. The cheaper and less faithful the loop, the easier it is to scale — and the easier it is to fool yourself.
                    </p>
                    <figure className="my-8 not-prose">
                        <img
                            src="/ai-for-science/illustration-blog-science.jpg"
                            alt="2×2 matrix plotting cost of feedback (cheap to expensive) against fidelity (proxy to faithful): Code sits at cheap + faithful; Literature at cheap + indirect; Simulation at cheap + unfaithful; Wet-lab at costly + decisive; Patients at expensive + faithful."
                            className="h-auto rounded-lg border border-border-subtle mx-auto block max-w-[600px] w-full"
                            loading="lazy"
                        />
                        <figcaption className="mt-3 text-center text-sm text-secondary italic font-light">
                            Cost vs. fidelity of feedback across research loops
                        </figcaption>
                    </figure>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">Code-closed loops: computational research agents</h2>
                    <p>
                        The easiest place to automate science is where the feedback loop is digital.
                    </p>
                    <p>
                        That is why Sakana AI's The AI Scientist<Cite n={4} /><Cite n={5} /> is important. It shows that bounded parts of the computational research workflow can be automated end-to-end:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>ideation;</li>
                        <li>literature search;</li>
                        <li>code writing;</li>
                        <li>experiment execution;</li>
                        <li>result analysis;</li>
                        <li>manuscript drafting;</li>
                        <li>automated review.</li>
                    </ul>
                    <p>
                        This is impressive. But it is also the friendliest version of the problem.
                    </p>
                    <p>
                        Computational research has fast feedback, clear metrics, cheap iteration, and reproducible environments. A model can run code, inspect results, change parameters, and try again.
                    </p>
                    <p>
                        The signal is not perfect. Bad benchmarks, leaky evaluations, weak experimental design, and automated paper generation can still create noise. But when the task is well-specified, the loop can close quickly and cheaply.
                    </p>
                    <p>
                        That is why code-closed research is likely to be one of the first areas where autonomous agents produce visible progress.
                    </p>
                    <p>
                        It is not because computation is "easy."
                    </p>
                    <p>
                        It is because the correction mechanism is close to the model.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">Literature-closed loops: hypothesis generation</h2>
                    <p>
                        Google Co-Scientist<Cite n={2} /><Cite n={3} /> sits one step further away from direct reality.
                    </p>
                    <p>
                        It is not just a chatbot for researchers. It is a multi-agent system built around structured scientific thinking: generate hypotheses, critique them, rank them, evolve them, and refine the best candidates.
                    </p>
                    <figure className="my-8 not-prose">
                        <img
                            src="/ai-for-science/co-scientist.webp"
                            alt="Animation of the Co-Scientist hypothesis selection process: hypotheses are generated, critiqued, ranked, and evolved over successive rounds."
                            className="h-auto rounded-lg border border-border-subtle mx-auto block max-w-[800px] w-full"
                            loading="lazy"
                        />
                        <figcaption className="mt-3 text-center text-sm text-secondary italic font-light">
                            Co-Scientist hypothesis selection process
                        </figcaption>
                    </figure>
                    <p>
                        That matters because part of the hypothesis-generation loop is being formalized as software.
                    </p>
                    <p>
                        The old version of AI for science was answer-oriented: ask a question, get a response. The new version is search-oriented: define a problem, explore the hypothesis space, compare candidates, and propose what might be worth testing.
                    </p>
                    <p>
                        Inherent<Cite n={9} /> belongs in this same category. Its thesis is more ambitious: systems that help scientists find better questions, not just answer known ones. But it is still about search over possible directions of inquiry.
                    </p>
                    <p>
                        This is valuable. But it is not discovery by itself.
                    </p>
                    <p>
                        A hypothesis can be novel, elegant, and plausible while still being wrong. A system that closes mostly against literature can improve the quality of search, but it cannot fully validate the claim.
                    </p>
                    <p>
                        Literature can constrain the hypothesis space.
                    </p>
                    <p>
                        It cannot replace reality.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">Simulation-closed loops: cheap feedback, dangerous fidelity</h2>
                    <p>
                        Simulation is where the framework becomes more subtle.
                    </p>
                    <p>
                        A simulation can look close to software because it is cheap, fast, and computational. But epistemically, it may be far from the biological reality it is supposed to predict.
                    </p>
                    <p>
                        That is the trap.
                    </p>
                    <p>
                        Cheap feedback is not the same as faithful feedback.
                    </p>
                    <p>
                        CellType<Cite n={11} /> points toward biological foundation models that simulate human biology and help prioritize what to test before expensive experimental or clinical steps. BioStack<Cite n={12} /> points toward post-training environments built from realistic healthcare and drug discovery workflows. Insilico Medicine's longevity foundation model collaboration<Cite n={13} /> points in a similar direction: foundation models moving into aging biology, disease-risk prediction, multimodal clinical data, and preventive medicine.
                    </p>
                    <p>
                        This category is important because better environments can move useful feedback earlier in the research process.
                    </p>
                    <p>
                        But it should not be romanticized.
                    </p>
                    <p>
                        A simulation is useful only if it preserves the causal structure that matters when you intervene. Otherwise, it does not reduce risk. It creates false confidence.
                    </p>
                    <p>
                        In software, a sandbox can be close to the real environment. In biology, the sandbox is usually a proxy. Sometimes a useful proxy. Sometimes a dangerous one.
                    </p>
                    <p>
                        That is why simulation is not simply "between code and biology." It is a separate case: cheap like software, but potentially unfaithful like a weak biological proxy.
                    </p>
                    <p>
                        The strongest AI-for-science systems will not only generate candidates. They will estimate how much trust to place in each environment.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">Protein- and molecule-closed loops: biological design</h2>
                    <p>
                        The next step is where AI moves from predicting biology to designing biological objects.
                    </p>
                    <p>
                        Biohub<Cite n={6} /> is one signal. Its ESM release is positioned as a world model of protein biology: not only a system to predict structures, but a substrate to map, search, and design inside the protein universe.
                    </p>
                    <p>
                        But the broader point is not proteins alone.
                    </p>
                    <p>
                        The same pattern appears in enzyme design, binder design, molecular generation, and lab-in-the-loop drug discovery. AI systems propose candidates, rank them, and decide what should move into experimental validation.
                    </p>
                    <p>
                        This is where the loop starts to become slower and more expensive, but also more meaningful.
                    </p>
                    <p>
                        A generated protein or molecule is not validated because it looks good in latent space. It is validated when it works under biological constraints: binding, stability, expression, specificity, manufacturability, toxicity, and eventually clinical relevance.
                    </p>
                    <p>
                        That is why the term design-make-test matters.
                    </p>
                    <p>
                        Genesis Molecular AI and Incyte<Cite n={8} /> show what this looks like inside pharma: proprietary experimental data feeding foundation models across multiple drug targets, inside a design-make-test loop.
                    </p>
                    <p>
                        Isomorphic Labs<Cite n={7} /> represents the therapeutic execution version of the same shift. Its $2.1B Series B is not just a funding event. It is a signal that AI-first drug design is moving from research story to capital-intensive industrial strategy.
                    </p>
                    <p>
                        The value of AI drug discovery will not be proven by model performance alone.
                    </p>
                    <p>
                        It will be proven by whether AI changes the probability, speed, or cost of producing clinically meaningful assets.
                    </p>
                    <p>
                        Drug discovery is not a Kaggle competition.
                    </p>
                    <p>
                        The model output is not the product. The molecule is not even fully the product. The product is a validated therapeutic program that survives biology, safety, manufacturing, regulation, and clinical translation.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">Patient-, regulator-, and market-closed loops: therapeutic reality</h2>
                    <p>
                        The final validation loop is not computational.
                    </p>
                    <p>
                        It is clinical, regulatory, and commercial.
                    </p>
                    <p>
                        This is the part of AI-for-science that funding announcements can obscure. A model can improve molecule design, reduce experimental waste, or prioritize better candidates. But the system is not truly validated until the program survives the realities it claims to improve: animal studies, human trials, safety constraints, manufacturing, regulatory review, reimbursement, and market adoption.
                    </p>
                    <p>
                        This is why AI-first therapeutic companies are so capital-intensive.
                    </p>
                    <p>
                        The closer the loop gets to patients, the more expensive the feedback becomes. But the signal also becomes harder to fake.
                    </p>
                    <p>
                        A clinical endpoint is slow, noisy, and expensive. But it is not a proxy in the same way a simulation is.
                    </p>
                    <p>
                        That is why the category is so hard. And why it is so valuable.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">Workflow-closed loops: pharma decision intelligence</h2>
                    <p>
                        Not every valuable AI system in science will generate hypotheses, molecules, or experiments.
                    </p>
                    <p>
                        Some will connect the decision workflow around them.
                    </p>
                    <p>
                        Perceptic<Cite n={10} /> is best understood this way. Not "AI that discovers the drug," but AI that connects the messy reality around drug development: asset scouting, indication selection, clinical data analysis, scientific evaluation, decision context, and organizational memory.
                    </p>
                    <p>
                        This may sound less glamorous than molecule generation. It may be more immediately useful.
                    </p>
                    <p>
                        Pharma R&D is not just bottlenecked by scientific imagination. It is bottlenecked by fragmentation:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>data lives in different systems;</li>
                        <li>teams work in silos;</li>
                        <li>evidence is scattered across papers, dashboards, trial records, internal reports, and expert judgment;</li>
                        <li>major decisions are often made by stitching together incomplete context.</li>
                    </ul>
                    <p>
                        This is not a scientific discovery loop in the narrow sense. It is an organizational decision loop.
                    </p>
                    <p>
                        That distinction matters.
                    </p>
                    <p>
                        In pharma, the feedback does not close only against biology. It also closes against portfolio strategy, clinical operations, regulatory constraints, partner diligence, and market timing.
                    </p>
                    <p>
                        A pharma operating system is a bet that the next productivity gain comes from connecting the workflow, not only improving a model.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">Cross-cutting constraint: evaluation</h2>
                    <p>
                        Evaluation is not a layer.
                    </p>
                    <p>
                        It cuts across every loop.
                    </p>
                    <p>
                        If AI systems generate more hypotheses, we need to know which ones are sound. If they write more papers, we need to know <Link to="/projects/scientific-claim-verifier" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">which claims are supported</Link>. If they design more proteins, we need to know whether the design works outside the benchmark. If they run more computational experiments, we need to know whether the setup was meaningful. If they summarize more evidence, we need to know what was missed, distorted, or overclaimed.
                    </p>
                    <p>
                        This is why SoundnessBench<Cite n={15} /> matters.
                    </p>
                    <p>
                        It asks a simple but critical question: can AI judge whether a research proposal is scientifically sound?
                    </p>
                    <p>
                        The answer is not yet comforting. Current models can look convincing while missing methodological weaknesses. They can reward plausible ideas. They can display optimism bias. They can scale the appearance of rigor without necessarily scaling rigor itself.
                    </p>
                    <p>
                        RefusalBench<Cite n={14} /> matters from another angle.
                    </p>
                    <p>
                        As AI systems become orchestration layers for biology, they need to know when to help, when to refuse, and when a legitimate research request is being blocked by a crude safety policy. The failure modes are symmetric:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>too permissive, and we scale dual-use risk;</li>
                        <li>too restrictive, and we block legitimate research;</li>
                        <li>too shallow, and we optimize for compliance theater rather than scientific judgment.</li>
                    </ul>
                    <p>
                        This is the core risk of AI for science.
                    </p>
                    <p>
                        Not that it produces nonsense. That would be easy to reject.
                    </p>
                    <p>
                        The risk is that it produces work that looks scientific enough to pass quickly through overloaded human systems.<Cite n={16} />
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">The emerging map</h2>
                    <p>
                        The sector is not converging around one "AI scientist."
                    </p>
                    <p>
                        It is decomposing the research loop into different kinds of systems, defined by the cost and fidelity of their feedback:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>code-closed systems for computational experimentation;</li>
                        <li>literature-closed systems for hypothesis generation;</li>
                        <li>simulation-closed systems for cheap but potentially low-fidelity prioritization;</li>
                        <li>protein- and molecule-closed systems for biological design;</li>
                        <li>patient-, regulator-, and market-closed systems for therapeutic reality;</li>
                        <li>workflow-closed systems for pharma decision intelligence;</li>
                        <li>cross-cutting evaluation systems for trust, safety, and scientific rigor.</li>
                    </ul>
                    <p>
                        This is not one market. It is the decomposition of the scientific process into software-addressable loops.
                    </p>
                    <p>
                        The hard question is no longer whether AI can generate scientific work. It is where the loop closes, and how much we should trust the feedback: against code, literature, simulations, proteins, cells, animals, patients, regulators, and markets.
                    </p>
                    <p>
                        Cost and fidelity do not move together.
                    </p>
                    <p>
                        That is the whole point.
                    </p>
                    <p>
                        Some loops are cheap and reliable. Some are cheap and misleading. Some are expensive but decisive. Some are expensive and still noisy.
                    </p>
                    <p>
                        The winners will not be the systems that generate the most ideas. They will be the systems that improve the rate at which good ideas become validated knowledge.
                    </p>
                    <p>
                        That is the real promise of AI for science.
                    </p>
                    <p>
                        Not infinite generation.
                    </p>
                    <p>
                        Better scientific judgment at scale.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-light">
                        <li id="ref-1" className="scroll-mt-24">Scannell, J. W. et al. <a href="https://www.nature.com/articles/nrd3681" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Diagnosing the decline in pharmaceutical R&D efficiency."</a> <em>Nature Reviews Drug Discovery</em>, March 2012.</li>
                        <li id="ref-2" className="scroll-mt-24">Gottweis, J. et al. <a href="https://www.nature.com/articles/s41586-026-10644-y" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Accelerating scientific discovery with Co-Scientist."</a> <em>Nature</em>, May 2026.</li>
                        <li id="ref-3" className="scroll-mt-24">Google DeepMind. <a href="https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Co-Scientist: A multi-agent AI partner to accelerate research."</a> May 2026.</li>
                        <li id="ref-4" className="scroll-mt-24">Lu, C. et al. <a href="https://doi.org/10.1038/s41586-026-10265-5" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Towards end-to-end automation of AI research."</a> <em>Nature</em>, March 2026.</li>
                        <li id="ref-5" className="scroll-mt-24">Sakana AI. <a href="https://sakana.ai/ai-scientist-nature/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"The AI Scientist: Towards Fully Automated AI Research."</a> 2026.</li>
                        <li id="ref-6" className="scroll-mt-24">Biohub. <a href="https://biohub.org/news/world-model-of-protein-biology/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Biohub releases a world model of protein biology."</a> May 2026.</li>
                        <li id="ref-7" className="scroll-mt-24">Isomorphic Labs. <a href="https://www.isomorphiclabs.com/articles/isomorphic-labs-announces-series-b-investment-round" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Isomorphic Labs announces $2.1B Series B investment round."</a> May 2026.</li>
                        <li id="ref-8" className="scroll-mt-24">Incyte and Genesis Molecular AI. <a href="https://investor.incyte.com/news-releases/news-release-details/incyte-and-genesis-expand-molecular-ai-collaboration-accelerate" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Incyte and Genesis expand molecular AI collaboration to accelerate drug discovery."</a> May 2026.</li>
                        <li id="ref-9" className="scroll-mt-24">Index Ventures. <a href="https://www.indexventures.com/perspectives/inherent-designing-for-discovery/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Inherent: Designing for Discovery."</a> May 2026.</li>
                        <li id="ref-10" className="scroll-mt-24">Air Street Capital. <a href="https://press.airstreet.com/p/introducing-perceptic" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Introducing Perceptic."</a> May 2026.</li>
                        <li id="ref-11" className="scroll-mt-24">Y Combinator. <a href="https://www.ycombinator.com/companies/celltype" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"CellType: The agentic drug company."</a> February 2026.</li>
                        <li id="ref-12" className="scroll-mt-24">Y Combinator. <a href="https://www.ycombinator.com/companies/biostack-platforms" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"BioStack Platforms."</a> May 2026.</li>
                        <li id="ref-13" className="scroll-mt-24">Insilico Medicine and Human Longevity. <a href="https://www.prnewswire.com/news-releases/insilico-medicine-and-human-longevity-announce-collaboration-to-co-develop-industry-first-ai-foundation-model-for-longevity-science-302781904.html" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Collaboration to co-develop a foundation model for longevity science."</a> May 2026.</li>
                        <li id="ref-14" className="scroll-mt-24">Weidener, L. et al. <a href="https://arxiv.org/abs/2605.21545" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"RefusalBench: Why Refusal Rate Misranks Frontier LLMs on Biological Research Prompts."</a> <em>arXiv</em>, May 2026.</li>
                        <li id="ref-15" className="scroll-mt-24">Ho, S.-T. et al. <a href="https://arxiv.org/abs/2605.30329" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"SoundnessBench: Can Your AI Scientist Really Tell Good Research Ideas from Bad Ones?"</a> <em>arXiv</em>, May 2026.</li>
                        <li id="ref-16" className="scroll-mt-24">Nature. <a href="https://www.nature.com/articles/d41586-026-01551-3" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">"Why AI cannot do good science without humans."</a> Editorial, <em>Nature</em>, May 2026.</li>
                    </ol>
                </section>

            </div>

            <AuthorBio readNext={[
                { to: '/journal/science-is-entering-its-agentic-era', label: 'Science Is Entering Its Agentic Era' },
                { to: '/journal/regulators-dont-accept-vibes', label: "Regulators Don't Accept Vibes: The Two Layers Pharma AI Is Missing" },
                { to: '/projects/scientific-claim-verifier', label: 'Scientific Claim Verifier — open-source claim-to-source verification (F1 0.92 on SciFact)' },
            ]} />
        </article>
    );
};

export default AIForScienceIsBecomingInfrastructure;
