import { useId, useState, useSyncExternalStore } from 'react';

/**
 * Guided comparison of the five allocation strategies tracked in the epibudget v1
 * experiments. It replaces a 600x1420 static figure that stacked all five rows at
 * once, so the reader compares one strategy at a time against a shared candidate
 * universe instead of scrolling past every variant.
 *
 * Deliberately not a simulator: the selections below are the fixed, tracked outputs
 * of each criterion at B = 3, and `random` stays the one recorded draw rather than
 * resampling on click. Nothing is computed in the browser.
 *
 * Used only by src/articles/WhatShouldWeMeasureNext.jsx. The static SVG remains the
 * canonical full comparison and is linked underneath.
 */

// Node coordinates and edges mirror #candidate-graph in
// public/epibudget/allocation-strategies.svg so both figures read as one system.
const NODES = [
    { id: 'A', x: 10, y: 150, r: 14 },
    { id: 'B', x: 80, y: 150, r: 14 },
    { id: 'C', x: 150, y: 150, r: 14 },
    { id: 'AB', x: 45, y: 90, r: 14 },
    { id: 'AC', x: 80, y: 90, r: 14 },
    { id: 'BC', x: 115, y: 90, r: 14 },
    { id: 'ABC', x: 80, y: 25, r: 16 },
];

const EDGES = [
    ['A', 'AB'], ['B', 'AB'],
    ['A', 'AC'], ['C', 'AC'],
    ['B', 'BC'], ['C', 'BC'],
    ['AB', 'ABC'], ['AC', 'ABC'], ['BC', 'ABC'],
];

/** Variants whose ESM scores move most under masking perturbation. */
const HIGH_DISPERSION = new Set(['B', 'AC', 'ABC']);

const BUDGET = 3;

const STRATEGIES = [
    {
        key: 'random',
        label: 'Random',
        criterion: 'uniform',
        selection: ['A', 'AC', 'ABC'],
        note: 'Draws variants uniformly, ignoring both predicted fitness and interaction structure. It is the reference point the other criteria are measured against.',
    },
    {
        key: 'fitness',
        label: 'Fitness',
        criterion: 'predicted fitness',
        selection: ['AB', 'BC', 'ABC'],
        note: 'Takes the highest predicted-fitness variants. Combinations dominate, so the lower-order measurements their coefficients depend on never enter the plate.',
    },
    {
        key: 'loop-count',
        label: 'Loop-count',
        criterion: 'interaction coverage',
        selection: ['A', 'B', 'C'],
        note: 'Ranks by n(v), the number of interaction terms containing v. Singles carry the most terms, so measuring them closes the most loops.',
    },
    {
        key: 'dispersion-weighted',
        label: 'Dispersion-weighted',
        criterion: 'masking dispersion',
        selection: ['ABC', 'AC', 'B'],
        note: 'Ranks by n(v) × τ²(v), pulling in variants whose ESM scores react most to context perturbation. Current evidence does not establish a gain over loop count alone.',
    },
    {
        key: 'practice',
        label: 'Practice',
        criterion: 'singles → combinations',
        selection: ['A', 'B', 'AB'],
        note: 'Follows the common laboratory order: confirm beneficial singles first, then start combining them.',
    },
];

const PALETTE = {
    cream: '#FDFBF7',
    primary: '#1A1A1A',
    secondary: '#5A5A5A',
    border: '#E5E0D8',
    accent: '#1B2230',
};

const nodeById = Object.fromEntries(NODES.map((node) => [node.id, node]));

// 32 units apart, so the widest pair of neighbours (r 16 next to r 14) still clears
// by 2. ABC can land in any of the three filled positions depending on the strategy.
const WELL_X = [26, 58, 90, 122];
const PLATE_WIDTH = 148;

// Server snapshot false, client snapshot true: the subscription never fires, so this
// flips exactly once, at hydration. Cheaper and more honest than a setState effect,
// which React 19 flags as a cascading render.
const NEVER_CHANGES = () => () => {};
const useHydrated = () => useSyncExternalStore(NEVER_CHANGES, () => true, () => false);

const CandidateGraph = ({ selection }) => (
    <g transform="translate(60 40)">
        {EDGES.map(([from, to]) => (
            <line
                key={`${from}-${to}`}
                x1={nodeById[from].x} y1={nodeById[from].y}
                x2={nodeById[to].x} y2={nodeById[to].y}
                stroke={PALETTE.border} strokeWidth="1.5"
            />
        ))}

        {NODES.map(({ id, x, y, r }) => {
            const isSelected = selection.includes(id);
            return (
                <g key={id}>
                    {HIGH_DISPERSION.has(id) && (
                        <circle
                            cx={x} cy={y} r={r + 9}
                            fill="none" stroke={PALETTE.accent} strokeWidth="2" strokeDasharray="5 5"
                        />
                    )}
                    <circle
                        cx={x} cy={y} r={r}
                        fill={isSelected ? PALETTE.accent : PALETTE.cream}
                        stroke={isSelected ? PALETTE.accent : PALETTE.secondary}
                        strokeWidth="2"
                    />
                    <text
                        x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                        fontSize="14" fontWeight="600"
                        fill={isSelected ? PALETTE.cream : PALETTE.secondary}
                    >
                        {id}
                    </text>
                </g>
            );
        })}
    </g>
);

