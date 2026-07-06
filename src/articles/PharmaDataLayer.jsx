import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const PharmaDataLayer = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <article className="min-h-screen py-24 px-6 max-w-3xl mx-auto animate-in fade-in duration-700">
            <SEO
                title="It is a Knowledge Infrastructure Problem, Not a Model Problem | Vivien Perrelle"
                description="Pharma companies are replacing medical writers with AI. But the bottleneck isn't the LLM — it's the data standardization layer that nobody wants to build."
                url="/blog/pharma-data-layer"
                type="article"
                article={{ publishedTime: '2026-02-23', author: 'Vivien Perrelle' }}
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "Article",
                    "headline": "It is a Knowledge Infrastructure Problem, Not a Model Problem",
                    "datePublished": "2026-02-23",
                    "author": { "@type": "Person", "name": "Vivien Perrelle", "url": "https://vivienperrelle.com" },
                    "publisher": { "@type": "Person", "name": "Vivien Perrelle" },
                    "mainEntityOfPage": "https://vivienperrelle.com/blog/pharma-data-layer"
                }}
            />
            <Link to="/" className="inline-flex items-center space-x-2 text-sm text-secondary hover:text-primary transition-colors mb-12 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </Link>

            <header className="mb-12 space-y-6">
                <span className="font-mono text-sm text-secondary">2026-02-23</span>
                <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                    It is a Knowledge Infrastructure Problem, Not a Model Problem.
                </h1>
            </header>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-8 font-light">
                <h2 className="text-xl md:text-2xl pt-8 pb-2 font-normal text-primary">1. The Signal</h2>

                <p>
                    A major pharma company recently replaced a significant portion of its regulatory medical writing consultants with an on-premise Claude instance running a custom CSR model. They had been building this since 2020, failed once, then went live in 2024. Other companies now claim a <strong>90% man-hour reduction</strong> on Clinical Study Reports.
                </p>

                <p>
                    The ROI math is brutal: every day saved to market corresponds to <strong>$1-10M USD</strong> or more, especially if you are first. AI tools are simultaneously reducing the market for regulatory medical writers while making each remaining one more critical. An unstable situation, and full of opportunity.
                </p>

                <p>
                    The signal is clear. The shift is happening.
                </p>

                <h2 className="text-xl md:text-2xl pt-8 pb-2 font-normal text-primary">2. The Ceiling</h2>

                <p>
                    But talk to any power user and the same story emerges. Even with Gemini's 2 million token context window, the model conflates dates, hallucinates data points, and "forgets" information from earlier in the conversation. The <em>usable</em> context window is much smaller than advertised.
                </p>

                <p>
                    A Principal Medical Writer I spoke with uses AI daily on his own biohacking data—diet logs, biomarkers, time-series data. His experience: almost every third response from Gemini contains a timing error, conflates items across days, or outright fabricates something. And this is on <em>his own data</em>, where he can immediately catch the mistakes.
                </p>

                <p>
                    Now imagine that same failure mode on a 500-page Clinical Study Report destined for a regulatory submission. The stakes are not a wrong diet log entry. The stakes are patient safety and a $2B drug program.
                </p>

                <h2 className="text-xl md:text-2xl pt-8 pb-2 font-normal text-primary">3. The Wrong Diagnosis</h2>

                <p>
                    The common explanation is that this is a <strong>training data problem</strong>—that we need more regulatory documents to fine-tune on, or better templates to generate synthetic training data.
                </p>

                <p>
                    I disagree.
                </p>

                <p>
                    The hallucinations are not caused by insufficient training. They are caused by <strong>unstructured inputs hitting the context window</strong>. When you feed a model a messy PDF, a semi-structured CSR, or statistical output with inconsistent formatting, the model has no structural grounding. It does its best to infer relationships—and when the inference fails, it fabricates.
                </p>

                <p>
                    The biohacking example proves it perfectly: the data is <em>the user's own</em>, the model is state-of-the-art, the context window is enormous—and it still conflates Day 3 with Day 7. Not because the model is bad, but because the input data lacks the rigid structure the model needs to reason reliably.
                </p>

                <h2 className="text-xl md:text-2xl pt-8 pb-2 font-normal text-primary">4. The Standardization Layer</h2>

                <p>
                    What is actually needed is a dedicated <strong>Data Standardization Layer</strong>—a preprocessing step that cleans, structures, and validates inputs <em>before</em> they reach the LLM. Not prompt engineering. Not fine-tuning. Infrastructure.
                </p>

                <ul className="list-none space-y-4 pl-0">
                    <li className="flex items-start gap-4">
                        <span className="text-accent mt-1">•</span>
                        <span><strong>Structured extraction:</strong> Converting messy PDFs and CSRs into machine-readable, validated schemas before the model ever sees them.</span>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="text-accent mt-1">•</span>
                        <span><strong>FAIR principles:</strong> Making data Findable, Accessible, Interoperable, and Reusable—not as an academic ideal, but as a hard technical requirement for reliable AI output.</span>
                    </li>
                    <li className="flex items-start gap-4">
                        <span className="text-accent mt-1">•</span>
                        <span><strong>Validation gates:</strong> Catching inconsistencies at the data layer, not at the output layer where they become hallucinations.</span>
                    </li>
                </ul>

                <p>
                    This is the unglamorous work that nobody wants to fund. It is easier to demo a chatbot writing a CSR summary than to build the plumbing that makes that summary trustworthy. But without the plumbing, you are building on sand.
                </p>

                <h2 className="text-xl md:text-2xl pt-8 pb-2 font-normal text-primary">Bottom Line</h2>

                <p>
                    The model works. The data layer does not. Every company chasing "AI for regulatory" without first solving the standardization problem will hit the same ceiling—hallucinations, conflations, and outputs that no regulatory authority will accept.
                </p>

                <p>
                    As I wrote in <Link to="/blog/openclaw" className="underline decoration-accent/30 underline-offset-4 hover:decoration-accent transition-colors">the OpenClaw piece</Link>: the bottleneck is not AI capability. It is legacy infrastructure. In pharma, that infrastructure is the messy, siloed, inconsistently formatted data that sits between your statistical output and your submission. Fix the layer beneath the model, and the model delivers. Skip it, and you are shipping a liability.
                </p>
            </div>
        </article>
    );
};

export default PharmaDataLayer;
