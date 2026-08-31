// The one record of what a Journal entry is. The listing, the byline, the canonical
// URL, the Open Graph dates and the JSON-LD all derive from it — an article file
// names its slug and nothing else about itself repeats.
//
// `readingMinutes` is the rendered word count of each prerendered article divided by
// READING_WPM (scripts/reading-time.mjs) and rounded. It lives here rather than in the
// articles so the Journal has one source for date, tag and reading time, and so
// tests/dist-contracts.test.mjs can hold the recorded values against the real text.
export const journalArticles = [
    {
        date: "2026-08-29",
        title: "MHS Standardizes How Agents Act. The Next Layer Is Proving What Changed.",
        slug: "when-a-lab-command-says-succeeded",
        tag: "AI-for-science",
        readingMinutes: 10,
        socialImage: "/social/journal/when-a-lab-command-says-succeeded.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2026-08-13",
        title: "Epistasis Explained: Why the Best Protein Variant Is Not Always the Best Experiment",
        slug: "epistasis-explained-best-variant-vs-best-experiment",
        tag: "AI-for-science",
        readingMinutes: 12,
        socialImage: "/social/journal/epistasis-explained-best-variant-vs-best-experiment.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2026-07-23",
        title: "Measure for Information, Not for Fitness: Designing Protein Experiments to Reveal Epistasis",
        slug: "designing-protein-experiments-for-epistasis",
        tag: "AI-for-science",
        readingMinutes: 15,
        socialImage: "/social/journal/designing-protein-experiments-for-epistasis.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2026-06-01",
        title: "AI for Science Is Moving From Prediction to Closed-Loop Research Systems",
        slug: "ai-for-science-is-becoming-a-systems-problem",
        tag: "AI-for-science",
        readingMinutes: 13,
        socialImage: "/social/journal/ai-for-science-is-becoming-a-systems-problem.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2026-05-11",
        title: "Regulators Don't Accept Vibes: The Two Layers Pharma AI Is Missing",
        slug: "regulators-dont-accept-vibes",
        tag: "AI-for-science",
        readingMinutes: 5,
        socialImage: "/social/journal/regulators-dont-accept-vibes.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2026-04-17",
        title: "Science Is Entering Its Agentic Era",
        slug: "science-is-entering-its-agentic-era",
        tag: "Agentic AI",
        readingMinutes: 6,
        socialImage: "/social/journal/science-is-entering-its-agentic-era.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2026-02-20",
        title: "OpenClaw & the Infrastructure of Sovereign Intelligence",
        slug: "openclaw",
        tag: "Agentic AI",
        readingMinutes: 5,
        socialImage: "/social/journal/openclaw.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2026-02-09",
        title: "Trauma-Driven VS Purpose-Driven Entrepreneurship",
        slug: "trauma-vs-purpose",
        tag: "Entrepreneurship",
        readingMinutes: 3,
        socialImage: "/social/journal/trauma-vs-purpose.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2023-02-24",
        title: "Is Technology Neutral?",
        slug: "is-technology-neutral",
        tag: "Technology & society",
        readingMinutes: 8,
        socialImage: "/social/journal/is-technology-neutral.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2023-02-04",
        title: "How to Build a Lactate Biosensor?",
        slug: "lactate",
        tag: "Bioengineering",
        readingMinutes: 11,
        socialImage: "/social/journal/lactate.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2022-03-10",
        title: "How to Build a Wearable Glucose Biosensor?",
        slug: "glucose-biosensor",
        tag: "Bioengineering",
        readingMinutes: 12,
        socialImage: "/social/journal/glucose-biosensor.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    },
    {
        date: "2022-01-20",
        title: "How to Build a SmartWatch?",
        slug: "smartwatch",
        tag: "Bioengineering",
        readingMinutes: 8,
        socialImage: "/social/journal/smartwatch.jpg",
        socialImageWidth: 1200,
        socialImageHeight: 630
    }
];

const REQUIRED_FIELDS = [
    'date',
    'title',
    'slug',
    'tag',
    'readingMinutes',
    'socialImage',
    'socialImageWidth',
    'socialImageHeight',
];

/**
 * The record behind a Journal article, or a build failure.
 *
 * Every consumer runs during prerendering, so an article whose slug is absent from
 * the listing — or an entry missing a field the byline and the JSON-LD depend on —
 * fails `npm run build` instead of shipping an empty byline and a canonical URL
 * pointing at the site root.
 */
export const getJournalArticle = (slug) => {
    const entry = journalArticles.find((article) => article.slug === slug);
    if (!entry) {
        throw new Error(`No journalArticles entry for slug "${slug}". Add it to src/data/journalArticles.js.`);
    }

    const missing = REQUIRED_FIELDS.filter((field) => entry[field] === undefined || entry[field] === '');
    if (missing.length > 0) {
        throw new Error(`journalArticles entry "${slug}" is missing: ${missing.join(', ')}.`);
    }

    return entry;
};
