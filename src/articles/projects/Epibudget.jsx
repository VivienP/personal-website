import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';
import { AUTHOR } from '../../components/jsonld';

const REPO = 'https://github.com/VivienP/epistasis-budget';
const ARTICLE = '/journal/designing-protein-experiments-for-epistasis';

const Epibudget = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="epibudget: Experimental Design for Protein Epistasis | Vivien Perrelle"
                description="An open-source Python tool that spends a fixed experimental budget on the protein variants that expose interaction structure, not only the ones predicted to be fit."
                url="/projects/epibudget"
                image="/epibudget/workflow.webp"
                imageWidth={2048}
                imageHeight={900}
                type="article"
                article={{ publishedTime: '2026-07-23', author: 'Vivien Perrelle', tags: ['Protein Engineering', 'Epistasis', 'Experimental Design', 'ESM-2', 'Open Source'] }}
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'SoftwareSourceCode',
                    name: 'epibudget',
                    headline: 'epibudget: Experimental Design for Protein Epistasis',
                    description: 'An open-source Python CLI that ranks protein variants by the interaction loops they cover under a fixed experimental budget.',
                    image: 'https://vivienperrelle.com/epibudget/workflow.webp',
                    datePublished: '2026-07-23',
                    dateModified: '2026-07-23',
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

            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Open Source · AI for Science · Experimental Design</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">epibudget</h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    A Python CLI for ranking protein variants that expose mutation interactions under a fixed experimental budget.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                    <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>View on GitHub</span>
                        <ExternalLink size={14} />
                    </a>
                    <Link to={ARTICLE} className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>Read the research story</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
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
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The scientific problem</h2>
                    <p>
                        A protein language model can rank thousands of variants before any wet-lab measurement. Yet the variants with the highest predicted fitness are not necessarily those that best reveal interactions among mutations. Under a budget of <code>48</code>, <code>96</code>, or <code>192</code> wells, that distinction determines whether an experiment concentrates on predicted winners or samples variants that constrain an epistasis map.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Method</h2>
                    <p>
                        <code>epibudget</code> selects measurements; it is neither a fitness optimizer nor an epistasis-inference package. Given a wild-type sequence, candidate positions, a budget <code>B</code>, and an ESM-2 checkpoint, it returns an ordered list of <code>B</code> single-, double-, and triple-mutant variants.
                    </p>
                    <ul className="list-disc pl-6 space-y-3 marker:text-secondary">
                        <li><strong>Conjoint ESM-2 scoring</strong> applies every mutation in a variant before computing conditional scores, preserving context-dependent interaction signal.</li>
                        <li><strong>Factor-graph construction</strong> represents WT-referenced pairwise and third-order inclusion–exclusion loops.</li>
                        <li><strong>Label-blind allocation</strong> ranks candidates before measured fitness enters the pipeline: <code>structural</code> uses loop coverage alone, whereas <code>info</code> weights that coverage by ESM masking dispersion.</li>
                    </ul>
                    <p>
                        Loop coverage, masking dispersion, and predicted fitness remain separable signals, allowing their contributions to be evaluated independently.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Validation design</h2>
                    <p>
                        Selection remains label-blind: measured fitness is revealed only after the selected identities are fixed. The registered benchmark compares five methods—<code>info</code>, <code>fitness</code>, <code>random</code>, <code>practice</code>, and <code>structural</code>—at budgets <code>48</code>, <code>96</code>, and <code>192</code> on GB1 and TrpB.
                    </p>
                    <p>
                        Map recovery reports pairwise and third-order correlations separately. A separate downstream benchmark fits the same pairwise-ridge learner to each selected plate and evaluates held-out double and triple mutants.
                    </p>
                    <p>
                        The absence of intervals is a data-availability constraint: the public TrpB artifact does not include pointwise confidence intervals.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Current findings</h2>
                    <p>
                        On TrpB, <code>info</code> meets the registered pairwise map-recovery rule relative to <code>fitness</code> and <code>random</code>. The <code>structural</code> loop-count baseline yields higher Pearson and Spearman estimates at budgets <code>96</code> and <code>192</code>, though not at <code>48</code>; the registered results therefore do not support an incremental contribution from masking dispersion.
                    </p>
                    <p>
                        In the registered downstream benchmark, <code>structural</code> outperforms <code>fitness</code> in 20/20 partitions on both GB1 and TrpB. The <code>info</code>-versus-<code>structural</code> gate does not pass on either landscape.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Limitations and status</h2>
                    <p>
                        All comparative results remain provisional. GB1 map recovery remains <code>inconclusive_zero_gpu</code> with <code>public_claim_eligible=false</code>, and the TrpB source mirror contains <code>871</code> imputed fitness values that are not identified row by row. No general claim is made beyond these two landscapes and the fixed downstream learner.
                    </p>
                </section>

                <div className="pt-2 flex flex-wrap gap-3">
                    <Link to={ARTICLE} className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>Read the full scientific analysis</span>
                        <ArrowRight size={14} />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default Epibudget;
