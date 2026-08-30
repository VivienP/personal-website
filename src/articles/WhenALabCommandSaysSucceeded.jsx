import React from 'react';
import ArticleLayout from '../components/ArticleLayout';
import ArticleSEO from '../components/ArticleSEO';
import ArticleByline from '../components/ArticleByline';
import AuthorBio from '../components/AuthorBio';
import Cite from '../components/Cite';

const AUDIT_REPO = 'https://github.com/VivienP/lab-log-observability-audit';
const SLUG = 'when-a-lab-command-says-succeeded';

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

const CodeBlock = ({ children }) => (
    <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-primary/5 p-5 text-sm leading-relaxed">
        <code>{children}</code>
    </pre>
);

const WhenALabCommandSaysSucceeded = () => (
    <ArticleLayout backTo="/journal" backLabel="Journal" width="narrow">
        <ArticleSEO
            slug={SLUG}
            title="When a Lab Command Says SUCCEEDED, What Actually Happened? | Vivien Perrelle"
            description="Why reliable lab automation needs action-linked physical evidence and a separate effect state for safe retries and recovery."
            section="AI for Science"
            modifiedTime="2026-08-30"
            jsonLd={{
                about: {
                    '@type': 'SoftwareSourceCode',
                    name: 'lab-log-observability-audit',
                    url: AUDIT_REPO,
                    codeRepository: AUDIT_REPO,
                },
                keywords: 'laboratory automation, observability, physical evidence, effect state, safe retries, Model Hardware Standard',
            }}
        />

        <header className="mb-12 space-y-6">
            <h1 className="text-3xl md:text-4xl text-primary leading-tight font-serif italic">
                When a Lab Command Says <code className="font-mono not-italic text-[0.85em]">SUCCEEDED</code>, What Actually Happened?
            </h1>
            <p className="text-lg text-secondary font-normal italic max-w-2xl">
                Anthropic's Model Hardware Standard makes lab hardware easier for agents to operate. But device APIs only tell an agent how to act. Reliable autonomy also needs action-linked evidence and a separate effect state: a machine-readable contract for what the system can safely believe before it continues, recovers, or retries.
            </p>
            <ArticleByline slug={SLUG} />
        </header>

        <div className="prose prose-neutral prose-lg text-primary max-w-none space-y-8 font-normal">
            <p>Anthropic's <strong>Model Hardware Standard (MHS)</strong> gives AI agents a common interface to physical devices through standard primitives such as <code>read</code> and <code>write</code>.<Cite n={1} /></p>
            <p>That standardizes how an agent issues a command. It does not, by itself, establish what the command changed in the physical world.</p>
            <p>Suppose an agent sends <code>write("dispense", 40 µL)</code> and communication fails halfway through. Before retrying, the system needs to distinguish between zero, partial, and complete transfer. A software status such as <code>SUCCEEDED</code>, <code>FAILED</code>, or <code>UNKNOWN</code> describes the execution attempt. It is not a measurement of the resulting physical state.</p>
            <p>This article argues that reliable laboratory autonomy requires a separate <strong>effect state</strong>, supported by evidence explicitly linked to each physical action. The issue is not whether laboratories have sensors or readbacks. Experts already know they do. The issue is whether the system records which observation supports which action, what claim that observation justifies, and whether the resulting uncertainty makes a retry safe.</p>
            <p>I tested this distinction against two public datasets:</p>
            <ul className="list-disc pl-6 space-y-3 marker:text-accent">
                <li><RefLink href="https://zenodo.org/records/18930287">Flex-Cat</RefLink>, an autonomous catalysis platform built around Chemspeed automation</li>
                <li>a laboratory-scale <RefLink href="https://zenodo.org/records/17395543">Batch Distillation</RefLink> dataset containing induced anomalies and expert recovery annotations</li>
            </ul>
            <p>The parsing code, methods, generated metrics, and deterministic artifacts are available in the <RefLink href={AUDIT_REPO}>public audit repository</RefLink>.</p>
            <p>These datasets cannot establish a universal law of laboratory automation. They can show whether the proposed distinction explains concrete gaps in otherwise rich execution records.</p>

            <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">1. MHS exposes the missing contract</h2>
            <p>At Genentech, researchers used MHS to coordinate a liquid handler, robotic arm, and plate reader for a BCA protein assay. Claude encountered tip-pickup and fluid-detection errors and recovered from some of them autonomously.<Cite n={1} /></p>
            <p>A harder failure appeared when bubbles occupied part of a pipette tip. Although the protocol requested 40 µL, the liquid transfer could be lower. Retrying created more agitation and foam, so the researchers had to treat this as a physical failure requiring physical correction.</p>
            <p>This episode separates three questions: was the command accepted, did the software operation complete, and was the intended physical effect confirmed?</p>
            <p>MHS is a research preview, with fault detection, safety evaluations, and richer device state still in development. It need not solve every sensing problem. Its command interface makes a complementary requirement visible: a contract from execution to physical evidence.</p>

            <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">2. Flex-Cat: rich evidence, implicit relationships</h2>
            <p>Flex-Cat is a closed-loop autonomous catalysis platform published in <em>Nature Communications</em>.<Cite n={2} /> Its reproducibility package contains an example Chemspeed run with a main event log, task definitions, device configuration, volumetric transfer records, and low-level controller logs.</p>
            <p>The high-level <code>Eventlog.txt</code> contained:</p>
            <ul className="list-disc pl-6 space-y-3 marker:text-accent">
                <li>986 operation starts</li>
                <li>986 operation ends</li>
                <li><strong>986/986 operations paired cleanly</strong></li>
                <li>0 unmatched operations</li>
                <li>0 application cuts</li>
            </ul>
            <p>The orchestration record is exceptionally clean. Lower layers add controller-position reads, pressure observations, and device states such as <code>Controller ready</code> and <code>Move finished</code>.</p>
            <p>These signals can support physical-execution claims, but their relationship to individual actions remains implicit in timestamps, task definitions, and device context. The data does not provide a record such as:</p>
            <CodeBlock>{`EffectEvidence(
    action_id = "motion-123",
    source = "controller_position",
    claim = "target_position_reached"
)`}</CodeBlock>
            <p>Lower-level error and warning labels do not map cleanly to failed high-level operations; some precede later <code>Controller ready</code> and <code>Move finished</code> states. Severity alone cannot determine effect state without later readbacks and action context.</p>
            <p>For liquid handling, end events largely repeat the requested parameters:</p>
            <CodeBlock>{`START
volume = 6.732 µL

END
volume = 6.732 µL`}</CodeBlock>
            <p>This confirms software completion, not liquid transfer. Separate records contain an <code>actualVolume</code> field, but all 60 observations match the requested value and the public data does not establish an independent measurement. The defensible claim is: command execution known, physical liquid effect independently unconfirmed.</p>
            <p>AEGIS reaches the same boundary with visual monitoring on an Opentrons OT-2.<Cite n={3} /> It detects several visible failures, while transparent water remains difficult. There is no universal sensor for “the action happened.” Evidence must fit the effect being claimed.</p>

            <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">3. Batch Distillation: recovery happened, but the log often cannot explain how</h2>
            <p>Arweiler and colleagues built a laboratory-scale batch distillation plant and ran 119 experiments, including fault-free runs and experiments with intentionally induced anomalies.<Cite n={4} /> The dataset combines sensor and actuator time series, expert annotations, video, audio, NMR data, and operation logs.</p>
            <p>For the subset with operation logs, I found:</p>
            <ul className="list-disc pl-6 space-y-3 marker:text-accent">
                <li>106 experiments</li>
                <li>237 deduplicated anomaly records</li>
                <li>137 <code>ConfirmedAnomaly</code> records</li>
                <li><strong>79 labelled recoveries</strong></li>
            </ul>
            <p>The metadata describes recovery actions such as <code>Restore normal state</code>, providing ground truth that a recovery occurred. I then inspected each recovery in an operation-log window from 60 seconds before to 120 seconds after the perturbation ended. When that timestamp was unavailable, I used the anomaly end as an explicit fallback.</p>
            <blockquote className="border-l-2 border-accent pl-6 text-primary"><strong>In the original window, 34/79 = 43.04% of labelled recoveries had at least one parseable operation-log row nearby. This is a log-activity proxy, not evidence that the recovery itself was observed.</strong></blockquote>
            <p>Five of the 79 recoveries are anchored outside the interval covered by their operational log. No window can match them. They are unanswerable rather than negative, so the comparison with random background uses the remaining 74.</p>
            <p>At the original window, log activity is concentrated around the recovery labels at 2.60× the background obtained by random anchoring within the same experiment's log: 34/74 = 45.95% versus 17.67%, with empirical p = 0.0001 over 10,000 iterations using seed 20260830.</p>
            <div className="not-prose overflow-x-auto">
                <table className="w-full min-w-[38rem] border-collapse text-sm text-primary">
                    <thead>
                        <tr className="border-b border-border-subtle text-left">
                            <th scope="col" className="py-3 pr-6 font-medium">Window</th>
                            <th scope="col" className="py-3 pr-6 font-medium whitespace-nowrap">Observed</th>
                            <th scope="col" className="py-3 pr-6 font-medium whitespace-nowrap">Random background</th>
                            <th scope="col" className="py-3 pr-6 font-medium">Ratio</th>
                            <th scope="col" className="py-3 font-medium whitespace-nowrap">Empirical p</th>
                        </tr>
                    </thead>
                    <tbody className="align-top">
                        <tr className="border-b border-border-subtle">
                            <td className="py-3 pr-6 font-mono whitespace-nowrap">[-60 s, +120 s]</td>
                            <td className="py-3 pr-6 whitespace-nowrap">34/74 = 45.95%</td>
                            <td className="py-3 pr-6">17.67%</td>
                            <td className="py-3 pr-6">2.60×</td>
                            <td className="py-3">0.0001</td>
                        </tr>
                        <tr className="border-b border-border-subtle">
                            <td className="py-3 pr-6 font-mono whitespace-nowrap">±300 s</td>
                            <td className="py-3 pr-6 whitespace-nowrap">35/74 = 47.3%</td>
                            <td className="py-3 pr-6">35.5%</td>
                            <td className="py-3 pr-6">1.33×</td>
                            <td className="py-3">0.020</td>
                        </tr>
                        <tr className="border-b border-border-subtle">
                            <td className="py-3 pr-6 font-mono whitespace-nowrap">±600 s</td>
                            <td className="py-3 pr-6 whitespace-nowrap">37/74 = 50.0%</td>
                            <td className="py-3 pr-6">51.1%</td>
                            <td className="py-3 pr-6">0.98×</td>
                            <td className="py-3">0.63</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>Widening the window raises raw headline coverage from 34/79 to 37/79, but random background rises faster. At ±600 s, the observed 50.0% is indistinguishable from chance (background 51.1%, ratio 0.98×, p = 0.63). The extra matches gained by widening are what chance alone would produce.</p>
            <p>The anchor is the end of the perturbation. Removing event classes mechanically coupled to this boundary, including mode transitions and setpoint changes, leaves the enrichment intact at 2.80–2.85×. This rules out that precise explanation. But the residual signal is carried mainly by recipe-engine rows, which may be coupled to the same boundary when the controller resumes its step schedule. This remains a temporal association, not evidence that the labelled physical or operator recovery was itself observed.</p>
            <p>A silent window does not mean no operator acted. The intervention may fall outside the selected window, appear in another modality, or remain outside the software logs. Recovery ground truth and recovery evidence are different records.</p>
            <p>The two datasets expose complementary gaps. Flex-Cat preserves controller and process evidence without consistently binding it to the actions it could verify. Batch Distillation preserves expert recovery outcomes while its operation log often omits the intervention itself.</p>

            <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">4. Execution state and effect state need separate semantics</h2>
            <p>A physical action has at least two states:</p>
            <ol className="list-decimal pl-6 space-y-3 marker:text-accent">
                <li>Execution state: what happened to the software command?</li>
                <li>Effect state: what does the available evidence justify about the physical consequence?</li>
            </ol>
            <p>A minimal action-linked evidence model could look like:</p>
            <CodeBlock>{`ActionIntent
    ↓
ExecutionAttempt
    ↓
ControllerAcknowledgement
    ↓
EffectEvidence[]
    ↓
EffectClaim
    ↓
RecoveryDecision`}</CodeBlock>
            <p>The resulting <code>EffectClaim</code> should preserve uncertainty rather than collapse it into command status:</p>
            <CodeBlock>{`full_effect_confirmed
partial_effect_confirmed
no_effect_confirmed
reported_only
effect_unknown`}</CodeBlock>
            <p>Evidence may come from an encoder, controller readback, process sensor, balance, flow sensor, analytical measurement, vision system, or operator confirmation. The model does not prescribe a universal sensor. It provides a common way to state which observation supports which claim about a specific action.</p>
            <p>At minimum, such a record needs the action identifier, evidence source, observation time, observed value or event, and the effect claim it supports. The acceptance rule remains procedure-specific. An encoder may be sufficient to confirm a motor position, while a commanded pipette volume may require gravimetric, pressure, flow, visual, or analytical confirmation. The shared model standardizes provenance and uncertainty, not the scientific criterion for every instrument.</p>
            <p>A result of <code>SUCCEEDED</code> should not automatically imply <code>full_effect_confirmed</code>. For a non-idempotent action, <code>effect_unknown</code> is fundamentally different from <code>no_effect_confirmed</code>. If 40 µL may already have been dispensed, retrying can compound the physical error.</p>

            <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">5. This is an infrastructure contract, not a request for more logs</h2>
            <p>The evidence needed to verify an action often already exists somewhere in the automation stack. Flex-Cat shows controller positions, process values, device states, and detailed traces. The difficulty is that these observations are distributed across layers and are not consistently identified as evidence for a particular effect.</p>
            <p>Simply retaining every raw message would increase storage and analysis costs without resolving that ambiguity. The useful contract is narrower:</p>
            <CodeBlock>{`MHS / device APIs
    intent → command

action-linked evidence
    command → justified claim about reality`}</CodeBlock>
            <p>MHS and an effect-evidence contract solve complementary problems. One standardizes how an agent asks hardware to act. The other states what the system is justified in believing after the attempt. Sometimes that evidence is a controller value; sometimes it comes from another sensor or an analytical result; and sometimes the correct state remains <code>effect_unknown</code>.</p>
            <p>These two public datasets are not representative enough to show that action-to-evidence provenance is absent from laboratory automation generally. They do show that useful evidence can remain implicit even in rich, reproducible records. The proposal would be unnecessary where systems already expose explicit action identifiers, typed effect states, linked readbacks, and recovery outcomes.</p>

            <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary">Conclusion</h2>
            <p>The design requirement is not simply more logging. It is an explicit, machine-readable link between an action, the evidence bearing on its physical effect, and the claim the system is justified in making.</p>
            <p>For non-idempotent operations, this distinction directly determines whether retrying is safe. Until an automation stack exposes it, <code>SUCCEEDED</code> should mean only that command execution completed, not that the intended physical effect is known to have occurred.</p>

            <h2 className="text-2xl md:text-3xl pt-8 pb-2 font-normal text-primary border-b border-border-subtle">References</h2>
            <ol className="list-decimal pl-6 space-y-3 text-sm marker:text-secondary font-normal">
                <li id="ref-1" className="scroll-mt-24">Anthropic. <RefLink href="https://www.anthropic.com/news/model-hardware-standard-research-preview">“Previewing the Model Hardware Standard.”</RefLink> August 27, 2026.</li>
                <li id="ref-2" className="scroll-mt-24">Bennett, J. A. et al. <RefLink href="https://www.nature.com/articles/s41467-026-74425-x">“An autonomous lab for data-driven homogeneous catalysis.”</RefLink> <em>Nature Communications</em> 17, 7783 (2026). Public execution package: <RefLink href="https://zenodo.org/records/18930287">Zenodo 18930287</RefLink>.</li>
                <li id="ref-3" className="scroll-mt-24">Setty, P. V., Ramanathan, A., Foster, I. &amp; Stevens, R. <RefLink href="https://arxiv.org/abs/2607.15620">“AEGIS: Assay-Aware Protocol Validation and Runtime Monitoring for Open-Source Liquid Handling Robots.”</RefLink> arXiv:2607.15620 (2026).</li>
                <li id="ref-4" className="scroll-mt-24">Arweiler, J. et al. <RefLink href="https://www.nature.com/articles/s41597-026-07124-3">“Batch Distillation Data for Developing Machine Learning Anomaly Detection Methods.”</RefLink> <em>Scientific Data</em> 13, 513 (2026). Dataset concept record: <RefLink href="https://zenodo.org/records/17395543">Zenodo 17395543</RefLink>; audit performed on versioned release 21535243.</li>
            </ol>
        </div>

        <AuthorBio readNext={[
            { to: '/journal/ai-for-science-is-becoming-a-systems-problem', label: 'AI for Science Is Moving From Prediction to Closed-Loop Research Systems' },
            { to: '/journal/science-is-entering-its-agentic-era', label: 'Science Is Entering Its Agentic Era' },
            { to: '/journal/regulators-dont-accept-vibes', label: "Regulators Don't Accept Vibes: The Two Layers Pharma AI Is Missing" },
        ]} />
    </ArticleLayout>
);

export default WhenALabCommandSaysSucceeded;
