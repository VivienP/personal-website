import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Cite from '../components/Cite';
import FigureCaption from '../components/FigureCaption';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ArticleSEO from '../components/ArticleSEO';
import ArticleByline from '../components/ArticleByline';
import AuthorBio from '../components/AuthorBio';
import MathBlock from '../components/MathBlock';
import AllocationStrategiesDiagram from '../components/epibudget/AllocationStrategiesDiagram';

const REPO = 'https://github.com/VivienP/epistasis-budget';
const EXPLAINER = '/journal/epistasis-explained-best-variant-vs-best-experiment';
const SLUG = 'designing-protein-experiments-for-epistasis';

// A static numbered figure. The caption comes from the same FigureCaption the inline
// React diagrams use, so an image figure and a diagram figure cannot drift apart in
// wording or typography; only the image and its measure are this article's business.
const Figure = ({ src, alt, number, title, description, width, height, wide = false, framed = true, spacingClass = 'my-10', maxWidthClass = 'max-w-full' }) => (
    <figure className={`${spacingClass} ${wide ? 'lg:-mx-16' : ''} not-prose`}>
        <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`block mx-auto w-full h-auto ${framed ? 'border border-border-subtle rounded-lg bg-cream' : ''} ${maxWidthClass}`}
            loading="lazy"
        />
        <FigureCaption number={number} title={title} description={description} className={`mx-auto ${maxWidthClass}`} />
    </figure>
);

