import React from 'react';
import FigureCaption from '../FigureCaption';

/**
 * Visual 1 of the accessible explainer: how small a 96-well plate is next to the
 * 29,678 candidate variants of a four-site design.
 *
 * The two SVGs carry geometry only — no text — so they stay legible at any width
 * and every number below is real HTML the reader can select, translate and hear.
 * Colours come from `currentColor` and the site theme rather than hardcoded hex.
 */

const PLATE_COLUMNS = 12;
const PLATE_ROWS = 8;
const WELL_PITCH = 16;
const WELL_RADIUS = 5.5;

// 29,678 candidates at 100 per square is 296.78, drawn as a 27 x 11 field.
const FIELD_COLUMNS = 27;
const FIELD_ROWS = 11;
const CELL_SIZE = 8;
const CELL_PITCH = 10;

const WELLS = Array.from({ length: PLATE_ROWS }, (_, row) =>
    Array.from({ length: PLATE_COLUMNS }, (_, column) => ({
        key: `${row}-${column}`,
        cx: WELL_RADIUS + 2.5 + column * WELL_PITCH,
        cy: WELL_RADIUS + 2.5 + row * WELL_PITCH,
    })),
).flat();

const CELLS = Array.from({ length: FIELD_ROWS }, (_, row) =>
    Array.from({ length: FIELD_COLUMNS }, (_, column) => ({
        key: `${row}-${column}`,
        x: column * CELL_PITCH,
        y: row * CELL_PITCH,
        // The plate is one square out of the field: 96 measurements against 100
        // candidates. Placed first so the eye lands on it before the mass.
        highlighted: row === 0 && column === 0,
    })),
).flat();

const PLATE_WIDTH = PLATE_COLUMNS * WELL_PITCH;
const PLATE_HEIGHT = PLATE_ROWS * WELL_PITCH;
const FIELD_WIDTH = FIELD_COLUMNS * CELL_PITCH - (CELL_PITCH - CELL_SIZE);
const FIELD_HEIGHT = FIELD_ROWS * CELL_PITCH - (CELL_PITCH - CELL_SIZE);

const PanelLabel = ({ children }) => (
    <p className="font-mono text-xs uppercase tracking-widest text-secondary">{children}</p>
);

const BudgetScaleDiagram = ({ maxWidthClass = 'max-w-full', number, title, description }) => (
    <figure className={`my-10 mx-auto not-prose ${maxWidthClass}`}>
        <div className="border border-border-subtle rounded-lg bg-cream">
            <div className="grid gap-8 sm:grid-cols-2 p-4">
                <div className="space-y-3">
                    <PanelLabel>What the laboratory can measure</PanelLabel>
                    <svg
                        viewBox={`0 0 ${PLATE_WIDTH} ${PLATE_HEIGHT}`}
                        aria-hidden="true"
                        focusable="false"
                        className="block w-full h-auto max-w-[240px] text-accent"
                    >
                        {WELLS.map(({ key, cx, cy }) => (
                            <circle key={key} cx={cx} cy={cy} r={WELL_RADIUS} fill="currentColor" />
                        ))}
                    </svg>
                    <p className="text-sm text-primary leading-relaxed">
                        <strong className="font-medium">96 wells.</strong> One plate of measurements.
                    </p>
                </div>

                <div className="space-y-3">
                    <PanelLabel>What the model can rank</PanelLabel>
                    <svg
                        viewBox={`0 0 ${FIELD_WIDTH} ${FIELD_HEIGHT}`}
                        aria-hidden="true"
                        focusable="false"
                        className="block w-full h-auto text-border-strong"
                    >
                        {CELLS.map(({ key, x, y, highlighted }) => (
                            <rect
                                key={key}
                                x={x}
                                y={y}
                                width={CELL_SIZE}
                                height={CELL_SIZE}
                                className={highlighted ? 'text-accent' : undefined}
                                fill="currentColor"
                            />
                        ))}
                    </svg>
                    <p className="text-sm text-primary leading-relaxed">
                        <strong className="font-medium">29,678 candidates.</strong> Each square stands for
                        about 100 of them.
                    </p>
                </div>
            </div>

            <div className="border-t border-border-subtle p-4 space-y-2">
                <p className="text-sm text-primary leading-relaxed">
                    The whole plate fits inside the single dark square: 96 measurements cover about{' '}
                    <strong className="font-medium">0.3%</strong> of the candidate set.
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-secondary">
                    <li>76 single mutants</li>
                    <li>2,166 double mutants</li>
                    <li>27,436 triple mutants</li>
                </ul>
            </div>
        </div>

        <FigureCaption number={number} title={title} description={description} />
    </figure>
);

export default BudgetScaleDiagram;