const Plate = ({ selection }) => (
    <g transform="translate(420 78)">
        <rect width={PLATE_WIDTH} height="96" rx="12" fill="none" stroke={PALETTE.border} strokeWidth="1.5" />
        {WELL_X.map((cx, index) => {
            const variant = selection[index];
            // Reuse the graph's radii: the three-letter label is 30 units wide and
            // overflows the 28-unit well the shorter labels sit in, which is exactly
            // why ABC is already drawn larger in the candidate graph.
            const r = nodeById[variant]?.r ?? 14;
            return (
                <g key={cx}>
                    <circle
                        cx={cx} cy="48" r={r}
                        fill={variant ? PALETTE.accent : PALETTE.cream}
                        stroke={variant ? PALETTE.accent : PALETTE.secondary}
                        strokeWidth="1.5"
                    />
                    {variant && (
                        <text
                            x={cx} y="48" textAnchor="middle" dominantBaseline="middle"
                            fontSize="14" fontWeight="600" fill={PALETTE.cream}
                        >
                            {variant}
                        </text>
                    )}
                </g>
            );
        })}
    </g>
);

const AllocationStrategiesDiagram = ({ src, maxWidthClass = 'max-w-full', number, title, description }) => {
    const [activeKey, setActiveKey] = useState('loop-count');
    // Controls stay inert until hydration so the prerendered figure is never a
    // set of buttons that silently do nothing.
    const hydrated = useHydrated();

    const uid = useId();
    const titleId = `${uid}-title`;
    const descId = `${uid}-desc`;
    const active = STRATEGIES.find((strategy) => strategy.key === activeKey);
    const selectionText = active.selection.join(', ');

    return (
        <figure className={`my-10 mx-auto not-prose ${maxWidthClass}`}>
            <div className="border border-border-subtle rounded-lg bg-cream">
                <div role="group" aria-label="Allocation strategy" className="flex flex-wrap gap-2 p-4 border-b border-border-subtle">
                    {STRATEGIES.map((strategy) => {
                        const isActive = strategy.key === active.key;
                        return (
                            <button
                                key={strategy.key}
                                type="button"
                                aria-pressed={isActive}
                                disabled={!hydrated}
                                onClick={() => setActiveKey(strategy.key)}
                                className={`font-mono text-xs px-3 py-2 border disabled:opacity-60 ${
                                    isActive
                                        ? 'border-accent bg-accent text-cream'
                                        : 'border-border-strong text-primary hover:border-accent hover:text-accent'
                                }`}
                            >
                                {strategy.label}
                            </button>
                        );
                    })}
                </div>

                <svg
                    viewBox="0 0 600 240"
                    role="img"
                    aria-labelledby={`${titleId} ${descId}`}
                    className="block w-full h-auto font-sans"
                >
                    <title id={titleId}>{`${active.label} selection at a fixed budget of ${BUDGET}`}</title>
                    <desc id={descId}>
                        {`${active.label} ranks candidates by ${active.criterion} and sends ${selectionText} to the plate. `
                            + `Filled nodes are selected, outlined nodes are not, and dashed halos mark variants with high ESM masking dispersion.`}
                    </desc>

                    <CandidateGraph selection={active.selection} />

                    <line x1="300" y1="126" x2="386" y2="126" stroke={PALETTE.secondary} strokeWidth="1.5" />
                    <path d="M400 126L386 120V132Z" fill={PALETTE.secondary} />

                    <Plate selection={active.selection} />
                </svg>

                <div className="px-4 pb-4 space-y-2">
                    <p className="text-sm text-primary">
                        <span className="font-mono text-xs uppercase tracking-widest text-secondary">Criterion</span>{' '}
                        {active.criterion}
                        <span className="text-secondary"> · </span>
                        <span className="font-mono text-xs uppercase tracking-widest text-secondary">Plate</span>{' '}
                        {selectionText}
                    </p>
                    <p className="text-sm text-secondary leading-relaxed">{active.note}</p>
                </div>
            </div>

            {/* The static SVG carries all five strategies at once and is the fallback
                whenever the controls are unavailable, so no in-page duplicate is needed. */}
            <p className="mt-4 text-sm text-secondary">
                Every strategy selects {BUDGET} variants from the same candidate universe of A, B, C, AB, AC, BC and ABC.{' '}
                <a
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-border-subtle underline-offset-4 hover:decoration-accent transition-colors"
                >
                    Open the full static comparison
                </a>
            </p>

            <figcaption className="mt-4 space-y-1 text-base leading-relaxed text-primary">
                <p className="font-semibold">Figure n°{number}: {title}</p>
                <p className="italic font-normal"><span>Description:</span> {description}</p>
            </figcaption>
        </figure>
    );
};

export default AllocationStrategiesDiagram;
