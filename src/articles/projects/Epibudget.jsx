import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';
import { AUTHOR } from '../../components/jsonld';

const REPO = 'https://github.com/VivienP/epistasis-budget';
const ARTICLE = '/blog/designing-protein-experiments-for-epistasis';

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
                    A Python tool for choosing protein variants that expose mutation interactions when every experimental measurement has to earn its place.
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

            <figure className="mb-16 -mx-6 md:mx-0 overflow-hidden md:rounded-lg border-y md:border border-border-subtle bg-cream">
                <img
                    src="/epibudget/workflow.webp"
                    alt="epibudget workflow: score complete protein variants jointly, build an epistasis graph, and return a ranked experimental shortlist"
                    width="2048"
                    height="900"
                    className="w-full h-auto"
                />
                <figcaption className="px-5 py-3 text-sm text-secondary border-t border-border-subtle">
                    epibudget ranks a shortlist of <em>B</em> variants by the interaction structure their measurements would expose.
                </figcaption>
            </figure>

            <div className="text-primary max-w-none space-y-12 font-light leading-relaxed">
                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">The problem</h2>
                    <p>
                        A protein language model can rank thousands of mutations before a lab measures one. But the variants it calls fittest are not the measurements that reveal how mutations interact. Under a plate budget of 48, 96, or 192 wells, that gap decides whether an experiment returns a cluster of predicted winners or a dataset that constrains an epistasis map.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">What I built</h2>
                    <ul className="list-disc pl-6 space-y-3 marker:text-secondary">
                        <li><strong>Conjoint ESM-2 scoring</strong> applies every mutation before reading conditional scores, preserving context-dependent interaction signal.</li>
                        <li><strong>An interaction graph</strong> represents the pairwise and third-order loops that candidate measurements help close.</li>
                        <li><strong>A label-blind allocator</strong> ranks variants by loop count before any measured fitness enters the pipeline.</li>
                    </ul>
                    <p>
                        Loop count, predicted fitness, and ESM masking dispersion stay separate strategies, so each contribution can be tested on its own. In the historical code and artifacts, the loop-count baseline is named <code>structural</code>; the label points at interaction structure, not protein 3D structure.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl font-normal text-primary pb-2 border-b border-border-subtle">Current evidence boundary</h2>
                    <p>
                        On TrpB, <code>info</code> beats fitness and random for pairwise map recovery. The loop-count baseline overtakes <code>info</code> at budgets 96 and 192, though not at 48, so the result does not support an added benefit from ESM masking dispersion.
                    </p>
                    <p>
                        In the registered downstream benchmark, loop-count selection beats fitness-greedy in 20/20 partitions on both GB1 and TrpB. The masking-dispersion gate does not pass on either landscape.
                    </p>
                    <p>
                        All comparative results remain provisional. GB1 map-recovery remains <code>inconclusive_zero_gpu</code>, and the TrpB source mirror contains 871 imputed fitness values that are not identified row by row. No claim is made beyond these landscapes and the fixed downstream learner.
                    </p>
                </section>

                <div className="pt-2 flex flex-wrap gap-3">
                    <Link to={ARTICLE} className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>Read the full experiment</span>
                        <ArrowRight size={14} />
                    </Link>
                    <a href={`${REPO}/blob/main/docs/VALIDATION.md`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>Inspect the validation protocol</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </article>
    );
};

export default Epibudget;