const WhatShouldWeMeasureNext = () => {
    return (
        <ArticleLayout backTo="/journal" backLabel="Journal">
            <ArticleSEO
                slug={SLUG}
                title="Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis | Vivien Perrelle"
                description="A provisional experimental-design study comparing label-blind plate-selection strategies under fixed protein-experiment budgets, and the audit that withdrew its original epistasis-map-recovery interpretation."
                image="/epibudget/workflow.webp"
                imageWidth={2048}
                imageHeight={900}
                section="AI for Science"
                modifiedTime="2026-08-13"
                jsonLd={{
                    description: 'A research account of testing ESM-2 masking dispersion and interaction-loop coverage as policies for allocating a fixed protein-experiment budget, including the audit that withdrew the original epistasis-map-recovery interpretation.',
                    about: {
                        '@type': 'SoftwareSourceCode',
                        name: 'epibudget',
                        url: 'https://vivienperrelle.com/projects/epibudget',
                        codeRepository: REPO,
                    },
                    keywords: 'protein engineering, epistasis, experimental design, ESM-2, active learning, TrpB, GB1',
                }}
            />

            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Journal Entry · AI for Science</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis
                </h1>
                <p className="text-lg text-secondary font-normal max-w-2xl">
                    A protein language model can rank thousands of variants, but ranking does not identify which measurements are most useful for learning mutation interactions. This study compares label-blind allocation strategies under fixed experimental budgets. Historical downstream artifacts favored particular loop-count plates over fitness-greedy plates on GB1 and TrpB, while masking dispersion did not pass its incremental gate. A later audit withdrew the original epistasis-map-recovery interpretation because the metric shared measured lower-order terms between prediction and truth.
                </p>
                <ArticleByline slug={SLUG} />
            </header>

            <aside className="mb-12 border border-border-subtle rounded-lg bg-cream p-6 space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-secondary">
                    Technical research note · Advanced · approximately 15 minutes
                </p>
                <p className="text-base leading-relaxed text-primary">
                    New to epistasis or experimental design? Start with the primer:{' '}
                    <Link to={EXPLAINER} className="italic border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">
                        Epistasis Explained: Why the Best Protein Variant Is Not Always the Best Experiment
                    </Link>
                    .
                </p>
            </aside>

            <Figure
                src="/epibudget/workflow.webp"
                alt="Workflow from a protein target and mutation budget through conjoint ESM-2 scoring and an epistasis graph to a ranked experimental shortlist"
                width="2048"
                height="900"
                number="1"
                title="From target protein to experimental plate"
                description="epibudget scores complete variants, maps their interaction structure, and converts a fixed experimental budget into a ranked measurement plate."
            />

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-normal">
                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Terminology</h2>
                    <ul className="m-0 list-disc space-y-2 pl-6 text-base leading-relaxed text-primary">
                        <li><strong>Variant:</strong> One version of a protein sequence containing one or more amino-acid changes.</li>
                        <li><strong>Site:</strong> A position in that sequence.</li>
                        <li><strong>Experimental plate:</strong> A container with wells in which variants are measured. The budget <code>B</code> is the number of variants available for measurement.</li>
                        <li><strong>Label:</strong> The experimental outcome measured for a specific variant.</li>
                        <li><strong>Protein landscape:</strong> A mapping from variants to their corresponding measured outcomes.</li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Introduction</h2>
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
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Epistasis makes prediction a relational problem</h2>
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
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">A plate budget changes the objective</h2>
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
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">A two-part ESM-2 hypothesis</h2>
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
                        sequence positions before ESM-2 scores the same candidate again. Each candidate is rescored under{' '}
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
                        recorded as <code>structural</code> in the tracked artifacts. This label identifies allocation by
                        interaction-loop coverage rather than a representation of tertiary protein structure.
                    </p>
                    <p>
                        The score rewards participation in interaction terms additively. It does not explicitly reward
                        completing a measurement family, and it does not by itself guarantee that any interaction
                        coefficient becomes identifiable.
                    </p>
                    <p>
                        The five tracked strategies are <code>random</code>; <code>fitness</code> (fitness-greedy); <code>practice</code>;{' '}
                        <code>structural</code> (loop count alone); and <code>info</code> (dispersion-weighted loop count).
                    </p>
                    <p>
                        In v1, every candidate receives one fixed score before selection begins. Selecting one variant does not lower
                        the score of related variants, even when they may provide partly redundant information. The method is therefore
                        a static ranking, not a sequential Bayesian design that updates after observing experimental results.
                    </p>
                    <AllocationStrategiesDiagram
                        number="3"
                        title="Same candidates, different experimental plates"
                        description="Five static strategies select the same number of variants from a shared candidate universe. Only the selection criterion changes which variants enter the plate."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Evaluation without label leakage</h2>
                    <p>
                        An ablation estimates a component&apos;s contribution by comparing methods that differ only in that
                        component. In v1, the two ablation methods differ only in the ESM masking-dispersion term. Both rank
                        candidates before any measured fitness is revealed.
                    </p>
                    <p>
                        The loop-count baseline scores a candidate <code>v</code> by <code>n(v)</code>, the number of interaction
                        terms containing <code>v</code>. The dispersion-weighted method uses <code>n(v) × τ²(v)</code>, where{' '}
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
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Evidence status</h2>
                    <p>
                        The evidence boundary changed after a mathematical audit of the recovery metric.
                    </p>
                    <p>
                        The original analysis correlated predicted and measured epistasis contrasts. Both quantities
                        contained the same signed sum of purchased lower-order measurements. Their correlation could
                        therefore increase through this shared skeleton, even if predictions for the unmeasured terms did
                        not improve. The former map-recovery interpretation is withdrawn; those correlations are retained
                        only as diagnostics.
                    </p>
                    <p>
                        The audit did not only remove a claim: it specified the replacement. Recovery is now posed
                        directly on the Fourier coefficients of the unmeasured interaction terms, which cannot inherit
                        the purchased lower-order skeleton.
                    </p>
                    <p>
                        No tracked corrected-recovery artifact currently demonstrates positive error reduction under
                        that test. The project therefore makes no public claim that any method reconstructed an
                        epistasis map.
                    </p>
                    <p>
                        The tracked downstream v1 artifacts remain historical observations on particular selected plates.
                        Under one tie realization, the learning-curve AUC favored <code>structural</code> over
                        fitness-greedy on GB1 and TrpB. The incremental <code>info</code> versus <code>structural</code>{' '}
                        gate did not pass on either landscape. Because the loop-count score is constant within mutation
                        order and the tracked artifacts do not sample tie seeds, these results do not estimate the
                        acquisition method over its selection distribution.
                    </p>
                    <p>
                        The supported interpretation is narrower: the project distinguishes fitness optimization from
                        measurement design, implements reproducible label-blind baselines, preserves context-dependent
                        ESM-2 scoring, and exposes why identifiability, selection variability and leakage-resistant
                        metrics are central to scientific evaluation.
                    </p>
                    <p>
                        A registered gate is a success criterion specified before inspection of the final results.<Cite n={7} /> <strong>All
                        findings remain provisional and are limited to the evaluated benchmarks, learner, and experimental
                        protocol.</strong> They are not presented as general conclusions.
                    </p>
                    <p>
                        The TrpB source paper reports <code>871</code> imputed fitness values, but the public mirror does not
                        identify them row by row.
                    </p>

                    <details className="not-prose border border-border-subtle rounded-lg bg-cream">
                        <summary className="cursor-pointer list-none px-6 py-4 text-sm text-primary hover:text-accent transition-colors [&::-webkit-details-marker]:hidden">
                            Show the withdrawn diagnostic figure
                        </summary>
                        <div className="px-6 pb-6">
                            <Figure
                                src="/epibudget/map_recovery_trpb_vs_gb1.svg"
                                alt="Epistasis-contrast correlation across experimental budgets on the TrpB and GB1 four-site landscapes, comparing loop-count allocation, dispersion-weighted allocation, fitness-greedy allocation, and random allocation"
                                width="590.221875"
                                height="620"
                                framed={false}
                                spacingClass="mb-10"
                                number="5"
                                title="Withdrawn diagnostic — not evidence of epistasis-map recovery"
                                description={<>Predicted and measured contrasts share purchased lower-order terms, so correlation can rise without better prediction of unmeasured components. See the evaluation methodology notes.<Cite n={7} /> Point estimates only; y-axis scales differ by row. The absence of intervals is a data-availability constraint: the public TrpB artifact does not include pointwise confidence intervals.</>}
                            />
                        </div>
                    </details>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">What the study established</h2>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li><strong>Variant selection can be posed as measurement design:</strong> predicted fitness and expected experimental value are distinct objectives.</li>
                        <li><strong>Conjoint scoring avoids imposing additivity</strong> by separately scoring mutations on an unchanged reference context.</li>
                        <li><strong>Loop count defines a simple, reproducible allocation baseline,</strong> but it does not explicitly reward loop completion or guarantee identifiability.</li>
                        <li><strong>Historical downstream artifacts favored particular loop-count plates over fitness-greedy plates;</strong> the tracked evidence does not establish robustness across tie seeds.</li>
                        <li><strong>Masking dispersion has not yet shown added value beyond loop coverage</strong> in the tested v1 procedure.</li>
                        <li><strong>The original map-recovery interpretation is withdrawn</strong> because its correlation metric was confounded by shared measured terms, and the audit sharpened the question into a stricter Fourier-coefficient test.</li>
                    </ol>
                    <p>
                        These findings remain provisional and do not establish generality beyond the evaluated landscapes, learner, and protocol.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Why masking dispersion remains an open question</h2>
                    <p>
                        Sensitivity to an artificially masked sequence context is not the same as calibrated predictive uncertainty.
                        A prediction can vary under masking and still be accurate; it can also remain stable and be wrong.
                    </p>
                    <p>
                        The v1 score also ignores error covariance between variants that share sequence context and pass through the same model. Current evidence therefore supports only a narrow conclusion: on these two four-site landscapes and with this fixed downstream learner, the registered analyses do not establish added value from masking dispersion beyond loop coverage. They do not show that contextual uncertainty signals can never be useful.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Next validation steps</h2>
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
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Implications for experimental design</h2>
                    <p>
                        Protein language models make predictions cheap.
                    </p>
                    <p>
                        Experiments remain scarce.
                    </p>
                    <p>
                        As candidate generation scales, the bottleneck shifts from proposing sequences to deciding which evidence is worth producing.
                    </p>
                    <p>
                        epibudget is an early, static step toward that objective. It selects one plate before observing labels; a true closed-loop system would update its beliefs after every measured batch and use those results to design the next experiment.
                    </p>
                    <p>
                        The useful question is not “Which variants does the model like?” but “Which measurements make the interaction structure identifiable?”
                    </p>
                    <p>
                        <strong>The next generation of scientific AI should not merely predict biology from existing data. It should decide which experiment can change what we know.</strong>
                    </p>
                </section>

                <div className="not-prose pt-4 flex flex-col sm:flex-row flex-wrap gap-3">
                    <Link
                        to={EXPLAINER}
                        className="inline-flex items-center justify-between sm:justify-start gap-2 px-5 py-3 border border-border-subtle hover:border-accent transition-colors text-sm text-primary"
                    >
                        <span>Read the primer</span>
                        <ArrowRight size={16} />
                    </Link>
                    <Link
                        to="/projects/epibudget"
                        className="inline-flex items-center justify-between sm:justify-start gap-2 px-5 py-3 border border-border-subtle hover:border-accent transition-colors text-sm text-primary"
                    >
                        <span>Explore the epibudget project</span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary border-b border-border-subtle">References</h2>
                    <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-normal">
                        <li id="ref-1" className="scroll-mt-24">Phillips, P. C. <a href="https://doi.org/10.1038/nrg2452" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Epistasis — the essential role of gene interactions in the structure and evolution of genetic systems.</a> <em>Nature Reviews Genetics</em> (2008).</li>
                        <li id="ref-2" className="scroll-mt-24">Poelwijk, F. J. et al. <a href="https://doi.org/10.1371/journal.pcbi.1004771" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">The context-dependence of mutations: a linkage of formalisms.</a> <em>PLOS Computational Biology</em> (2016).</li>
                        <li id="ref-3" className="scroll-mt-24">Faure, A. J. et al. <a href="https://doi.org/10.1371/journal.pcbi.1012132" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">An extension of the Walsh-Hadamard transform to calculate and model epistasis in genetic landscapes of arbitrary shape and complexity.</a> <em>PLOS Computational Biology</em> (2024).</li>
                        <li id="ref-4" className="scroll-mt-24">Lin, Z. et al. <a href="https://doi.org/10.1126/science.ade2574" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Evolutionary-scale prediction of atomic-level protein structure with a language model.</a> <em>Science</em> (2023).</li>
                        <li id="ref-5" className="scroll-mt-24">Wu, N. C. et al. <a href="https://elifesciences.org/articles/16965" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Adaptation in protein fitness landscapes is facilitated by indirect paths.</a> <em>eLife</em> (2016).</li>
                        <li id="ref-6" className="scroll-mt-24">Johnston, K. E. et al. <a href="https://doi.org/10.1073/pnas.2400439121" target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">A combinatorially complete epistatic fitness landscape in an enzyme active site.</a> <em>PNAS</em> (2024).</li>
                        <li id="ref-7" className="scroll-mt-24"><a href={`${REPO}/blob/main/docs/VALIDATION.md`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Frozen validation protocol</a>, <a href={`${REPO}/blob/main/docs/AUDIT_REMEDIATION_20260728.md`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">audit remediation notes</a>, <a href={`${REPO}/blob/main/docs/LIMITATIONS.md`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">limitations</a>, and <a href={`${REPO}/blob/main/artifacts/structural_allocation_650m.json`} target="_blank" rel="noopener noreferrer" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">tracked evidence artifact</a>.</li>
                    </ol>
                </section>
            </div>

            <AuthorBio readNext={[
                { to: EXPLAINER, label: 'Epistasis Explained: Why the Best Protein Variant Is Not Always the Best Experiment' },
                { to: '/projects/epibudget', label: 'epibudget: experimental design for protein epistasis' },
                { to: '/journal/ai-for-science-is-becoming-a-systems-problem', label: 'AI for Science Is Moving From Prediction to Closed-Loop Research Systems' },
                { to: '/projects/scientific-claim-verifier', label: 'Scientific Claim Verifier: open-source claim-to-source verification' },
            ]} />
        </ArticleLayout>
    );
};

export default WhatShouldWeMeasureNext;
