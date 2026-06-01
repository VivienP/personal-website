import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

// Inline citation marker, e.g. [1], linking to the matching reference in the list below.
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
                title="AI for Science Is Becoming Infrastructure | Vivien Perrelle"
                description="AI for science is moving from tools to systems — hypothesis engines, research agents, AI-first drug design, pharma operating systems, biological world models. The real bottleneck is evaluation."
                url="/blog/ai-for-science-is-becoming-infrastructure"
                image="/ai-for-science/cover.jpg"
                type="article"
                article={{ publishedTime: '2026-06-01', author: 'Vivien Perrelle', tags: ['AI', 'Scientific Research', 'Drug Discovery', 'Research Automation', 'Biotech', 'Evaluation'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "TechArticle",
                    "headline": "AI for Science Is Becoming Infrastructure",
                    "datePublished": "2026-06-01",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "mainEntityOfPage": "https://vivienperrelle.com/blog/ai-for-science-is-becoming-infrastructure",
                    "keywords": "AI, Scientific Research, Drug Discovery, Research Automation, Biotech, Evaluation"
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
                    AI for Science Is Becoming Infrastructure
                </h1>
                <p className="text-xl text-secondary font-light max-w-2xl">
                    The shift from scientific tools to scientific systems — and why evaluation, not generation, is the real bottleneck.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-light">
                    <span>Published on June 1, 2026</span>
                </div>
            </header>

            <figure className="mb-16 -mx-6 md:mx-0 overflow-hidden md:rounded-lg border-y md:border border-border-subtle">
                <img
                    src="/ai-for-science/cover.jpg"
                    alt="Layers of a luminous glass stack rising above an open book — from the periodic table at the base through molecules, proteins, and networks — representing the emerging stack of AI for science."
                    className="w-full h-auto object-cover"
                    loading="eager"
                />
            </figure>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">

                <section className="space-y-6">
                    <p>
                        A few years ago, "AI for science" mostly meant prediction:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Predict the structure of a protein.</li>
                        <li>Screen a molecule.</li>
                        <li>Search the literature faster.</li>
                        <li>Summarize a paper.</li>
                    </ul>
                    <p>
                        That era is not over.
                    </p>
                    <p>
                        But it is becoming one layer in a much bigger stack.
                    </p>
                    <p>
                        The latest wave of announcements around Google Co-Scientist, Isomorphic Labs, Inherent, Perceptic, CellType, BioStack, and autonomous research agents points to a deeper shift:
                    </p>
                    <p>
                        AI is moving from scientific tools to scientific systems.
                    </p>
                    <p>
                        Not just models that answer questions.
                    </p>
                    <p>
                        Systems that generate hypotheses, run computational experiments, simulate biology, structure evidence, and help decide what deserves scarce experimental resources.
                    </p>
                    <p>
                        That distinction matters.
                    </p>
                    <p>
                        Because science does not fail only because we lack ideas.
                    </p>
                    <p>
                        Science fails because the loop between idea, evidence, experiment, interpretation, and decision is slow, fragmented, and hard to trust.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The first layer: hypothesis engines</h2>
                    <p>
                        Google's Co-Scientist<Cite n={1} /> is probably the cleanest signal.
                    </p>
                    <p>
                        It is not just a chatbot for researchers. It is a multi-agent system built around the structure of scientific thinking: generate hypotheses, critique them, rank them, evolve them, and refine the best candidates.
                    </p>
                    <figure className="my-8 not-prose">
                        <img
                            src="/co-scientist.gif"
                            alt="Animation of the Co-scientist hypothesis selection process: hypotheses are generated, critiqued, ranked, and evolved over successive rounds."
                            className="w-full h-auto rounded-lg border border-border-subtle"
                            loading="lazy"
                        />
                        <figcaption className="mt-3 text-center text-sm text-secondary italic font-light">
                            Co-scientist hypothesis selection process
                        </figcaption>
                    </figure>
                    <p>
                        That is important.
                    </p>
                    <p>
                        For the first time, part of the hypothesis-generation loop is being formalized as software.
                    </p>
                    <p>
                        The old version of AI for science was mostly answer-oriented: ask a question, get a response.
                    </p>
                    <p>
                        The new version is search-oriented: define a scientific problem, explore the hypothesis space, compare candidates, and propose what might be worth testing.
                    </p>
                    <p>
                        But this is also where the hype needs to be contained.
                    </p>
                    <p>
                        A hypothesis is not valuable because it is novel.
                    </p>
                    <p>
                        It is valuable if it is testable, grounded, and eventually useful.
                    </p>
                    <p>
                        AI can expand the search space almost infinitely. That is powerful. It is also dangerous.
                    </p>
                    <p>
                        More hypotheses can mean faster discovery.
                    </p>
                    <p>
                        It can also mean more noise.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The second layer: computational research agents</h2>
                    <p>
                        The next layer is not biology-first.
                    </p>
                    <p>
                        It is computation-first.
                    </p>
                    <p>
                        Systems like The AI Scientist<Cite n={3} /> and newer autonomous research agents show that parts of the scientific workflow can now be automated end-to-end: ideation, literature search, code writing<Cite n={2} />, experiment execution, result analysis, manuscript drafting, and even automated review.
                    </p>
                    <p>
                        This is impressive.
                    </p>
                    <p>
                        But it is also easier than wet-lab science.
                    </p>
                    <p>
                        Computational research has fast feedback. Clear metrics. Cheap iteration. Reproducible environments. A model can run code, inspect results, change parameters, and try again.
                    </p>
                    <p>
                        Biology is different.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Cells do not care about your benchmark.</li>
                        <li>Patients do not return clean error messages.</li>
                        <li>Experiments are expensive, slow, and full of hidden variables.</li>
                    </ul>
                    <p>
                        So the right conclusion is not: AI is now an autonomous scientist.
                    </p>
                    <p>
                        The right conclusion is: AI is beginning to automate bounded research loops, especially where the feedback is digital.
                    </p>
                    <p>
                        That is still a big deal.
                    </p>
                    <p>
                        But it is not the same thing as replacing scientific judgment.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The third layer: AI-first drug design</h2>
                    <p>
                        Isomorphic Labs represents another layer: therapeutic execution.
                    </p>
                    <p>
                        Its latest $2.1B Series B<Cite n={4} /> is not just another funding round. It is a signal that AI-first drug design is moving from research story to capital-intensive industrial strategy.
                    </p>
                    <p>
                        But here again, precision matters.
                    </p>
                    <p>
                        The value of Isomorphic will not be proven by model performance alone.
                    </p>
                    <p>
                        It will be proven by whether its systems can change the probability, speed, or cost of producing real therapeutic assets.
                    </p>
                    <p>
                        Drug discovery is not a Kaggle competition.
                    </p>
                    <p>
                        The model output is not the product. The molecule is not even fully the product. The product is a validated therapeutic program that survives biology, safety, manufacturing, regulation, and clinical translation.
                    </p>
                    <p>
                        This is why the category is so hard.
                    </p>
                    <p>
                        And why it is so valuable.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The fourth layer: open-ended discovery</h2>
                    <p>
                        Inherent<Cite n={5} /> is interesting for a different reason.
                    </p>
                    <p>
                        Most AI systems today are built to answer questions. Inherent is betting on systems that help find better questions.
                    </p>
                    <p>
                        That sounds abstract.
                    </p>
                    <p>
                        But it touches one of the deepest problems in science.
                    </p>
                    <p>
                        A lot of scientific progress does not come from answering the obvious question faster. It comes from reframing the problem.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>What should we investigate?</li>
                        <li>Which anomaly matters?</li>
                        <li>Which experiment would actually change our belief?</li>
                        <li>Which field is stuck because everyone is optimizing the wrong objective?</li>
                    </ul>
                    <p>
                        If AI can help with that, the opportunity is enormous.
                    </p>
                    <p>
                        But the evaluation problem is brutal.
                    </p>
                    <p>
                        How do you benchmark a system that is supposed to discover questions no one thought to ask?
                    </p>
                    <p>
                        You can measure answer accuracy.
                    </p>
                    <p>
                        Measuring scientific taste is much harder.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The fifth layer: the pharma operating system</h2>
                    <p>
                        Perceptic<Cite n={6} /> points to a more operational layer.
                    </p>
                    <p>
                        Not "AI that discovers the drug."
                    </p>
                    <p>
                        AI that connects the messy reality around drug development.
                    </p>
                    <p>
                        Asset scouting. Indication selection. Clinical data analysis. Scientific evaluation. Decision context. Organizational memory.
                    </p>
                    <p>
                        This may sound less glamorous than molecule generation.
                    </p>
                    <p>
                        It might be more immediately useful.
                    </p>
                    <p>
                        Pharma R&D is not just bottlenecked by scientific imagination. It is bottlenecked by fragmentation.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Data lives in different systems.</li>
                        <li>Teams work in silos.</li>
                        <li>Evidence is scattered across papers, dashboards, trial records, internal reports, and expert judgment.</li>
                        <li>Billion-dollar decisions are often made by stitching together incomplete context.</li>
                    </ul>
                    <p>
                        An AI operating system for biopharma is a bet that the next productivity gain comes from connecting the workflow, not only improving a model.
                    </p>
                    <p>
                        That is a very credible bet.
                    </p>
                    <p>
                        Because in regulated, high-stakes industries, the bottleneck is rarely just "generate more."
                    </p>
                    <p>
                        It is: make better decisions with incomplete evidence.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The sixth layer: biological world models and training environments</h2>
                    <p>
                        CellType<Cite n={7} /> and BioStack<Cite n={8} /> point to another part of the stack: environments.
                    </p>
                    <p>
                        CellType's thesis is that foundation models can simulate human biology and help prioritize what to test before moving into expensive experimental or clinical steps.
                    </p>
                    <p>
                        BioStack's thesis is that healthcare and drug discovery AI need realistic training environments built from clinical and preclinical workflows.
                    </p>
                    <p>
                        Both are early signals of the same thing.
                    </p>
                    <p>
                        AI for biology will not be solved by models alone.
                    </p>
                    <p>
                        It needs environments.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Better biological data.</li>
                        <li>Better clinical data.</li>
                        <li>Better simulation loops.</li>
                        <li>Better benchmarks.</li>
                        <li>Better reward functions.</li>
                        <li>Better links between prediction and outcome.</li>
                    </ul>
                    <p>
                        This is where the analogy with software starts to break.
                    </p>
                    <p>
                        In software, you can build a sandbox.
                    </p>
                    <p>
                        In biology, the sandbox is often a weak proxy for reality.
                    </p>
                    <p>
                        A biological world model is only useful if it preserves the causal structure that matters when you intervene.
                    </p>
                    <p>
                        Otherwise, it does not reduce risk.
                    </p>
                    <p>
                        It creates false confidence.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The real bottleneck: evaluation</h2>
                    <p>
                        This is the uncomfortable part.
                    </p>
                    <p>
                        The more AI generates, the more evaluation matters.
                    </p>
                    <p>
                        If AI systems generate more hypotheses, we need to know which ones are sound.
                    </p>
                    <p>
                        If they write more papers, we need to know which claims are supported.
                    </p>
                    <p>
                        If they run more computational experiments, we need to know whether the setup was meaningful.
                    </p>
                    <p>
                        If they summarize more evidence, we need to know what was missed, distorted, or overclaimed.
                    </p>
                    <p>
                        This is why recent work like SoundnessBench<Cite n={9} /> matters.
                    </p>
                    <p>
                        It asks a simple but critical question: can AI judge whether a research proposal is scientifically sound?
                    </p>
                    <p>
                        The answer is not yet comforting.
                    </p>
                    <p>
                        Current models can look convincing while missing methodological weaknesses. They can reward plausible ideas. They can display optimism bias. They can scale the appearance of rigor without necessarily scaling rigor itself.
                    </p>
                    <p>
                        That is the core risk of AI for science.
                    </p>
                    <p>
                        Not that it produces nonsense.
                    </p>
                    <p>
                        That would be easy to reject.
                    </p>
                    <p>
                        The risk is that it produces work that looks scientific enough to pass quickly through overloaded human systems.<Cite n={10} />
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The emerging stack</h2>
                    <p>
                        The sector is becoming clearer.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Hypothesis engines.</li>
                        <li>Computational research agents.</li>
                        <li>AI-first therapeutic platforms.</li>
                        <li>Open-ended discovery labs.</li>
                        <li>Pharma operating systems.</li>
                        <li>Biological world models.</li>
                        <li>Training environments.</li>
                        <li>Evaluation and verification layers.</li>
                    </ul>
                    <p>
                        This is not one market.
                    </p>
                    <p>
                        It is the decomposition of the scientific process into software-addressable layers.
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-base marker:text-secondary">
                        <li>Some layers will produce spectacular demos.</li>
                        <li>Some will produce real drugs.</li>
                        <li>Some will quietly become infrastructure.</li>
                        <li>Some will fail because they confuse fluency with truth.</li>
                    </ul>
                    <p>
                        The winners will not simply be the systems that generate the most ideas.
                    </p>
                    <p>
                        They will be the systems that improve the rate at which good ideas become validated knowledge.
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
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li id="ref-1" className="scroll-mt-24">Google Research — <a href="https://research.google/blog/accelerating-scientific-breakthroughs-with-an-ai-co-scientist/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>Accelerating scientific breakthroughs with an AI co-scientist</em></a> — a Gemini-based multi-agent system that generates, debates, and evolves hypotheses (Feb 2025).</li>
                        <li id="ref-2" className="scroll-mt-24">Google Research — <a href="https://research.google/blog/empirical-research-assistance-era-from-nature-publication-to-catalyzing-computational-discovery/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>Empirical Research Assistance (ERA)</em></a> — AI for expert-level scientific coding and computational discovery (May 2026).</li>
                        <li id="ref-3" className="scroll-mt-24">Lu, C. <em>et al.</em> — <a href="https://doi.org/10.1038/s41586-026-10265-5" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>Towards end-to-end automation of AI research</em></a> (The AI Scientist), Nature 651, 914–919 (2026).</li>
                        <li id="ref-4" className="scroll-mt-24">Isomorphic Labs — <a href="https://www.isomorphiclabs.com/articles/isomorphic-labs-announces-series-b-investment-round" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>$2.1B Series B investment round</em></a>, led by Thrive Capital with Alphabet, GV, MGX, Temasek, CapitalG, and the UK Sovereign AI Fund (May 2026).</li>
                        <li id="ref-5" className="scroll-mt-24">Index Ventures — <a href="https://www.indexventures.com/perspectives/inherent-designing-for-discovery/" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>Inherent: designing for discovery</em></a> — the "Faraday" system for open-ended scientific discovery ($50M seed led by Index Ventures and Radical Ventures).</li>
                        <li id="ref-6" className="scroll-mt-24">Air Street Capital — <a href="https://press.airstreet.com/p/introducing-perceptic" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>Introducing Perceptic</em></a> — the AI operating system for biopharma ($12M seed with Air Street Capital and Accel).</li>
                        <li id="ref-7" className="scroll-mt-24">Y Combinator — <a href="https://www.ycombinator.com/companies/celltype" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>CellType</em></a> — the agentic drug company using biological foundation models to simulate human biology.</li>
                        <li id="ref-8" className="scroll-mt-24">Y Combinator — <a href="https://www.ycombinator.com/companies/biostack-platforms" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>BioStack</em></a> — a data engine and post-training environments lab for healthcare and drug discovery AI.</li>
                        <li id="ref-9" className="scroll-mt-24">Ho, et al. — <a href="https://arxiv.org/abs/2605.30329" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>SoundnessBench: Can Your AI Scientist Really Tell Good Research Ideas from Bad Ones?</em></a> — a benchmark of 1,099 reconstructed ML research proposals for judging soundness.</li>
                        <li id="ref-10" className="scroll-mt-24">Nature — <a href="https://www.nature.com/articles/d41586-026-01551-3" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"><em>Why AI cannot do good science without humans</em></a>, editorial, Nature 653, 650 (May 2026).</li>
                    </ol>
                </section>

            </div>
        </article>
    );
};

export default AIForScienceIsBecomingInfrastructure;
