import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: 0,
        title: "LocusLab",
        description: "Building independent evidence-assurance infrastructure for biology and regulated science — the first commercial layer of a broader verification thesis for AI-driven research.",
        tags: ["AI for Science", "Verification", "Founder"],
        link: "https://www.locuslabhq.com/",
        github: "#"
    },
    {
        id: 12,
        title: "Scientific Claim Verifier",
        description: "Open-source engine that verifies each cited claim in scientific text against its source, with deterministic, fully-traceable provenance — F1 0.92 on SciFact (vs 0.62 naive baseline).",
        tags: ["Open Source", "AI for Science", "Python"],
        link: "/projects/scientific-claim-verifier",
        github: "#"
    },
    {
        id: 1,
        title: "Finexov",
        description: "Built AI agents to streamline complex R&D documentation for public funding.",
        tags: ["Full-Stack Development", "AI Agents", "Startup"],
        link: "/projects/finexov",
        github: "#"
    },
    {
        id: 2,
        title: "Oseille AI",
        description: "Developed a specialized agent for French business subsidies.",
        tags: ["AI Engineering", "Full-Stack Development", "SaaS"],
        link: "/projects/oseille",
        github: "#"
    },
    {
        id: 4,
        title: "Freelance AI Engineer",
        description: "Freelance AI engineering for biology, techbio, and AI-for-science teams: AI agents, context engineering, evaluation, and scientific data tooling.",
        tags: ["AI for Science", "AI Agents", "Context Engineering"],
        link: "/freelance-ai-engineer-biology",
        github: "#"
    },
    {
        id: 5,
        title: "Research Intern @ PKvitality",
        description: "Hands-on R&D on enzymatic microneedle biosensors (glucose & lactate) inside a VC-backed team building the first non-invasive CGM smartwatch for diabetics.",
        tags: ["MedTech", "Biosensors", "R&D"],
        link: "/projects/pkvitality",
        github: "#"
    },
    {
        id: 3,
        title: "Wearable Biosensor Research",
        description: "Built a working smartwatch prototype for wearable glucose and lactate enzymatic biosensors from scratch — the project that earned the PKvitality R&D role.",
        tags: ["Research", "Biosensors", "HealthTech"],
        link: "/projects/biowatch",
        github: "#"
    },
    {
        id: 6,
        title: "Green-Grown",
        description: "Designed, manufactured and crowdfunded a modular wood construction game that shapes a living climbing plant.",
        tags: ["Student Project", "Product Design", "Marketing"],
        link: "/projects/green-grown",
        github: "#"
    },
    {
        id: 7,
        title: "Bione",
        description: "Coded an open-source WebGL app that teaches how a microneedle glucose biosensor works through an interactive 3D model.",
        tags: ["Student Project", "WebGL", "Programming"],
        link: "/projects/bione",
        github: "#"
    },
    {
        id: 8,
        title: "E-Textile Motion Suit",
        description: "Co-built an easy-to-make e-textile platform whose fabric sensors capture a wearer's movements through stitched stretch, crumple, and inertial sensors.",
        tags: ["Student Project", "Electronics", "E-Textile"],
        link: "/projects/motion-suit",
        github: "#"
    }
];

const INITIAL_COUNT = 6;

const ProjectCard = ({ project }) => {
    const isInternal = project.link.startsWith('/');
    const hasLink = project.link !== "#";

    const inner = (
        <>
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl text-primary group-hover:text-accent transition-colors">{project.title}</h3>
                    {hasLink && (
                        <ExternalLink size={18} className="text-secondary group-hover:text-primary transition-colors shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100" />
                    )}
                </div>

                <p className="text-sm text-secondary leading-relaxed">
                    {project.description}
                </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-secondary px-2 py-1 bg-border-subtle/30 rounded-sm">
                        {tag}
                    </span>
                ))}
            </div>
        </>
    );

    const className = "group border border-border-subtle p-6 hover:border-accent transition-colors duration-300 bg-transparent flex flex-col justify-between h-full";

    if (!hasLink) {
        return <div className={className}>{inner}</div>;
    }

    return isInternal ? (
        <Link to={project.link} className={`${className} cursor-pointer`}>{inner}</Link>
    ) : (
        <a href={project.link} target="_blank" rel="noopener noreferrer" className={`${className} cursor-pointer`}>{inner}</a>
    );
};

const Projects = () => {
    const [showAll, setShowAll] = useState(false);
    const visible = showAll ? projects : projects.slice(0, INITIAL_COUNT);
    const hasMore = projects.length > INITIAL_COUNT;

    return (
        <section id="projects" className="py-24 px-6 border-t border-border-subtle/30">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-12 text-primary">Selected Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visible.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {hasMore && !showAll && (
                    <div className="mt-12 flex justify-center">
                        <button
                            type="button"
                            onClick={() => setShowAll(true)}
                            className="px-6 py-2 border border-border-subtle text-sm text-primary hover:border-accent hover:text-accent transition-colors"
                        >
                            Load more
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
