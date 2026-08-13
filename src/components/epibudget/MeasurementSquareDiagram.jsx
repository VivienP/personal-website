import React, { useId } from 'react';
import FigureCaption from '../FigureCaption';

/**
 * Visual 2 of the accessible explainer: the WT / A / B / AB square.
 *
 * Two panels side by side rather than one toggle, because the point is a
 * comparison: the same four candidates, measured alone or as a complete family.
 * The small viewBox keeps the node labels close to their nominal size once the
 * panel is scaled to its column.
 */

const NODES = [
    { id: 'WT', x: 42, y: 128 },
    { id: 'A', x: 158, y: 128 },
    { id: 'B', x: 42, y: 42 },
    { id: 'AB', x: 158, y: 42 },
];

const EDGES = [
    ['WT', 'A'],
    ['WT', 'B'],
    ['B', 'AB'],
    ['A', 'AB'],
];

const NODE_RADIUS = 22;
// The 2px node outline straddles the radius, so stop 1 unit further out or the
// segment reappears inside the ring.
const EDGE_GAP = NODE_RADIUS + 1;

const nodeById = Object.fromEntries(NODES.map((node) => [node.id, node]));

/**
 * Segment trimmed to the two node borders. Drawing centre-to-centre and relying on
 * the node fill to cover the overlap breaks as soon as a node is unfilled — which is
 * exactly the state this figure uses to mean "not measured".
 */
const edgeBetween = (from, to) => {
    const start = nodeById[from];
    const end = nodeById[to];
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const length = Math.hypot(dx, dy);
    const [ux, uy] = [dx / length, dy / length];

    return {
        x1: start.x + ux * EDGE_GAP,
        y1: start.y + uy * EDGE_GAP,
        x2: end.x - ux * EDGE_GAP,
        y2: end.y - uy * EDGE_GAP,
    };
};

const PANELS = [
    {
        key: 'alone',
        heading: 'Measure AB on its own',
        measured: ['AB'],
        title: 'Only the double mutant AB is measured',
        outcome: 'One number, mixing the effect of A, the effect of B, their interaction and experimental noise. None of them can be separated.',
    },
    {
        key: 'family',
        heading: 'Measure the whole family',
        measured: ['WT', 'A', 'B', 'AB'],
        title: 'The reference protein, A, B and AB are all measured',
        outcome: 'Four numbers. The interaction term is now a subtraction away, because everything the double mutant inherits from A and B has been measured too.',
    },
];

const Panel = ({ panel }) => {
    const uid = useId();
    const titleId = `${uid}-title`;
    const descId = `${uid}-desc`;
    const measuredText = panel.measured.join(', ');

    return (
        <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-widest text-secondary">{panel.heading}</p>
            <svg
                viewBox="0 0 200 170"
                role="img"
                aria-labelledby={`${titleId} ${descId}`}
                className="block w-full h-auto max-w-[260px] font-sans"
            >
                <title id={titleId}>{panel.title}</title>
                <desc id={descId}>
                    {`A square with the reference protein WT, the single mutants A and B, and the double mutant AB at its corners. `
                        + `Filled corners are measured: ${measuredText}. Outlined corners are not measured.`}
                </desc>

                <g className="text-border-strong" stroke="currentColor" strokeWidth="1.5">
                    {EDGES.map(([from, to]) => (
                        <line key={`${from}-${to}`} {...edgeBetween(from, to)} />
                    ))}
                </g>

                {NODES.map(({ id, x, y }) => {
                    const isMeasured = panel.measured.includes(id);
                    return (
                        <g key={id} className={isMeasured ? 'text-accent' : 'text-border-strong'}>
                            <circle
                                cx={x}
                                cy={y}
                                r={NODE_RADIUS}
                                fill={isMeasured ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <text
                                x={x}
                                y={y}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fontSize="15"
                                fontWeight="600"
                                className={isMeasured ? 'fill-cream' : 'fill-primary'}
                            >
                                {id}
                            </text>
                        </g>
                    );
                })}
            </svg>
            <p className="text-sm text-secondary leading-relaxed">
                <span className="text-primary">Measured: {measuredText}.</span> {panel.outcome}
            </p>
        </div>
    );
};

const MeasurementSquareDiagram = ({ maxWidthClass = 'max-w-full', number, title, description }) => (
    <figure className={`my-10 mx-auto not-prose ${maxWidthClass}`}>
        <div className="border border-border-subtle rounded-lg bg-cream">
            <div className="grid gap-8 sm:grid-cols-2 p-4">
                {PANELS.map((panel) => (
                    <Panel key={panel.key} panel={panel} />
                ))}
            </div>
            <p className="border-t border-border-subtle p-4 text-sm text-primary leading-relaxed">
                A filled corner is a variant that was measured; an outlined corner is one that was not.
                WT is the reference protein the variants are compared against.
            </p>
        </div>

        <FigureCaption number={number} title={title} description={description} />
    </figure>
);

export default MeasurementSquareDiagram;
