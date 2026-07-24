import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { AUTHOR } from '../components/jsonld';
import AuthorBio from '../components/AuthorBio';

const REPO = 'https://github.com/VivienP/epistasis-budget';

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

const Figure = ({ src, alt, number, title, description, width, height, wide = false, maxWidthClass = 'max-w-full' }) => (
    <figure className={`my-10 ${wide ? 'lg:-mx-16' : ''} not-prose`}>
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
                className="block w-full h-auto border border-border-subtle rounded-lg bg-cream"
                loading="lazy"
            />
        </a>
        <figcaption className={`mt-4 mx-auto space-y-1 text-base leading-relaxed text-primary ${maxWidthClass}`}>
            <p className="font-semibold">Figure n°{number}: {title}</p>
            <p className="italic font-normal"><span>Description:</span> {description}</p>
        </figcaption>
    </figure>
);

const MathBlock = ({ label, children }) => (
    <div
        role="math"
        aria-label={label}
        className="my-8 border-y border-border-subtle py-6 px-4 text-center text-base sm:text-xl md:text-2xl font-serif leading-relaxed [text-wrap:balance]"
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
                    A protein language model can rank thousands of mutations, but ranking does not tell us which measurements are worth buying. This study allocates a fixed experimental budget to variants chosen to expose mutation interactions. Registered downstream benchmarks support the <code>structural</code> loop-count baseline over fitness-greedy selection on GB1 and TrpB; they do not support an added benefit from ESM masking dispersion.
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
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Terminology</h2>
                    <ul className="m-0 list-disc space-y-2 pl-6 text-base leading-relaxed text-primary">
                        <li><strong>Variant:</strong> One version of a protein sequence containing one or more amino-acid changes.</li>
                        <li><strong>Site:</strong> A position in that sequence.</li>
                        <li><strong>Experimental plate:</strong> A container with wells in which variants are measured. The budget <code>B</code> is the number of variants available for measurement.</li>
                        <li><strong>Label:</strong> The experimental outcome measured for a specific variant.</li>
                        <li><strong>Protein landscape:</strong> A mapping from variants to their corresponding measured outcomes.</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Introduction</h2>
                    <p>
                        A protein language model can score thousands of mutations before anyone touches a pipette. That suggests an obvious recipe for protein engineering: <strong>rank the variants, keep the top predictions, and test them</strong>.
                    </p>
                    <p>The recipe answers one question:</p>
                    <blockquote className="not-prose border-l-2 border-accent pl-6 text-lg md:text-xl font-serif italic text-primary">
                        <p>Which variants does the model expect to perform well?</p>
                    </blockquote>
                    <p>It stays silent on a second one:</p>
                    <blockquote className="not-prose border-l-2 border-accent pl-6 text-lg md:text-xl font-serif italic text-primary">
                        <p>Which variants should we measure if we want to learn how mutations interact?</p>
                    </blockquote>
                    <p>
                        The two questions need not have the same answer. A plate concentrated on predicted winners serves exploitation but may be poorly suited to mapping interactions. If most wells sample the same small neighbourhood of sequence space, the experiment may reveal little about the landscape&apos;s shape or the behaviour of untested combinations.
                    </p>
                    <p>
                        I built <Link to="/projects/epibudget" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">epibudget</Link> to take the second question seriously: given a fixed budget of wells, it selects variants meant to expose epistatic structure instead of simply maximizing predicted fitness.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Epistasis makes prediction a relational problem</h2>
                    <blockquote className="not-prose border-l-2 border-accent pl-6 text-lg md:text-xl font-serif italic text-primary">
                        Epistasis is the non-additive interaction between mutations: the effect of one depends on the genetic background of the others.<Cite n={1} />
                    </blockquote>
                    <p>
                        Here, A and B are abstract labels for mutations at two selected positions in the protein sequence;
                        they are not amino-acid names. Suppose mutation A shifts a protein&apos;s fitness by +0.2 and mutation B
                        shifts it by +0.1. An additive model predicts +0.3 for the double mutant AB. If the measured effect is
                        +0.8, the surplus +0.5 is pairwise epistasis:
                    </p>
                    <MathBlock label="epsilon of A and B equals delta of A B minus delta of A minus delta of B">
                        ε(A,B) = Δ(AB) − Δ(A) − Δ(B)
                    </MathBlock>
                    <p>
                        Here, Δ(v) is the measured effect of variant v relative to the reference construct: the starting
                        protein sequence from which the variants were generated.
                    </p>
                    <p>
                        A&apos;s effect now depends on whether B is present, and the reverse holds too. For three mutations,
                        the same bookkeeping extends through inclusion–exclusion:
                    </p>
                    <MathBlock label="third order epsilon of A B C equals delta A B C minus the three double effects plus the three single effects">
                        ε(A,B,C) = Δ(ABC) − Δ(AB) − Δ(AC) − Δ(BC) + Δ(A) + Δ(B) + Δ(C)
                    </MathBlock>
                    <p>
                        In plain language, this formula removes the effects already explained by the singles and doubles,
                        leaving the third-order interaction term.
                    </p>
                    <p>
                        This is why a combination measured on its own is not enough. Pinning down an interaction also requires
                        the surrounding members of its inclusion–exclusion loop. For a pair, that family contains
                        A, B, and AB relative to the reference construct. For a triple, it contains seven mutant
                        measurements. Measure the complete family and the interaction is determined. Leave members out and it
                        must be inferred.
                    </p>
                    <p>
                        Here, a <strong>measurement loop</strong> is not a biological feedback loop. It is the complete family of
                        related measurements needed to isolate one interaction coefficient. The candidate set is therefore better
                        understood as a measurement network<Cite n={2} /> than as a collection of independent points.
                        <strong> Some variants contribute to many interaction loops.</strong><Cite n={3} /> Measuring one of them
                        helps determine several interaction coefficients at once.
                    </p>
                    <p>
                        Geodetic triangulation is a useful analogy. A survey network becomes informative when its measurements form constraints that have to close consistently. A protein experiment behaves the same way: its chosen singles, doubles, and triples become informative when they jointly constrain the epistasis map.
                    </p>
                    <Figure
                        src="/epibudget/epistasis-loops.svg"
                        alt="Reference-centered pairwise and third-order measurement loops showing that AB and ABC require their complete lower-order measurement families"
                        width="600"
                        height="1040"
                        maxWidthClass="max-w-[600px]"
                        number="2"
                        title="Interaction coefficients are defined by closed measurement loops"
                        description="Pairwise and third-order coefficients are calculated from complete families of measurements centered on the reference construct. An isolated combination cannot determine its own epistatic effect."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">A plate budget changes the objective</h2>
                    <p>
                        The GB1<Cite n={5} /> and TrpB<Cite n={6} /> benchmarks each vary four selected sites in the protein sequence while
                        holding every other position fixed. Each site can contain any of the 20 standard amino acids.
                    </p>
                    <p>
                        Because one amino acid is already present at each site in the reference construct, each position has
                        19 possible non-reference substitutions. A single mutant changes one site, a double changes two, and a
                        triple changes three. The resulting <strong>candidate universe</strong>—the complete set of variants allowed
                        by these rules—contains <code>29,678</code> variants: <code>76</code> singles, <code>2,166</code> doubles, and <code>27,436</code> triples.
                    </p>
                    <p>
                        The registered budgets are <code>B = 48</code>, <code>B = 96</code>, and <code>B = 192</code> variants.
                        Even the largest simulated plate covers less than <code>1%</code> of the candidate universe.
                    </p>
                    <p>
                        Scarcity forces a choice. Spend those wells on the variants most likely to be fit? On a random sample? Or on variants that jointly constrain as many interactions as possible? Fitness-greedy selection is exploitation: it asks the model for its favourite sequences. Epistasis mapping is an information problem: it asks which measurements would make hidden interaction structure identifiable.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">A two-part ESM-2 hypothesis</h2>
                    <p>
                        The registered profile used the <code>esm2_t33_650M</code> checkpoint of ESM-2<Cite n={4} />. ESM-2 is a protein
                        language model: much as a text model learns which words are plausible from the surrounding sentence,
                        ESM-2 learns which amino acids are plausible from the surrounding protein sequence.
                    </p>
                    <p>
                        ESM-2 plays two roles. The first is to score every candidate without seeing experimental labels. This
                        introduces a technical trap: if mutations A and B are scored independently on the unchanged reference
                        sequence and their scores are simply added, the resulting prediction is additive by construction.
                        The model&apos;s predicted pairwise epistasis is then exactly zero.
                    </p>
                    <p>
                        epibudget therefore scores variants <strong>conjointly</strong>. Conjoint scoring means that all mutations
                        in a candidate are inserted into the sequence before any of them is scored. For AB, A is evaluated while
                        B is present, and B while A is present. Their context-dependent scores are then combined, allowing the
                        prediction for AB to differ from the sum of two mutations scored separately.
                    </p>
                    <p>
                        The second role is more speculative. <strong>Masking</strong> temporarily hides a subset of non-mutated
                        sequence positions before ESM-2 scores the same candidate again. Each candidate is rescored under
                        <code>16</code> masking perturbations. Greater variation produces a larger <code>τ²(v)</code>. This statistic
                        measures sensitivity to artificial context perturbation; it is not calibrated predictive uncertainty.
                    </p>
                    <MathBlock label="V1 selection score equals loop count multiplied by ESM masking dispersion">
                        V1 selection score(v) = n(v) × τ²(v)
                    </MathBlock>
                    <p>
                        The intuition was to prefer variants that contribute to many interactions and, among those, variants whose
                        ESM scores are more sensitive to context. An <strong>ablation</strong> tests the contribution of one component
                        by removing it while leaving everything else unchanged.
                    </p>
                    <p>
                        Assigning every candidate the same dispersion removes the weighting term and yields the loop-count baseline,
                        named <code>structural</code> in the tracked artifacts. Here, structural refers to interaction structure, not
                        protein 3D structure.
                    </p>
                    <p>
                        The five tracked strategies are <code>random</code>; <code>fitness</code> (fitness-greedy); <code>practice</code>;
                        <code>structural</code> (loop count alone); and <code>info</code> (dispersion-weighted loop count).
                    </p>
                    <p>
                        In v1, every candidate receives one fixed score before selection begins. Selecting one variant does not lower
                        the score of related variants, even when they may provide partly redundant information. The method is therefore
                        a static ranking, not a sequential Bayesian design that updates after observing experimental results.
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
                        An ablation estimates a component&apos;s contribution by comparing methods that differ only in that
                        component. In v1, the two ablation methods differ only in the ESM masking-dispersion term. Both rank
                        candidates before any measured fitness is revealed.
                    </p>
                    <p>
                        The loop-count baseline scores a candidate <code>v</code> by <code>n(v)</code>, the number of interaction
                        terms containing <code>v</code>. The dispersion-weighted method uses <code>n(v) × τ²(v)</code>, where
                        <code>τ²(v)</code> is the ESM masking dispersion across <code>16</code> perturbations.
                    </p>
                    <p>
                        Both methods prioritize variants appearing in many interaction terms. <strong>The ablation tests whether
                        masking dispersion improves selection beyond loop count.</strong>
                    </p>
                    <p>
                        In the symmetric four-site candidate universe, all candidates of the same mutation order have identical
                        loop counts: <code>1,140</code> for singles, <code>39</code> for doubles, and <code>1</code> for triples.
                    </p>
                    <p>
                        Consequently, loop count cannot rank candidates within a mutation order. Tied candidates may therefore be
                        selected according to enumeration order unless ties are broken explicitly.
                    </p>
                    <p>
                        A seeded tie reanalysis randomizes tied candidates while recording the random seed. <strong>This separates
                        the effect of the scoring rule from enumeration order.</strong>
                    </p>
                    <Figure
                        src="/epibudget/structure-vs-dispersion.svg"
                        alt="Direct v1 ablation comparing a loop-count score with the same score multiplied by ESM masking dispersion across the same candidate groups and fixed budget"
                        width="600"
                        height="1210"
                        maxWidthClass="max-w-[600px]"
                        number="4"
                        title="What masking dispersion adds to the v1 score"
                        description="The ablation compares loop count alone with loop count weighted by ESM masking dispersion. Current evidence does not establish an additional benefit from the dispersion term."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Evidence status</h2>
                    <p>
                        On TrpB, <code>info</code> outperforms <code>fitness</code> and <code>random</code> in pairwise map recovery.
                        However, <code>structural</code>, the simpler loop-count baseline, performs better at <code>B = 96</code> and
                        <code>B = 192</code>, but not at <code>B = 48</code>. <strong>These results do not support an added benefit
                        from masking dispersion.</strong>
                    </p>
                    <p>
                        On GB1, a map-recovery re-analysis using cached model scores, without an additional GPU run, remains
                        inconclusive. Pairwise correlation improves at all registered budgets, but the relative squared-error
                        criterion is not met. No method is therefore declared the GB1 map-recovery winner.
                    </p>
                    <p>
                        For downstream prediction, <strong>the registered <code>structural</code>-minus-<code>fitness</code>
                        learning-curve AUC is positive in <code>20/20</code> partitions on both GB1 and TrpB.</strong> The
                        <code>info</code>-minus-<code>structural</code> gate at <code>B = 192</code> is positive in
                        <code>15/20</code> GB1 partitions and <code>0/20</code> TrpB partitions, below the registered threshold.
                        Thus, the analysis supports structural allocation, not an incremental contribution from masking dispersion.
                    </p>
                    <p>
                        A registered gate is a success criterion specified before inspection of the final results. <strong>All
                        findings remain provisional and are limited to the evaluated benchmarks, learner, and experimental
                        protocol.</strong> They are not presented as general conclusions.
                    </p>
                    <p>
                        The TrpB source paper reports <code>871</code> imputed fitness values, but the public mirror does not
                        identify them row by row.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What v1 established at the implementation level</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li><strong>Variant selection can be posed as measurement design.</strong> Predicted fitness and expected experimental value are distinct objectives.</li>
                        <li><strong>Interaction-loop counts define a reproducible baseline.</strong> The implementation exposes exactly which interaction terms contain each candidate.</li>
                        <li><strong>Conjoint scoring preserves context-dependent model signal.</strong> Applying every mutation before reading conditional scores avoids the additive shortcut that would erase interaction signal by construction.</li>
                        <li><strong>The masking-dispersion term can be isolated.</strong> The code supports a direct score-level ablation without dressing τ² up as calibrated uncertainty.</li>
                        <li><strong>The implementation enforces the label boundary.</strong> The confirmatory benchmark fixes the plate before any measured fitness is revealed.</li>
                    </ol>
                    <p>
                        The registered downstream benchmark adds comparative evidence for the allocation objective: under the fixed
                        learner, <strong><code>structural</code> selection is supported over fitness-greedy selection on both
                        landscapes.</strong> This does not establish generality beyond these datasets and this learner.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Why masking dispersion remains an open question</h2>
                    <p>
                        Sensitivity to an artificially masked sequence context is not the same as calibrated predictive uncertainty.
                        A prediction can vary under masking and still be accurate; it can also remain stable and be wrong. Current
                        calibration evidence does not establish <code>τ²</code> as a posterior uncertainty estimate.
                    </p>
                    <p>
                        The v1 variance model also assumes errors are independent across variants. Members of an epistatic loop share sequence context and pass through the same model, so their errors may be correlated. Ignoring those covariances keeps the score simple but may drop information a meaningful information-gain calculation would need.
                    </p>
                    <p>
                        The conclusion remains narrow: current provisional results do not support an added contribution from masking
                        dispersion. This evidence concerns one static heuristic, two four-site landscapes, and one downstream learner;
                        it does not show that contextual dispersion can never be useful.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Next validation steps</h2>
                    <p>
                        The current version is a <strong>single-shot allocator</strong>: it ranks the complete candidate pool once
                        and returns one plate of <code>B</code> variants.
                    </p>
                    <p>
                        A future extension could be <strong>sequential</strong>. It would measure a first plate, update its beliefs and
                        uncertainty estimates for the remaining variants, and then select the next plate based on what the experiment
                        resolved.
                    </p>
                    <p>
                        That would make the geodetic analogy literal. Once one part of the interaction network has been measured,
                        related measurements may become less valuable because they provide redundant information. Measurements in
                        unresolved parts of the network would become more valuable.
                    </p>
                    <p>
                        A future version should also keep three quantities separate:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li>
                            <strong>Predicted effect:</strong> how well the model expects a variant to perform.
                        </li>
                        <li>
                            <strong>Calibrated predictive error:</strong> how uncertain that prediction is expected to be.
                        </li>
                        <li>
                            <strong>Experimental value:</strong> how informative measuring the variant would be for the current
                            scientific question, given what has already been measured.
                        </li>
                    </ol>
                    <p>
                        The first helps predict, the second quantifies predictive uncertainty, and the third guides experimental
                        design. One score should not stand in for all three.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Implications for experimental design</h2>
                    <p>
                        Protein language models make predictions cheap.
                    </p>
                    <p>
                        Experiments stay scarce.
                    </p>
                    <p>
                        That asymmetry is what makes allocation matter more over time: as candidate generation scales, <strong>the bottleneck moves from proposing sequences to deciding which evidence is worth buying.</strong>
                    </p>
                    <p>
                        The current results do not support the original masking-dispersion hypothesis. They support a narrower design
                        result: under the registered learner, <strong>structural loop-count selection yields better downstream ranking
                        than fitness-greedy selection on GB1 and TrpB.</strong> This comparative result remains provisional and does not
                        establish broader generality.
                    </p>
                    <p>
                        The useful question is not “Which variants does the model like?” but “Which measurements make the interaction structure identifiable?”
                    </p>
                    <p>
                        That is the criterion that should shape the next experimental round.
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
                    <h2 className="text-xl md:text-2xl pt-8 pb-2 font-normal text-primary border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-light">
                        <li id="ref-1" className="scroll-mt-24">Phillips, P. C. <a href="https://doi.org/10.1038/nrg2452" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Epistasis — the essential role of gene interactions in the structure and evolution of genetic systems.</a> <em>Nature Reviews Genetics</em> (2008).</li>
                        <li id="ref-2" className="scroll-mt-24">Poelwijk, F. J. et al. <a href="https://doi.org/10.1371/journal.pcbi.1004771" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">The context-dependence of mutations: a linkage of formalisms.</a> <em>PLOS Computational Biology</em> (2016).</li>
                        <li id="ref-3" className="scroll-mt-24">Faure, A. J. et al. <a href="https://doi.org/10.1371/journal.pcbi.1012132" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">An extension of the Walsh-Hadamard transform to calculate and model epistasis in genetic landscapes of arbitrary shape and complexity.</a> <em>PLOS Computational Biology</em> (2024).</li>
                        <li id="ref-4" className="scroll-mt-24">Lin, Z. et al. <a href="https://doi.org/10.1126/science.ade2574" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Evolutionary-scale prediction of atomic-level protein structure with a language model.</a> <em>Science</em> (2023).</li>
                        <li id="ref-5" className="scroll-mt-24">Wu, N. C. et al. <a href="https://elifesciences.org/articles/16965" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Adaptation in protein fitness landscapes is facilitated by indirect paths.</a> <em>eLife</em> (2016).</li>
                        <li id="ref-6" className="scroll-mt-24">Johnston, K. E. et al. <a href="https://doi.org/10.1073/pnas.2400439121" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">A combinatorially complete epistatic fitness landscape in an enzyme active site.</a> <em>PNAS</em> (2024).</li>
                        <li id="ref-7" className="scroll-mt-24"><a href={`${REPO}/blob/main/docs/VALIDATION.md`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Frozen validation protocol</a>, <a href={`${REPO}/blob/main/docs/LIMITATIONS.md`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">limitations</a>, and <a href={`${REPO}/blob/main/artifacts/structural_allocation_650m.json`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">tracked evidence artifact</a>.</li>
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
