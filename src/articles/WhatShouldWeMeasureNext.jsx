import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { AUTHOR } from '../components/jsonld';
import AuthorBio from '../components/AuthorBio';

const REPO = 'https://github.com/VivienP/epistasis-budget';

const Figure = ({ src, alt, number, title, description, width, height, wide = false, maxWidthClass = 'max-w-full' }) => (
    <figure className={`my-10 -mx-6 ${wide ? 'md:mx-0 lg:-mx-16' : 'md:mx-0'} not-prose`}>
        <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Figure n°${number}: ${title} at full size`}
            className={`block mx-auto ${maxWidthClass}`}
        >
            <img
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="block w-full h-auto border-y md:border border-border-subtle md:rounded-lg bg-cream"
                loading="lazy"
            />
        </a>
        <figcaption className={`mt-4 mx-auto px-6 md:px-0 space-y-1 text-base leading-relaxed text-primary ${maxWidthClass}`}>
            <p className="font-semibold">Figure n°{number}: {title}</p>
            <p className="italic font-normal"><span>Description:</span> {description}</p>
        </figcaption>
    </figure>
);

const MathBlock = ({ label, children }) => (
    <div
        role="math"
        aria-label={label}
        className="my-8 overflow-x-auto border-y border-border-subtle py-6 px-4 text-center text-xl md:text-2xl font-serif whitespace-nowrap"
    >
        {children}
    </div>
);

const WhatShouldWeMeasureNext = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis | Vivien Perrelle"
                description="A provisional experimental-design study finds that loop-count allocation outperforms fitness-greedy selection downstream on GB1 and TrpB, without a supported gain from ESM masking dispersion."
                url="/blog/designing-protein-experiments-for-epistasis"
                image="/epibudget/workflow.webp"
                imageWidth={2048}
                imageHeight={900}
                type="article"
                article={{
                    publishedTime: '2026-07-23',
                    author: 'Vivien Perrelle',
                    section: 'AI for Science',
                    tags: ['Protein Engineering', 'Epistasis', 'Experimental Design', 'ESM-2', 'AI for Science'],
                }}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'BlogPosting',
                    headline: 'Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis',
                    description: 'A research account of testing ESM-2 masking dispersion and interaction-loop coverage as policies for allocating a fixed protein-experiment budget.',
                    image: 'https://vivienperrelle.com/epibudget/workflow.webp',
                    datePublished: '2026-07-23',
                    dateModified: '2026-07-23',
                    author: AUTHOR,
                    publisher: { '@type': 'Person', name: 'Vivien Perrelle' },
                    mainEntityOfPage: 'https://vivienperrelle.com/blog/designing-protein-experiments-for-epistasis',
                    about: {
                        '@type': 'SoftwareSourceCode',
                        name: 'epibudget',
                        url: 'https://vivienperrelle.com/projects/epibudget',
                        codeRepository: REPO,
                    },
                    keywords: 'protein engineering, epistasis, experimental design, ESM-2, active learning, TrpB, GB1',
                }}
            />

            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Journal Entry · AI for Science</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    A protein language model can rank thousands of mutations, but ranking is not the same as knowing which measurements to buy. This study spends a fixed experimental budget on the variants that expose how mutations interact. Registered downstream benchmarks back loop-count selection over fitness-greedy selection on GB1 and TrpB, while adding ESM masking dispersion buys no supported improvement.
                </p>
                <div className="pt-2 flex items-center space-x-2 text-sm text-secondary/80 italic font-light">
                    <span>By Vivien Perrelle · July 23, 2026</span>
                </div>
            </header>

            <Figure
                src="/epibudget/workflow.webp"
                alt="Workflow from a protein target and mutation budget through conjoint ESM-2 scoring and an epistasis graph to a ranked experimental shortlist"
                width="2048"
                height="900"
                number="1"
                title="From target protein to experimental plate"
                description="epibudget scores complete variants, maps their interaction structure, and converts a fixed experimental budget into a ranked measurement plate."
            />

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">
                <section className="space-y-6">
                    <p>
                        A protein language model can score thousands of mutations before anyone touches a pipette. That suggests an obvious recipe for protein engineering: rank the variants, keep the top predictions, and test them.
                    </p>
                    <p>
                        The recipe answers one question. Which variants does the model expect to perform well? It stays silent on a second one. Which variants should we measure if we want to learn how mutations interact?
                    </p>
                    <p>
                        The two questions do not share an answer. A plate stacked with predicted winners is good for exploitation and often poor as data. When every well lands in the same small neighbourhood of sequence space, the experiment says little about why the landscape has its shape, or how an untested combination will behave.
                    </p>
                    <p>
                        I built <Link to="/projects/epibudget" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">epibudget</Link> to take the second question seriously. Given a fixed budget of wells, it selects variants meant to expose epistatic structure instead of simply maximizing predicted fitness.
                    </p>
                    <p>
                        The project started from a hypothesis about ESM masking dispersion. The finished evidence pulls that weighting term apart from loop coverage, and the two do not fare the same. On TrpB, <code>info</code> beats fitness and random for pairwise map recovery, while the loop-count baseline exceeds <code>info</code> at budgets 96 and 192. In the downstream benchmark, loop-count selection beats fitness-greedy in 20/20 partitions on both GB1 and TrpB. The masking-dispersion gate does not pass on either landscape.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Epistasis makes prediction a relational problem</h2>
                    <p>
                        Suppose mutation A shifts a protein&apos;s fitness by +0.2 and mutation B shifts it by +0.1. An additive model predicts +0.3 for the double mutant AB. If the measured effect is +0.8, the surplus +0.5 is pairwise epistasis:
                    </p>
                    <MathBlock label="epsilon of A and B equals delta of A B minus delta of A minus delta of B">
                        ε(A,B) = Δ(AB) − Δ(A) − Δ(B)
                    </MathBlock>
                    <p>
                        A&apos;s effect now depends on whether B is present, and the reverse holds too. For three mutations, the same bookkeeping extends through inclusion–exclusion:
                    </p>
                    <MathBlock label="third order epsilon of A B C equals delta A B C minus the three double effects plus the three single effects">
                        ε(A,B,C) = Δ(ABC) − Δ(AB) − Δ(AC) − Δ(BC) + Δ(A) + Δ(B) + Δ(C)
                    </MathBlock>
                    <p>
                        This is why a combination measured on its own is not enough. Pinning down an interaction also requires the surrounding members of its inclusion–exclusion loop. For a pair, that loop holds A, B, and AB relative to the reference protein. For a triple, it holds seven mutant measurements. Measure the whole family and the interaction is fixed. Leave members out and it has to be inferred.
                    </p>
                    <p>
                        So the candidate set is better read as a measurement network than as a bag of independent points, each carrying its own fitness score. Some variants sit inside many interaction loops. Measuring one of them braces several uncertain relationships at once.
                    </p>
                    <p>
                        Geodetic triangulation is the useful analogy. A survey network becomes informative when its measurements form constraints that have to close consistently. A protein experiment behaves the same way: its chosen singles, doubles, and triples become informative when they jointly constrain the epistasis map.
                    </p>
                    <Figure
                        src="/epibudget/epistasis-loops.svg"
                        alt="WT-referenced pairwise and third-order measurement loops showing that AB and ABC require their complete lower-order measurement families"
                        width="600"
                        height="1040"
                        maxWidthClass="max-w-[600px]"
                        number="2"
                        title="Interaction coefficients are defined by closed measurement loops"
                        description="Pairwise and third-order coefficients are defined relative to WT-referenced families of measurements. An isolated combination cannot determine its own epistatic effect."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">A plate budget changes the objective</h2>
                    <p>
                        The benchmarks use four mutable sites over the full 20-amino-acid alphabet. Restricting candidates to singles, doubles, and triples still leaves 29,678 variants: 76 singles, 2,166 doubles, and 27,436 triples.
                    </p>
                    <p>
                        The budgets are 48, 96, and 192 measurements. Even the largest simulated plate therefore covers less than one percent of that candidate universe.
                    </p>
                    <p>
                        Scarcity forces a choice. Spend those wells on the variants most likely to be fit? On a random sample? Or on variants that jointly constrain as many interactions as possible? Fitness-greedy selection is exploitation: it asks the model for its favourite sequences. Epistasis mapping is an information problem: it asks which measurements would make hidden interaction structure identifiable.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">A two-part ESM-2 hypothesis</h2>
                    <p>
                        The registered profile used the 650-million-parameter checkpoint of <a href="https://doi.org/10.1126/science.ade2574" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">ESM-2</a>, a protein language model trained to reconstruct masked amino acids from their sequence context.
                    </p>
                    <p>
                        ESM-2 plays two roles. The first is to score every candidate without experimental labels, and it hides a technical trap. Score a double mutant by evaluating A and B independently on the original reference sequence and then summing, and the result is additive by construction. The model&apos;s pairwise epistasis collapses to exactly zero.
                    </p>
                    <p>
                        epibudget therefore scores variants <strong>conjointly</strong>. For AB, both mutations enter the sequence first. Position A is scored while B is present, position B while A is present, and the conditional log-likelihood ratios are then combined. Because each mutation is read in the other&apos;s context, the double-mutant score is free to differ from the sum of two reference-background single scores.
                    </p>
                    <p>
                        The second role is more speculative. For each candidate, random stretches of the surrounding, non-mutated sequence are masked and the same variant is rescored, 16 times in the registered profile. The variance across those scores becomes the masking-dispersion statistic. It measures how sensitive the score is to perturbed context, and it is not a calibrated posterior uncertainty estimate.
                    </p>
                    <MathBlock label="information score of a variant is approximately masking dispersion times the number of interaction loops containing that variant">
                        information score(v) ≈ masking dispersion(v) × interaction loops(v)
                    </MathBlock>
                    <p>
                        The intuition was defensible: prefer variants that matter to many interactions, then, among those, prefer the ones whose ESM score is most sensitive to context. It also bought a clean ablation. Assign every candidate the same dispersion and the weighting term vanishes, leaving the <strong>loop-count baseline</strong> (named <code>structural</code> in the tracked artifacts), which ranks variants only by how many pairwise and third-order loops they brace. The label points at interaction structure, not protein 3D structure.
                    </p>
                    <p>
                        This gives five strategies to compare: random sampling; fitness-greedy selection; a practice heuristic that starts from predicted beneficial singles and then adds their combinations; the low-order-first loop-count baseline; and the uncertainty-weighted score (named <code>info</code> in the tracked artifacts), which multiplies loop count by ESM masking dispersion.
                    </p>
                    <p>
                        Under the v1 independent-noise model, the acquisition score is modular: a candidate&apos;s score does not drop once a related candidate has already been selected. Allocation is therefore a fixed ranking, not a fully adaptive Bayesian design with correlated uncertainty and diminishing returns. That simplification made the first version tractable, and it marks the obvious next mathematical improvement.
                    </p>
                    <Figure
                        src="/epibudget/allocation-strategies.svg"
                        alt="Five static selection strategies choosing the same fixed number of variants from one candidate interaction graph and transferring them to different experimental plates"
                        width="600"
                        height="1420"
                        maxWidthClass="max-w-[600px]"
                        number="3"
                        title="Same candidates, different experimental plates"
                        description="Five static strategies select the same number of variants from a shared candidate universe. Only the selection criterion changes which variants enter the plate."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Evaluation without label leakage</h2>
                    <p>
                        The evaluation rests on two dense four-site landscapes. The first is GB1, an IgG-binding protein landscape introduced by <a href="https://elifesciences.org/articles/16965" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Wu and colleagues</a>. Its theoretical four-site space holds 20⁴, or 160,000, amino-acid combinations.
                    </p>
                    <p>
                        The second is TrpB, an enzyme active-site landscape from <a href="https://doi.org/10.1073/pnas.2400439121" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Johnston and colleagues</a>. It offers a mechanistically different target (enzyme catalysis rather than protein binding), and the two landscapes are scored separately, never pooled into a single claim of generality.
                    </p>
                    <p>
                        The load-bearing validation rule is the label boundary. Candidate enumeration, ESM scoring, graph construction, and selection never read measured fitness. The plate is fixed first. Only then are the matching labels revealed from the public landscape, standing in for what a wet-lab run would return.
                    </p>

                    <h3 className="text-base font-normal text-primary">1. Map recovery</h3>
                    <p>
                        Once the selected measurements are revealed, the map-recovery benchmark reconstructs WT-referenced pairwise and third-order epistasis terms and compares them, by Pearson and Spearman correlation, against ground-truth terms computed from the dense measured landscape.
                    </p>
                    <p>
                        The benchmark asks whether the chosen plate helps recover the interaction map. It is not a measurements-only test: unmeasured loop members keep an ESM prior, so map recovery scores a measurement-plus-prior estimator.
                    </p>

                    <h3 className="text-base font-normal text-primary">2. Downstream prediction</h3>
                    <p>
                        The confirmatory downstream benchmark is more practical. Each selected plate trains the same fixed pairwise ridge model. That learner sees the revealed measurements, but no held-out ESM features and no prior-inclusive map-recovery output. It then ranks held-out double and triple mutants.
                    </p>
                    <p>
                        The registered primary score, <em>S</em><sub>macro</sub>, averages the Spearman correlations for doubles and triples. Every strategy faced the same learner, 20 partitions, five outer folds, and budgets of 48, 96, and 192. Loop-count selection beat fitness-greedy in 20/20 partitions on both landscapes, with a mean learning-curve AUC advantage of +0.342 on GB1 and +0.286 on TrpB.
                    </p>
                    <Figure
                        src="/epibudget/downstream-label-boundary.svg"
                        alt="Pipeline that selects a plate without labels, reveals selected fitness, trains one pairwise ridge learner, and ranks held-out doubles and triples without ESM features"
                        width="600"
                        height="760"
                        maxWidthClass="max-w-md"
                        number="4"
                        title="Label boundaries in downstream evaluation"
                        description="Measured fitness is revealed only after selection, while held-out ESM features remain excluded from the fixed downstream learner."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What the V1 ablation actually compares</h2>
                    <p>
                        The historical V1 surrogate differs by a single weighting term. The loop-count baseline scores <em>score</em>(v) = n(v), where n(v) counts the interaction terms containing candidate v. The dispersion-weighted method scores <em>score</em>(v) = n(v) × τ²(v), where τ²(v) is the marginal dispersion of the ESM score across 16 masking perturbations.
                    </p>
                    <p>
                        Masking dispersion is an uncalibrated heuristic, not a validated posterior variance. The ablation therefore poses a deliberately narrow question: does that statistic add selection value on top of loop-count prioritization?
                    </p>
                    <p>
                        In the current symmetric four-site candidate universe, loop count is identical within each mutation order: 1,140 for singles, 39 for doubles, and 1 for triples. The baseline cannot discriminate inside an order, so historical rankings hinge on arbitrary tie-breaking or candidate enumeration order and call for a seeded tie reanalysis.
                    </p>
                    <Figure
                        src="/epibudget/structure-vs-dispersion.svg"
                        alt="Direct V1 ablation comparing a loop-count score with the same score multiplied by ESM masking dispersion across the same candidate groups and fixed budget"
                        width="600"
                        height="1210"
                        maxWidthClass="max-w-[600px]"
                        number="5"
                        title="What masking dispersion adds to the V1 score"
                        description="The ablation compares loop count alone with loop count weighted by ESM masking dispersion. Current evidence does not establish an additional benefit from the dispersion term."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Current evidence status</h2>
                    <p>
                        On TrpB, <code>info</code> beats fitness and random for pairwise map recovery. The loop-count baseline overtakes <code>info</code> at budgets 96 and 192, though not at 48. That pattern does not support a positive masking-dispersion contribution.
                    </p>
                    <p>
                        The corrective GB1 map-recovery result remains <code>inconclusive_zero_gpu</code>. Pairwise correlation improves at every registered budget, but relative squared-error gain stays negative, so no GB1 map-recovery winner is claimed.
                    </p>
                    <p>
                        The conforming downstream reports back loop-count selection over fitness-greedy in 20/20 partitions on GB1 and TrpB. They do not back the masking-dispersion contribution: the <code>info</code>-minus-loop-count gate passes in 15/20 GB1 partitions and 0/20 TrpB partitions at <em>B</em> = 192, below the registered threshold. Every comparative result remains provisional. The TrpB source mirror also carries 871 imputed fitness values that are not identified row by row.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What V1 established at the implementation level</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li><strong>Variant selection can be posed as measurement design.</strong> Predicted fitness and expected experimental value are distinct objectives.</li>
                        <li><strong>Interaction-loop counts define a reproducible baseline.</strong> The implementation exposes exactly which interaction terms contain each candidate.</li>
                        <li><strong>Conjoint scoring preserves model epistasis.</strong> Applying every mutation before reading conditional scores avoids the additive shortcut that would erase interaction signal by construction.</li>
                        <li><strong>The masking-dispersion term can be isolated.</strong> The code supports a direct score-level ablation without dressing τ² up as calibrated uncertainty.</li>
                        <li><strong>The label-leakage barrier holds.</strong> The confirmatory benchmark fixes the plate before any measured fitness is available.</li>
                    </ol>
                    <p>
                        The completed downstream benchmark adds comparative evidence for the allocation objective: under the registered fixed learner, loop-count selection outperforms predicted-fitness selection on both landscapes. That does not establish generality beyond these datasets and this learner.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Why masking dispersion remains an open question</h2>
                    <p>
                        Sensitivity to a damaged sequence context is not the same as uncertainty about experimental error. A prediction can swing under artificial masking and still be accurate; it can also sit perfectly stable and be wrong. Current calibration evidence does not establish τ² as a posterior uncertainty estimate.
                    </p>
                    <p>
                        The V1 variance model also assumes errors are independent across variants. Members of an epistatic loop share sequence context and pass through the same model, so their errors may be correlated. Ignoring those covariances keeps the score simple but may drop information a meaningful information-gain calculation would need.
                    </p>
                    <p>
                        The conclusion stays narrow. Current provisional results do not support a positive masking-dispersion contribution. This is evidence about one static heuristic, two four-site landscapes, and one downstream learner; it is not evidence that contextual dispersion can never be useful.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Next validation steps</h2>
                    <p>
                        The current version is a single-shot allocator: it ranks the full candidate pool once and returns <em>B</em> variants. A stronger system would be sequential: measure a first plate, update a correlated posterior over variant effects and epistasis terms, then choose the next plate from what the experiment actually resolved.
                    </p>
                    <p>
                        That would make the geodetic analogy literal. Each new measurement would change the value of the ones still on the table. Redundant loops would show diminishing returns, while unresolved parts of the interaction graph would grow more valuable.
                    </p>
                    <p>
                        I would also keep three quantities apart that the first version partly ran together: a variant&apos;s predicted effect; its calibrated predictive error; and the experimental value of measuring it inside a network. The first helps predict. The second describes confidence. The third depends on the scientific question and on what has already been measured. One score should not stand in for all three.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Implications for experimental design</h2>
                    <p>
                        Protein language models make predictions cheap. Experiments stay scarce. That asymmetry is what makes allocation matter more over time: as candidate generation scales, the bottleneck moves from proposing sequences to deciding which evidence is worth buying.
                    </p>
                    <p>
                        epibudget did not validate its original masking-dispersion hypothesis. It did produce a comparative result for the simpler design principle: covering interaction loops built better downstream training plates than fitness-greedy selection on GB1 and TrpB under the registered learner. The result is provisional and does not establish broader generality.
                    </p>
                    <p>
                        The useful question is not “Which variants does the model like?” but “Which measurements make the interaction structure identifiable?” That is the criterion that should shape the next experimental round.
                    </p>
                </section>

                <div className="not-prose pt-4">
                    <Link
                        to="/projects/epibudget"
                        className="inline-flex items-center space-x-2 px-5 py-3 border border-border-subtle hover:border-accent transition-colors text-sm text-primary"
                    >
                        <span>Explore the epibudget project</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <section className="space-y-6">
                    <h2 className="text-xl md:text-2xl pt-8 pb-2 font-normal text-primary border-b border-border-subtle">Evidence and sources</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-light">
                        <li>Lin, Z. et al. <a href="https://doi.org/10.1126/science.ade2574" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Evolutionary-scale prediction of atomic-level protein structure with a language model.</a> <em>Science</em> (2023).</li>
                        <li>Wu, N. C. et al. <a href="https://elifesciences.org/articles/16965" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Adaptation in protein fitness landscapes is facilitated by indirect paths.</a> <em>eLife</em> (2016).</li>
                        <li>Johnston, K. E. et al. <a href="https://doi.org/10.1073/pnas.2400439121" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">A combinatorially complete epistatic fitness landscape in an enzyme active site.</a> <em>PNAS</em> (2024).</li>
                        <li><a href={`${REPO}/blob/main/docs/VALIDATION.md`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Frozen validation protocol</a>, <a href={`${REPO}/blob/main/docs/LIMITATIONS.md`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">limitations</a>, and <a href={`${REPO}/blob/main/artifacts/structural_allocation_650m.json`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">tracked evidence artifact</a>.</li>
                    </ol>
                </section>
            </div>

            <AuthorBio readNext={[
                { to: '/projects/epibudget', label: 'epibudget: experimental design for protein epistasis' },
                { to: '/blog/ai-for-science-is-becoming-a-systems-problem', label: 'AI for Science Is Moving From Prediction to Closed-Loop Research Systems' },
                { to: '/projects/scientific-claim-verifier', label: 'Scientific Claim Verifier: open-source claim-to-source verification' },
            ]} />
        </article>
    );
};

export default WhatShouldWeMeasureNext;
