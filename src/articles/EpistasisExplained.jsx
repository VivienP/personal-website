import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ArticleSEO from '../components/ArticleSEO';
import ArticleByline from '../components/ArticleByline';
import AuthorBio from '../components/AuthorBio';
import MathBlock from '../components/MathBlock';
import BudgetScaleDiagram from '../components/epibudget/BudgetScaleDiagram';
import MeasurementSquareDiagram from '../components/epibudget/MeasurementSquareDiagram';
import SelectionPipelineDiagram from '../components/epibudget/SelectionPipelineDiagram';

const REPO = 'https://github.com/VivienP/epistasis-budget';
const TECHNICAL_NOTE = '/journal/designing-protein-experiments-for-epistasis';
const PROJECT = '/projects/epibudget';

const SLUG = 'epistasis-explained-best-variant-vs-best-experiment';
const TITLE = 'Epistasis Explained: Why the Best Protein Variant Is Not Always the Best Experiment';

const EpistasisExplained = () => {
    return (
        <ArticleLayout backTo="/journal" backLabel="Journal">
            <ArticleSEO
                slug={SLUG}
                title="Epistasis Explained: From Protein Prediction to Experimental Design | Vivien Perrelle"
                description="A visual introduction to protein epistasis, experimental budgets, and the question behind epibudget: which variants should we measure to learn how mutations interact?"
                image="/epibudget/workflow.webp"
                imageWidth={2048}
                imageHeight={900}
                section="AI for Science"
                jsonLd={{
                    description: 'A visual introduction to protein epistasis and experimental design: why the variant a model ranks first is not always the measurement that teaches the most.',
                    about: {
                        '@type': 'SoftwareSourceCode',
                        name: 'epibudget',
                        url: 'https://vivienperrelle.com/projects/epibudget',
                        codeRepository: REPO,
                    },
                    keywords: 'epistasis, protein engineering, experimental design, ESM-2, measurement budget, AI for science',
                }}
            />

            <header className="mb-12 space-y-4">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="font-mono text-xs text-secondary tracking-widest uppercase">Primer · No protein-ML background needed · AI for Science</span>
                </div>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    {TITLE}
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    Protein models can rank thousands of variants. Experimental design asks a different question:
                    which measurements will teach us the most?
                </p>
                <ArticleByline slug={SLUG} />
            </header>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-12 font-light">
                <section className="space-y-6">
                    <p>
                        A protein language model can rank thousands of variants before anyone enters the lab. That
                        sounds like the hard part is solved: score every candidate, select the predicted winners, and
                        test them.
                    </p>
                    <p>But this only answers:</p>
                    <blockquote className="not-prose border-l-2 border-accent pl-6 text-lg md:text-xl font-serif italic text-primary">
                        <p>Which variants does the model expect to work best?</p>
                    </blockquote>
                    <p>A scientist may need to answer a different question:</p>
                    <blockquote className="not-prose border-l-2 border-accent pl-6 text-lg md:text-xl font-serif italic text-primary">
                        <p>Which variants should we measure if we want to understand how mutations interact?</p>
                    </blockquote>
                    <p>
                        The best predicted variant and the best experiment are not necessarily the same. This
                        distinction is the idea behind{' '}
                        <Link to={PROJECT} className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">epibudget</Link>,
                        an open-source project I built to explore protein experimental design under a fixed
                        measurement budget.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">1. The experiment is much smaller than the search space</h2>
                    <p>
                        Imagine that a protein study varies four positions. At each position, the original amino acid
                        can be replaced by any of the other 19 standard amino acids.
                    </p>
                    <p>If we consider all single, double and triple mutants, the candidate set contains:</p>
                    <ul className="m-0 list-disc space-y-2 pl-6 text-base leading-relaxed text-primary">
                        <li>76 single mutants;</li>
                        <li>2,166 double mutants;</li>
                        <li>27,436 triple mutants;</li>
                        <li>29,678 candidates in total.</li>
                    </ul>
                    <p>Now suppose the laboratory can measure only 96 variants.</p>
                    <p>
                        That plate covers about 0.3% of the candidate set. The main problem is no longer generating
                        candidates. It is deciding which 96 measurements deserve to exist.
                    </p>
                    <p>
                        This is an experimental-design problem: how should a scarce measurement budget be allocated to
                        answer a scientific question?
                    </p>
                    <BudgetScaleDiagram
                        number="1"
                        title="96 wells against 29,678 candidates"
                        description="A four-site design generates 29,678 single, double and triple mutants. A 96-well plate measures about 0.3% of them, so the scarce resource is the measurement, not the candidate."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">2. Mutation effects do not always add up</h2>
                    <p>
                        Suppose mutation <strong>A</strong> improves a measured protein property by <code>+0.2</code>,
                        while mutation <strong>B</strong> improves it by <code>+0.1</code>.
                    </p>
                    <p>
                        If the mutations act independently, we expect the double mutant <strong>AB</strong> to improve
                        the property by <code>+0.2 + 0.1 = +0.3</code>.
                    </p>
                    <p>
                        But imagine that the experiment measures <strong>AB</strong> at <code>+0.8</code>.
                    </p>
                    <p>
                        The extra <code>+0.5</code> means that the effect of A depends on whether B is present, and
                        vice versa. This non-additive interaction is called <strong>epistasis</strong>.
                    </p>
                    <p>For two mutations, relative to the reference protein:</p>
                    <MathBlock label="epsilon of A and B equals delta of A B minus delta of A minus delta of B">
                        ε(A,B) = Δ(AB) − Δ(A) − Δ(B)
                    </MathBlock>
                    <p>
                        In our example, <code>ε(A,B) = 0.8 − 0.2 − 0.1 = 0.5</code>.
                    </p>
                    <p>
                        Epistasis matters because a mutation cannot always be assigned one fixed effect. Its effect can
                        change with its genetic background.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">3. Measuring AB alone does not reveal the interaction</h2>
                    <p>If we measure only the double mutant AB, we observe one number. That number may contain:</p>
                    <ul className="m-0 list-disc space-y-2 pl-6 text-base leading-relaxed text-primary">
                        <li>the effect of A;</li>
                        <li>the effect of B;</li>
                        <li>the interaction between A and B;</li>
                        <li>experimental noise.</li>
                    </ul>
                    <p>One observation cannot tell us how much came from each component.</p>
                    <p>
                        To isolate the pairwise interaction directly, we need the related family of measurements: the
                        reference protein, A, B and AB.
                    </p>
                    <p>
                        The same principle becomes more demanding for three mutations. Isolating an irreducible
                        three-way interaction requires accounting for the reference, all three singles, all three
                        doubles and the triple.
                    </p>
                    <p>
                        Protein variants are therefore not just independent candidates in a list. They form a{' '}
                        <strong>measurement network</strong>. One measured variant can contribute to several
                        interaction calculations, while another may answer a much narrower question.
                    </p>
                    <MeasurementSquareDiagram
                        number="2"
                        title="The pairwise measurement square"
                        description="AB measured on its own is a single mixed observation. Measuring the reference protein, A, B and AB makes the interaction term calculable by subtraction."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">4. A good prediction is not automatically a good experiment</h2>
                    <p>Consider two ways to fill a 96-well plate.</p>

                    <h3 className="text-lg md:text-xl font-normal text-primary pt-2">Strategy A: test the predicted winners</h3>
                    <p>
                        A protein model ranks the variants by predicted fitness, and the experiment measures the top 96.
                    </p>
                    <p>
                        This is a sensible exploitation strategy when the goal is to find a strong candidate quickly.
                        But the selected variants may cluster in one small region of sequence space or omit the
                        lower-order variants needed to interpret combinations.
                    </p>

                    <h3 className="text-lg md:text-xl font-normal text-primary pt-2">Strategy B: choose measurements for what they can teach us</h3>
                    <p>
                        The experiment instead prioritizes variants according to how they contribute to the interaction
                        structure we want to study.
                    </p>
                    <p>
                        Some of these variants may not look like likely winners. Their value comes from constraining or
                        connecting multiple relationships in the landscape.
                    </p>
                    <p>Neither strategy is universally better. They optimize different objectives:</p>
                    <div className="not-prose overflow-x-auto">
                        <table className="w-full min-w-[28rem] border-collapse text-base text-primary">
                            <thead>
                                <tr className="border-b border-border-subtle text-left">
                                    <th scope="col" className="py-3 pr-6 font-medium">Objective</th>
                                    <th scope="col" className="py-3 font-medium">Primary question</th>
                                </tr>
                            </thead>
                            <tbody className="align-top">
                                <tr className="border-b border-border-subtle">
                                    <td className="py-3 pr-6">Fitness optimization</td>
                                    <td className="py-3">Which candidate is most likely to perform well?</td>
                                </tr>
                                <tr>
                                    <td className="py-3 pr-6">Experimental design</td>
                                    <td className="py-3">Which measurement is most useful for learning the landscape?</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>The scientific objective must be chosen before the plate is designed.</p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">5. What epibudget actually does</h2>
                    <p>
                        epibudget is a Python command-line tool that ranks protein variants under a fixed budget.
                    </p>
                    <p>
                        Its evaluated baseline, called <code>structural</code>, assigns each candidate a score based on
                        the number of interaction terms in which it appears. Here, &ldquo;structural&rdquo; refers to
                        the structure of the <strong>interaction graph</strong>, not the protein&apos;s
                        three-dimensional structure.
                    </p>
                    <p>
                        On the symmetric four-site benchmarks used in the project, this score gives the same value to
                        every variant of the same mutation order. It therefore reduces to:
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li>single mutants first;</li>
                        <li>double mutants second;</li>
                        <li>triple mutants third;</li>
                        <li>a declared random seed to break ties within each group.</li>
                    </ol>
                    <p>
                        This is a useful baseline because lower-order measurements are reused across many interaction
                        terms. But an important limitation emerged during the audit: the score rewards participation in
                        interaction terms <strong>additively</strong>. It does not explicitly reward completing a
                        measurement family, and it does not by itself guarantee that any interaction becomes
                        identifiable.
                    </p>
                    <p>That distinction is fundamental:</p>
                    <blockquote className="not-prose border-l-2 border-accent pl-6 text-lg md:text-xl font-serif italic text-primary">
                        <p>Appearing in many equations is not the same as providing enough independent measurements to solve those equations.</p>
                    </blockquote>
                    <p>
                        epibudget therefore selects measurements; it is not an epistasis-inference package, and its
                        baseline should not be described as automatically reconstructing an interaction map.
                    </p>
                    <SelectionPipelineDiagram
                        number="3"
                        title="The epibudget pipeline, with selection separated from label revelation"
                        description="Candidates are scored and a plate is selected without any access to measured fitness. Labels are revealed only afterwards, when the same downstream learner is trained on each plate and evaluated on held-out variants."
                    />
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">6. Where ESM-2 enters the project</h2>
                    <p>
                        ESM-2 is a protein language model. Like a text model that learns which words are plausible in a
                        sentence, it learns which amino acids are plausible in a protein sequence.
                    </p>
                    <p>epibudget explored two ESM-2 signals.</p>

                    <h3 className="text-lg md:text-xl font-normal text-primary pt-2">Conjoint variant scoring</h3>
                    <p>
                        If A and B are each scored on the unchanged reference sequence and their scores are simply
                        added, the prediction is additive by construction. It cannot express predicted pairwise
                        epistasis.
                    </p>
                    <p>
                        epibudget instead applies all mutations in a candidate before reading their conditional scores.
                        In AB, A is scored while B is already present, and B is scored while A is present. This
                        preserves the possibility of context-dependent, non-additive model signal.
                    </p>

                    <h3 className="text-lg md:text-xl font-normal text-primary pt-2">Masking dispersion</h3>
                    <p>
                        The project also repeatedly masked parts of the surrounding sequence and rescored each
                        candidate. If a candidate&apos;s score changed substantially across perturbations, it received a
                        high dispersion value, written as <code>τ²(v)</code>.
                    </p>
                    <p>
                        The experimental hypothesis was that this sensitivity might help prioritize informative
                        measurements:
                    </p>
                    <MathBlock label="information score of variant v equals the interaction count of v multiplied by the masking dispersion of v">
                        score<sub>info</sub>(v) = n(v) × τ²(v)
                    </MathBlock>
                    <p>
                        where <code>n(v)</code> is the interaction-count score.
                    </p>
                    <p>
                        But masking dispersion is not calibrated predictive uncertainty. A model can be sensitive to
                        artificial masking and still be correct, or remain stable and still be wrong. The relationship
                        had to be tested rather than assumed.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">7. How to compare selection strategies fairly</h2>
                    <p>The benchmark separates two stages.</p>
                    <p>
                        First, each strategy selects its plate without access to experimental fitness labels. This
                        prevents a method from using the answers it is supposed to predict.
                    </p>
                    <p>
                        Only after selection are the measured fitness values revealed. The same downstream learner is
                        then trained from each plate and evaluated on held-out variants.
                    </p>
                    <p>For a fair comparison, the following stay fixed:</p>
                    <ul className="m-0 list-disc space-y-2 pl-6 text-base leading-relaxed text-primary">
                        <li>the measurement budget;</li>
                        <li>the candidate universe;</li>
                        <li>the downstream model;</li>
                        <li>the train/test partitions;</li>
                        <li>the metrics.</li>
                    </ul>
                    <p>Only the plate-selection strategy changes.</p>
                    <p>
                        This design asks a clean question: <strong>at equal cost and with the same learner, which
                        selected measurements lead to better downstream predictions?</strong>
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">8. What the project found — and what it did not</h2>
                    <p>
                        The historical downstream v1 artifacts favored the particular loop-count plates over
                        fitness-greedy plates on GB1 and TrpB. The masking-dispersion weighting did not pass its
                        incremental gate on either landscape.
                    </p>
                    <p>
                        These observations are encouraging for the value of a simple measurement-structure baseline, but
                        they are not promoted estimates of the acquisition method as a whole. The loop-count rule
                        contains many ties, and the tracked runs did not evaluate performance across a distribution of
                        tie-breaking seeds.
                    </p>
                    <p>
                        The project also produced an important correction. An earlier analysis interpreted a correlation
                        between predicted and measured epistasis contrasts as map recovery. A later audit showed that
                        both sides of the comparison shared measured lower-order terms. Correlation could therefore
                        improve partly because the same experimental values appeared on both sides, even if prediction
                        of the unmeasured terms did not improve.
                    </p>
                    <p>
                        That interpretation is now withdrawn. The old correlation remains a diagnostic, not evidence
                        that epibudget reconstructed an epistasis map.
                    </p>
                    <p>The defensible conclusions are narrower:</p>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li>predicted fitness and experimental value are different objectives;</li>
                        <li>conjoint scoring can retain context-dependent model signal;</li>
                        <li>interaction-count allocation is a useful and reproducible baseline;</li>
                        <li>masking dispersion did not demonstrate added value in the tested v1 procedure;</li>
                        <li>identifiability and metric design are as important as model sophistication.</li>
                    </ol>
                    <p>
                        Reporting the correction is part of the result. In scientific software, discovering that an
                        appealing metric does not support the claimed interpretation is useful evidence, not a reason to
                        hide the experiment.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">9. The limits define the next experiment</h2>
                    <p>epibudget is an early, static design study. Its evidence is limited by:</p>
                    <ul className="m-0 list-disc space-y-2 pl-6 text-base leading-relaxed text-primary">
                        <li>two four-site protein landscapes;</li>
                        <li>one fixed downstream learner;</li>
                        <li>plates selected in a single batch;</li>
                        <li>uncalibrated masking dispersion;</li>
                        <li>unresolved selection variability across tie seeds;</li>
                        <li>no tracked corrected map-recovery artifact.</li>
                    </ul>
                    <p>A stronger future system would select experiments sequentially:</p>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li>choose a first batch;</li>
                        <li>measure it;</li>
                        <li>update the model and its uncertainty;</li>
                        <li>estimate which remaining measurement would reduce uncertainty most;</li>
                        <li>choose the next batch.</li>
                    </ol>
                    <p>
                        This would turn a static ranking into a true closed loop between prediction and experiment.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">10. The larger lesson for AI for Science</h2>
                    <p>AI makes candidate generation and prediction cheaper. Laboratory measurements remain expensive.</p>
                    <p>
                        That shifts the bottleneck. The question is no longer only whether a model can score a large
                        search space. It is whether a system can decide which evidence is worth producing.
                    </p>
                    <p>Three quantities should remain separate:</p>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary">
                        <li><strong>Predicted effect</strong> — how well the model expects a variant to perform.</li>
                        <li><strong>Predictive uncertainty</strong> — how wrong the model expects its prediction might be.</li>
                        <li><strong>Experimental value</strong> — how much measuring the variant would help answer the current scientific question.</li>
                    </ol>
                    <p>
                        epibudget does not solve that full problem. It makes the problem explicit, implements testable
                        baselines, and shows how easily an attractive scientific claim can outrun what an evaluation
                        truly identifies.
                    </p>
                    <p>
                        The best next experiment is not always the candidate the model likes most. It is the measurement
                        that changes what we can justifiably know.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Go deeper</h2>
                    <div className="not-prose flex flex-col sm:flex-row flex-wrap gap-3">
                        <Link to={TECHNICAL_NOTE} className="inline-flex items-center justify-between sm:justify-start gap-2 px-5 py-3 border border-border-subtle hover:border-accent transition-colors text-sm text-primary">
                            <span>Read the technical research note</span>
                            <ArrowRight size={16} />
                        </Link>
                        <Link to={PROJECT} className="inline-flex items-center justify-between sm:justify-start gap-2 px-5 py-3 border border-border-subtle hover:border-accent transition-colors text-sm text-primary">
                            <span>Explore the epibudget project page</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                </section>
            </div>

            <AuthorBio readNext={[
                { to: TECHNICAL_NOTE, label: 'Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis' },
                { to: PROJECT, label: 'epibudget: experimental design for protein epistasis' },
                { to: '/journal/ai-for-science-is-becoming-a-systems-problem', label: 'AI for Science Is Moving From Prediction to Closed-Loop Research Systems' },
            ]} />
        </ArticleLayout>
    );
};

export default EpistasisExplained;
