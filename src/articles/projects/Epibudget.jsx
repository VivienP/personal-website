import React from 'react';
import ArticleLayout from '../../components/ArticleLayout';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';
import { AUTHOR } from '../../components/jsonld';

const REPO = 'https://github.com/VivienP/epistasis-budget';
const ARTICLE = '/journal/designing-protein-experiments-for-epistasis';

const EVIDENCE_STATUS = [
    {
        status: 'Supported mechanism',
        statement: 'Conjoint scoring preserves the possibility of context-dependent, non-additive ESM-2 signal.',
    },
    {
        status: 'Historical observation',
        statement: 'Particular v1 loop-count plates outperformed fitness-greedy plates downstream; robustness across tie seeds was not estimated.',
    },
    {
        status: 'Not demonstrated / withdrawn',
        statement: 'Masking dispersion did not pass its incremental gate; the earlier map-recovery interpretation is withdrawn.',
    },
];

const Epibudget = () => {
    return (
        <ArticleLayout backTo="/" backLabel="Back">
            <SEO
                title="epibudget: Experimental Design for Protein Epistasis | Vivien Perrelle"
                description="An open-source Python tool that spends a fixed experimental budget on the protein variants that expose interaction structure, not only the ones predicted to be fit."
                url="/projects/epibudget"
                image="/epibudget/workflow.webp"
                imageWidth={2048}
                imageHeight={900}
                type="article"
                article={{ publishedTime: '2026-07-23', modifiedTime: '2026-08-13', author: 'Vivien Perrelle', tags: ['Protein Engineering', 'Epistasis', 'Experimental Design', 'ESM-2', 'Open Source'] }}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'SoftwareSourceCode',
                    name: 'epibudget',
                    headline: 'epibudget: Experimental Design for Protein Epistasis',
                    description: 'An open-source Python CLI that ranks protein variants by the interaction terms they appear in under a fixed experimental budget.',
                    image: 'https://vivienperrelle.com/epibudget/workflow.webp',
                    datePublished: '2026-07-23',
                    dateModified: '2026-08-13',
                    codeRepository: REPO,
                    programmingLanguage: 'Python',
                    runtimePlatform: 'Python 3.12+',
                    license: `${REPO}/blob/main/LICENSE`,
                    author: AUTHOR,
                    publisher: { '@type': 'Person', name: 'Vivien Perrelle' },
                    url: 'https://vivienperrelle.com/projects/epibudget',
                    subjectOf: {
                        '@type': 'BlogPosting',
                        name: 'Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis',
                        url: `https://vivienperrelle.com${ARTICLE}`,
                    },
                    keywords: 'protein engineering, epistasis, experimental design, ESM-2, active learning, open source',
                }}
            />

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Open source · Protein engineering · Experimental design</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Choosing which protein variants to measure when every experimental well counts
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    <code>epibudget</code> is a Python tool and evaluation study for budgeted protein experiments. It
                    separates predicted fitness from experimental value, compares label-blind plate-selection
                    strategies, and documents what the resulting evidence can, and cannot, support.
                </p>
            </header>

            <figure className="mb-16 -mx-6 md:mx-0">
                <img
                    src="/epibudget/map_recovery_trpb_vs_gb1.svg"
                    alt="Pairwise epistasis-map recovery across experimental budgets on TrpB and GB1, comparing loop-coverage, ESM-2-weighted, fitness-greedy, and random selection"
                    width="590.221875"
                    height="620"
                    className="block w-full h-auto"
                />
                <figcaption className="mt-4 mx-6 md:mx-0 space-y-1 text-base leading-relaxed text-primary">
                    <p className="font-semibold">Pairwise epistasis-map recovery under fixed experimental budgets for TrpB and GB1</p>
                    <p className="italic font-normal">For TrpB, <code>info</code> meets the registered pairwise map-recovery rule relative to <code>fitness</code> and <code>random</code>; the corrective GB1 analysis is inconclusive. <code>structural</code> denotes loop-coverage allocation. Point estimates only; y-axis scales differ by row.</p>
                </figcaption>
            </figure>

            <div className="text-primary max-w-none space-y-12 font-light leading-relaxed">
                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">The problem in one sentence</h2>
                    <p>
                        A four-site design generates <code>29,678</code> candidate variants and a plate measures{' '}
                        <code>96</code> of them, so the scarce resource is not the candidate but the measurement.
                    </p>
                    <p>
                        Under budgets of <code>48</code>, <code>96</code>, or <code>192</code> wells, that scarcity
                        decides whether an experiment concentrates on predicted winners or samples the variants that
                        constrain how mutations interact. <code>epibudget</code> selects measurements; it is neither a
                        fitness optimizer nor an epistasis-inference package.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">What was built</h2>
                    <p>
                        Given a wild-type sequence, candidate positions, a budget <code>B</code>, and an ESM-2
                        checkpoint, the CLI returns an ordered list of <code>B</code> single-, double-, and
                        triple-mutant variants.
                    </p>
                    <ul className="list-disc pl-6 space-y-3 marker:text-secondary">
                        <li><strong>Conjoint ESM-2 scoring</strong> applies every mutation in a variant before computing conditional scores, preserving context-dependent interaction signal.</li>
                        <li><strong>Interaction-graph construction</strong> represents WT-referenced pairwise and third-order inclusion–exclusion families.</li>
                        <li><strong>Label-blind allocation</strong> ranks candidates before measured fitness enters the pipeline: loop-count allocation (named <code>structural</code> in the artifacts) uses interaction-term coverage alone, whereas <code>info</code> weights that coverage by ESM masking dispersion.</li>
                        <li><strong>Downstream evaluation</strong> fits the same pairwise-ridge learner to each selected plate and scores held-out double and triple mutants.</li>
                    </ul>
                    <p>
                        Interaction-term coverage, masking dispersion, and predicted fitness remain separable signals,
                        allowing their contributions to be evaluated independently.
                    </p>
                </section>

                <figure className="space-y-4">
                    <img
                        src="/epibudget/workflow.webp"
                        alt="Workflow from a protein target and mutation budget through conjoint ESM-2 scoring and an interaction graph to a ranked experimental shortlist"
                        width="2048"
                        height="900"
                        className="block w-full h-auto border border-border-subtle rounded-lg bg-cream"
                        loading="lazy"
                    />
                    <figcaption className="space-y-1 text-base leading-relaxed text-primary">
                        <p className="font-semibold">From target protein to experimental plate</p>
                        <p className="italic font-normal">Candidates are scored and ranked without any access to measured fitness. A fixed budget then converts that ranking into the plate that will be measured.</p>
                    </figcaption>
                </figure>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Evidence status</h2>
                    <p>
                        The boundary below is what the tracked artifacts currently support. It is narrower than the
                        project&apos;s original framing, because an audit of the recovery metric showed that predicted
                        and measured epistasis contrasts shared the same purchased lower-order measurements.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[34rem] border-collapse text-base text-primary">
                            <thead>
                                <tr className="border-b border-border-subtle text-left">
                                    <th scope="col" className="py-3 pr-6 font-medium whitespace-nowrap">Status</th>
                                    <th scope="col" className="py-3 font-medium">Public statement</th>
                                </tr>
                            </thead>
                            <tbody className="align-top">
                                {EVIDENCE_STATUS.map(({ status, statement }) => (
                                    <tr key={status} className="border-b border-border-subtle last:border-b-0">
                                        <td className="py-3 pr-6">{status}</td>
                                        <td className="py-3">{statement}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p>
                        No tracked corrected-recovery artifact currently demonstrates positive error reduction, so the
                        project makes no public claim that any method reconstructed an epistasis map. The former
                        correlations are retained only as diagnostics.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Engineering highlights</h2>
                    <ul className="list-disc pl-6 space-y-3 marker:text-secondary">
                        <li><strong>Reproducible selection.</strong> A declared <code>tie_seed</code> fixes which of the many equally scored candidates enter a plate, separating the scoring rule from enumeration order.</li>
                        <li><strong>Gates registered before inspection.</strong> Success criteria are written down ahead of the final results, which is why the <code>info</code> versus loop-count comparison could be reported as a failed gate rather than quietly dropped.</li>
                        <li><strong>Artifact provenance.</strong> Results live in tracked JSON artifacts carrying their eligibility flags, so a claim on this page can be traced to the run that produced it.</li>
                        <li><strong>Limitations kept in the repository.</strong>{' '}
                            <a href={`${REPO}/blob/main/docs/LIMITATIONS.md`} target="_blank" rel="noopener noreferrer" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">LIMITATIONS.md</a>{' '}and the{' '}
                            <a href={`${REPO}/blob/main/docs/AUDIT_REMEDIATION_20260728.md`} target="_blank" rel="noopener noreferrer" className="border-b border-primary/40 hover:text-accent hover:border-accent transition-colors">audit remediation notes</a>{' '}
                            are the canonical record of what the evidence does not cover.
                        </li>
                    </ul>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Limitations and status</h2>
                    <p>
                        All comparative results remain provisional. GB1 map recovery remains{' '}
                        <code>inconclusive_zero_gpu</code> with <code>public_claim_eligible=false</code>, and the TrpB
                        source mirror contains <code>871</code> imputed fitness values that are not identified row by
                        row. The loop-count score is constant within a mutation order, and the tracked runs do not
                        sample tie seeds, so they do not estimate the acquisition method over its selection
                        distribution. No general claim is made beyond these two landscapes and the fixed downstream
                        learner.
                    </p>
                </section>

                <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3">
                    <Link to={ARTICLE} className="inline-flex items-center justify-between sm:justify-start gap-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>Read the technical analysis</span>
                        <ArrowRight size={14} />
                    </Link>
                    <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-between sm:justify-start gap-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>View on GitHub</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </ArticleLayout>
    );
};

export default Epibudget;
