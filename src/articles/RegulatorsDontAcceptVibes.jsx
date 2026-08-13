import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import Cite from '../components/Cite';
import ArticleSEO from '../components/ArticleSEO';
import ArticleByline from '../components/ArticleByline';
import AuthorBio from '../components/AuthorBio';

const SLUG = 'regulators-dont-accept-vibes';

const RefLink = ({ href, children }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors break-words"
    >
        {children}
    </a>
);

const RegulatorsDontAcceptVibes = () => {
    return (
        <ArticleLayout backTo="/journal" backLabel="Journal" width="narrow">
            <ArticleSEO
                slug={SLUG}
                title="Regulators Don't Accept Vibes: The Two Layers Pharma AI Is Missing | Vivien Perrelle"
                description="Pharma AI breaks in two places, not one: unstructured inputs upstream and unverified outputs downstream. Why submission-grade pipelines need a standardization layer and a verification layer around the model."
            />
            <header className="mb-12 space-y-6">
                <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                    Regulators Don't Accept Vibes: The Two Layers Pharma AI Is Missing
                </h1>
                <ArticleByline slug={SLUG} />
            </header>

            <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-8 font-light">
                <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">1. The Signal</h2>

                <p>
                    Novo Nordisk built NovoScribe<Cite n={1} />, an internal pipeline that drafts Clinical Study Reports with Claude. The numbers are public: drafting time down from 12 weeks to under 10 minutes, a team of ~50 medical writers reduced to 3, and a reported 90% cut in CSR writing time<Cite n={2} />, with positive feedback from regulators. They experimented with other models for years before it worked.
                </p>

                <p>
                    The ROI math is brutal: by Novo Nordisk's own estimate, each day a medicine reaches market sooner is worth around <strong>$15M</strong>. AI is shrinking the market for regulatory medical writers while making each remaining one more critical.
                </p>

                <p>
                    The shift is happening, and regulators have noticed. In April 2026, the FDA issued its first Warning Letter citing improper reliance on AI<Cite n={3} />: a manufacturer had used AI to generate required documents without adequate human review. The agency's position is explicit: you remain fully responsible for every AI-generated output. The question is no longer <em>whether</em> AI writes regulatory documents. It is whether you can prove that what it writes is true.
                </p>

                <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">2. The Ceiling</h2>

                <p>
                    A Principal Medical Writer I interviewed runs AI daily on his own biohacking data: diet logs, biomarkers, time series. Roughly one response in three contains a timing error or conflates items across days. On his own data, with a 2-million-token context window, where he catches every mistake instantly.
                </p>

                <p>
                    Now project that failure rate onto a 500-page CSR headed for submission. Even the FDA's own internal AI tool, Elsa, was reported by agency officials to hallucinate nonexistent studies<Cite n={4} />. The stakes are not a wrong diet log entry. The stakes are patient safety and a $2B drug program.
                </p>

                <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">3. Two Failure Points, Not One</h2>

                <p>
                    The tempting fix is a single one: better fine-tuning, bigger context, smarter prompts.
                </p>

                <p>
                    The evidence says otherwise. A recent large-scale study (25,000 runs across three frontier models and eight scientific domains) found that scaffolding and prompt engineering explain 1.5% of the variance in AI performance, versus 41.4% for the base model itself. Better base models are what move the needle, and they keep arriving fast. But two constraints survive every model generation: unstructured inputs degrade even the best reasoner available, and a regulator will never accept "the model is good now" as evidence. Trust has to be demonstrated, claim by claim, whatever the model's raw accuracy.
                </p>

                <p>
                    Regulated document generation actually breaks in two distinct places:
                </p>

                <ul className="list-disc pl-6 space-y-4 marker:text-accent">
                    <li><strong>Upstream: unstructured inputs.</strong> Feed a model a messy PDF, a semi-structured CSR, or statistical output with inconsistent formatting, and it has no structural grounding. It infers relationships, and when inference fails, it fabricates. Cleaner structure reduces the error rate.</li>
                    <li><strong>Downstream: unverified outputs.</strong> Reduces, not eliminates. A model can hallucinate on perfectly structured data. Which means no amount of preprocessing makes an output submission-ready on its own. Every claim in the document must be checked against its source, by a layer independent of the one that generated it. A generator cannot be its own auditor.</li>
                </ul>

                <p>
                    Most "AI for regulatory" efforts fix neither. They demo a chatbot in the middle and hope.
                </p>

                <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">4. The Architecture That Ships</h2>

                <p>
                    What a submission-grade pipeline actually looks like:
                </p>

                <ul className="list-disc pl-6 space-y-4 marker:text-accent">
                    <li><strong>A standardization layer before the model.</strong> Structured extraction into validated, machine-readable schemas. FAIR data principles as a hard technical requirement, not an academic ideal. Inconsistencies caught at the data layer, where they are cheap.</li>
                    <li><strong>A verification layer after the model.</strong> Claim-level traceability from generated text back to source tables. Independent checks that fail loudly instead of shipping quietly. An audit trail a reviewer, human or regulatory, can actually inspect.</li>
                </ul>

                <p>
                    The generation step in the middle is the part everyone shares: the same handful of frontier models, available to every competitor. The two layers around it are where the differentiation lives. And note what the verification layer is made of today: expensive humans re-reading everything. That is the bottleneck left to systematize.
                </p>

                <p>
                    This is the unglamorous work that rarely makes the demo. It is easier to show a chatbot summarizing a CSR than to build the plumbing that makes the summary trustworthy. But without the plumbing, you are shipping a liability with good grammar.
                </p>

                <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">Bottom Line</h2>

                <p>
                    The model works. The system around it does not exist yet. Regulators do not accept confident text; they accept documents where every number has a lineage. Structure the inputs so the model reasons on solid ground. Verify the outputs so no claim leaves the pipeline unchecked. Companies that build both layers will own regulatory AI. Companies that skip them will keep demoing.
                </p>

                <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary border-b border-border-subtle">References</h2>
                <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-light">
                    <li id="ref-1" className="scroll-mt-24">
                        MongoDB, <RefLink href="https://www.mongodb.com/solutions/customer-case-studies/novo-nordisk">"Novo Nordisk &amp; MongoDB Atlas: A Clinical Study Report in Minutes."</RefLink>
                    </li>
                    <li id="ref-2" className="scroll-mt-24">
                        Anthropic, <RefLink href="https://claude.com/customers/novo-nordisk">"Novo Nordisk customer story."</RefLink>
                    </li>
                    <li id="ref-3" className="scroll-mt-24">
                        Morgan Lewis, <RefLink href="https://www.morganlewis.com/blogs/asprescribed/2026/04/fdas-warning-letter-suggests-growing-scrutiny-of-ai-overreliance">"FDA's Warning Letter Suggests Growing Scrutiny of AI Overreliance."</RefLink> April 2026.
                    </li>
                    <li id="ref-4" className="scroll-mt-24">
                        Futurism (citing CNN), <RefLink href="https://futurism.com/neoscope/fda-ai-drugs-hallucinations">"The FDA Is Using an AI to Speed Up Drug Approvals and Insiders Say It's Making Horrible Mistakes."</RefLink> July 2025.
                    </li>
                </ol>
            </div>

            <AuthorBio readNext={[
                { to: '/journal/ai-for-science-is-becoming-a-systems-problem', label: 'AI for Science Is Moving From Prediction to Closed-Loop Research Systems' },
                { to: '/journal/science-is-entering-its-agentic-era', label: 'Science Is Entering Its Agentic Era' },
                { to: '/projects/scientific-claim-verifier', label: 'Scientific Claim Verifier — open-source claim-to-source verification (F1 0.92 on SciFact)' },
            ]} />
        </ArticleLayout>
    );
};

export default RegulatorsDontAcceptVibes;
