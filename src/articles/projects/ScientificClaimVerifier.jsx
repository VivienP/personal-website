import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import SEO from '../../components/SEO';
import { AUTHOR } from '../../components/jsonld';
import AuthorBio from '../../components/AuthorBio';

const REPO = 'https://github.com/VivienP/scientific-claim-verification-engine';

const ScientificClaimVerifier = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-4xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="Scientific Claim Verifier: Deterministic Claim-to-Source Verification | Vivien Perrelle"
                description="An open-source Python engine that verifies each cited claim in scientific text against its actual source and returns a grounded verdict with full, replayable provenance. Built for an AI-saturated literature that needs verification, reproducibility, and traceability."
                url="/projects/scientific-claim-verifier"
                type="article"
                article={{ publishedTime: '2026-05-01', author: 'Vivien Perrelle', tags: ['Scientific Claim Verification', 'RAG', 'SciFact', 'Reproducibility', 'Provenance', 'LLM', 'Open Source'] }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "SoftwareSourceCode",
                    "name": "Scientific Claim Verification Engine",
                    "headline": "Scientific Claim Verifier: Deterministic Claim-to-Source Verification",
                    "description": "An open-source Python pipeline that decomposes scientific text into citation-anchored claims, resolves and fetches each cited source, and verifies entailment with full SHA-256 provenance. Built for reproducible, traceable verification of an AI-saturated scientific literature.",
                    "image": "https://vivienperrelle.com/me.png",
                    "datePublished": "2026-05-01",
                    "dateModified": "2026-05-01",
                    "codeRepository": REPO,
                    "programmingLanguage": "Python",
                    "license": "https://www.apache.org/licenses/LICENSE-2.0",
                    "author": AUTHOR,
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "keywords": "scientific claim verification, citation verification, claim-to-source grounding, SciFact, retrieval-augmented verification, RAG, natural language inference, BM25, provenance, reproducibility, audit trail, LLM hallucination detection, Claude, CrossRef, OpenAlex, PubMed, Europe PMC, Unpaywall, MCP server, IMRAD chunking",
                    "url": "https://vivienperrelle.com/projects/scientific-claim-verifier"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-4">
                <span className="font-mono text-xs text-secondary tracking-widest uppercase">Open Source · AI for Science</span>
                <h1 className="text-4xl md:text-5xl text-primary leading-tight font-serif italic">
                    Scientific Claim Verifier
                </h1>
                <p className="text-lg text-secondary font-light max-w-2xl">
                    An open-source engine that verifies each cited claim in scientific text against its actual source and returns a grounded verdict with replayable provenance.
                </p>
                <div className="pt-2 flex">
                    <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>View on GitHub</span>
                        <ExternalLink size={14} />
                    </a>
                </div>
            </header>

            <div className="text-primary max-w-none space-y-12 font-light leading-relaxed">

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Why I built it</h2>
                    <p className="text-base">
                        AI now generates hypotheses, molecules, literature reviews, and entire papers far faster than humans can check them. As that volume explodes, the bottleneck shifts from <em>producing</em> scientific content to <em>verifying</em> it. We need a way to confirm that scientific claims actually hold against their sources — and to make that confirmation reproducible and traceable.
                    </p>
                    <p>
                        This engine is my attempt at that missing assurance layer: independent, deterministic, traceable claim-to-source verification for an AI-saturated literature. It is the first open-source piece of the verification infrastructure I am building.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">How it works</h2>
                    <p>
                        Free-form scientific text is decomposed into citation-anchored claims by Claude. Each cited source is resolved through an API cascade (bibliography DOI → CrossRef → OpenAlex → PubMed) and its full text fetched (open-access URL → PMC → Europe PMC → Unpaywall PDF). The text is split into IMRAD-aware chunks, and the most relevant passages are selected by lexical <strong>BM25</strong> under a token budget. A router then picks one of five verifier modes by retrieval depth, and entailment is judged by prompting Claude — no dedicated NLI model, no embeddings.
                    </p>
                    <p>
                        The design choice that matters most: everything that does not strictly need a model stays <strong>LLM-free and deterministic</strong> — chunk selection, numeric consistency checks, and aggregation — so the same input yields the same verdict. Every step emits a provenance record with input/output SHA-256 hashes, model id, and token counts, producing a fully replayable audit chain.
                    </p>
                    <ol className="list-decimal pl-6 space-y-2 text-base marker:text-secondary marker:font-mono">
                        <li>Extract citation-anchored claims (Claude).</li>
                        <li>Resolve citations via a multi-source cascade (DOI, CrossRef, OpenAlex, PubMed).</li>
                        <li>Enrich metadata (PubMed, Europe PMC open-access discovery).</li>
                        <li>Fetch full text (OA URL, PMC, Europe PMC, Unpaywall PDF).</li>
                        <li>Chunk and BM25-select passages (deterministic IMRAD sectioning, token-budgeted).</li>
                        <li>Verify: a router selects one of five modes by retrieval depth.</li>
                        <li>Audit-trail fallback: surface the searched passages when no quote is found.</li>
                        <li>Deterministic numeric checks in pure Python (OR/CI consistency, p-value/CI null-crossing).</li>
                        <li>Emit <code className="font-mono text-sm">report.json</code> + <code className="font-mono text-sm">provenance.jsonl</code>.</li>
                    </ol>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Results</h2>
                    <p>
                        On the <strong>SciFact</strong> dev set, the verifier reaches an <strong>F1 of 0.92</strong> on oracle inputs (3-class), against <strong>0.62</strong> for a naive direct-LLM baseline committed in the repo: roughly a 30-point gap on this verifier-only setup. A regression guard fails the build if SciFact F1 drops more than 1% below the committed baseline.
                    </p>
                    <p className="text-sm text-secondary italic">
                        Benchmark numbers are author-reported, self-run, and committed to the repository. The SciFact figure is verifier-only (oracle inputs), not the full extract-and-resolve pipeline.
                    </p>
                </section>

                <section className="space-y-6">
                    <h2 className="text-2xl md:text-3xl font-normal text-primary pt-4 pb-2 border-b border-border-subtle">Stack</h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            'Python 3.12+', 'Claude (Anthropic SDK)', 'rank-bm25', 'tiktoken',
                            'pymupdf', 'httpx', 'structlog', 'FastAPI service', 'MCP server',
                            'CrossRef / OpenAlex / PubMed', 'Europe PMC / Unpaywall', 'mypy --strict · ruff · pytest'
                        ].map(tech => (
                            <span key={tech} className="px-3 py-1 border border-border-subtle text-xs font-mono text-secondary">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm text-secondary">
                        Apache 2.0 licensed. Runs as a CLI, a FastAPI HTTP service, or an MCP server for Claude Desktop and the Agent SDK.
                    </p>
                </section>

                <footer className="pt-8 border-t border-border-subtle flex flex-wrap items-center gap-4">
                    <a href={REPO} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 px-4 py-2 border border-border-subtle hover:border-accent transition-colors text-sm">
                        <span>View on GitHub</span>
                        <ExternalLink size={14} />
                    </a>
                    <span className="text-sm text-secondary">
                        Part of the verification infrastructure explored in <Link to="/journal/science-is-entering-its-agentic-era" className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors">Science Is Entering Its Agentic Era</Link>.
                    </span>
                </footer>

            </div>

            <AuthorBio readNext={[
                { to: '/journal/ai-for-science-is-becoming-a-systems-problem', label: 'AI for Science Is Moving From Prediction to Closed-Loop Research Systems' },
                { to: '/journal/science-is-entering-its-agentic-era', label: 'Science Is Entering Its Agentic Era' },
                { to: '/journal/regulators-dont-accept-vibes', label: "Regulators Don't Accept Vibes: The Two Layers Pharma AI Is Missing" },
            ]} />
        </article>
    );
};

export default ScientificClaimVerifier;
