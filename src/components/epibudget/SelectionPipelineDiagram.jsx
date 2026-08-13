import React from 'react';
import { ArrowRight } from 'lucide-react';
import FigureCaption from '../FigureCaption';

/**
 * Visual 3 of the accessible explainer: the label-blind evaluation pipeline.
 *
 * Built from HTML rather than SVG so the steps reflow into a column on narrow
 * screens and read as an ordered list to a screen reader. The label boundary is
 * the point of the figure, so it is a labelled rule between the two phases, not
 * a colour difference.
 */

const PHASES = [
    {
        key: 'selection',
        eyebrow: 'Phase 1 · No measured fitness is visible',
        steps: [
            { title: 'Candidate variants', detail: 'Every single, double and triple mutant allowed by the design.' },
            { title: 'Label-blind scores', detail: 'Each candidate is scored without access to any experimental result.' },
            { title: 'Fixed budget', detail: 'The same number of wells for every strategy being compared.' },
            { title: 'Selected plate', detail: 'The variants that will actually be measured.' },
        ],
    },
    {
        key: 'evaluation',
        eyebrow: 'Phase 2 · The same learner for every plate',
        steps: [
            { title: 'Train the downstream learner', detail: 'One fixed model, fitted to whichever plate was selected.' },
            { title: 'Evaluate on held-out variants', detail: 'Scored on variants no strategy was allowed to buy.' },
        ],
    },
];

const Step = ({ step }) => (
    <li className="flex-1 border border-border-subtle rounded-md p-4 space-y-1 bg-cream">
        <p className="text-sm text-primary font-medium">{step.title}</p>
        <p className="text-sm text-secondary leading-relaxed">{step.detail}</p>
    </li>
);

const Phase = ({ phase }) => (
    <div className="space-y-3">
        <p className="font-mono text-xs uppercase tracking-widest text-secondary">{phase.eyebrow}</p>
        <ol className="flex flex-col md:flex-row md:items-stretch gap-3">
            {phase.steps.map((step, index) => (
                <React.Fragment key={step.title}>
                    {index > 0 && (
                        <li aria-hidden="true" className="flex items-center justify-center text-secondary shrink-0">
                            <ArrowRight size={18} className="rotate-90 md:rotate-0" />
                        </li>
                    )}
                    <Step step={step} />
                </React.Fragment>
            ))}
        </ol>
    </div>
);

const SelectionPipelineDiagram = ({ maxWidthClass = 'max-w-full', number, title, description }) => (
    <figure className={`my-10 mx-auto not-prose ${maxWidthClass}`}>
        <div className="border border-border-subtle rounded-lg bg-cream">
            <div className="p-4">
                <Phase phase={PHASES[0]} />
            </div>

            <p className="border-y border-border-subtle bg-border-subtle/20 px-4 py-3 text-sm text-primary text-center">
                <span className="font-mono text-xs uppercase tracking-widest text-accent">Label boundary</span>
                <span className="block mt-1">
                    Measured fitness is revealed only here, once the plate can no longer change.
                </span>
            </p>

            <div className="p-4">
                <Phase phase={PHASES[1]} />
            </div>
        </div>

        <FigureCaption number={number} title={title} description={description} />
    </figure>
);

export default SelectionPipelineDiagram;
