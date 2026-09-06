import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: 15,
        title: "LabBridge",
        description: "Open-source experimental-data and reliability infrastructure with durable execution, replay, provenance, fault injection and verifiable evidence packages.",
        tags: ["Lab Automation", "Reliability", "Open Source"],
        link: "https://github.com/VivienP/labbridge",
    },
    {
        id: 16,
        title: "Lab Automation Log Audit",
        description: "Reproducible audit of real Chemspeed and batch-distillation logs asking what a successful software command actually proves about physical execution.",
        tags: ["Lab Automation", "Observability", "Evidence"],
        link: "/journal/when-a-lab-command-says-succeeded",
    },
    {
        id: 14,
        title: "epibudget",
        description: "Built an open-source experimental-design tool that chooses protein variants by the interaction structure they expose under a fixed lab budget.",
        tags: ["Open Source", "Protein Engineering", "Experimental Design"],
        link: "/projects/epibudget",
    },
    {
        id: 12,
        title: "Scientific Claim Verifier",
        description: "Open-source engine that verifies cited scientific claims against their sources with deterministic, traceable provenance and regression-tested evaluation.",
        tags: ["Open Source", "AI for Science", "Python"],
        link: "/projects/scientific-claim-verifier",
    },
    {
        id: 1,
        title: "Finexov",
        description: "Built and sold an AI platform for complex R&D funding workflows, from cold outreach to production delivery and customer ownership.",
        tags: ["Full-Stack Development", "AI Agents", "Startup"],
        link: "/projects/finexov",
    },
    {
        id: 4,
        title: "Lab Automation Software Engineering",
        description: "Fixed-scope software support for existing automation deployments: workflow implementation, integration, reliability, testing and handover.",
        tags: ["Lab Automation", "Python", "Freelance"],
        link: "/lab-automation-software-engineer",
    },
    {
        id: 5,
        title: "Research Intern @ PKvitality",
        description: "Hands-on R&D on enzymatic microneedle biosensors inside a VC-backed team developing a continuous glucose monitoring smartwatch.",
        tags: ["MedTech", "Biosensors", "R&D"],
        link: "/projects/pkvitality",
    },
    {
        id: 3,
        title: "Wearable Biosensor Research",
        description: "Built a smartwatch prototype for wearable glucose and lactate enzymatic biosensors, including electronics, software and experimental work.",
        tags: ["Research", "Biosensors", "Hardware"],
        link: "/projects/biowatch",
    },
    {
        id: 13,
        title: "Mistral AI MCP Hackathon",
        description: "Contributed to an MCP server that helps companies find relevant European funding calls directly from Le Chat.",
        tags: ["Hackathon", "MCP", "Mistral AI"],
        link: "/projects/mistral-ai-hackathon",
    },
    {
        id: 6,
        title: "Green-Grown",
        description: "Designed, manufactured and crowdfunded a modular wood construction game that shapes a living climbing plant.",
        tags: ["Student Project", "Product Design", "Marketing"],
        link: "/projects/green-grown",
    },
    {
        id: 7,
        title: "Bione",
        description: "Coded an open-source WebGL app that teaches how a microneedle glucose biosensor works through an interactive 3D model.",
        tags: ["Student Project", "WebGL", "Programming"],
        link: "/projects/bione",
    },
    {
        id: 8,
        title: "E-Textile Motion Suit",
        description: "Co-built an e-textile platform whose fabric sensors capture a wearer's movements through stitched stretch, crumple and inertial sensors.",
        tags: ["Student Project", "Electronics", "E-Textile"],
        link: "/projects/motion-suit",
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
                        <ExternalLink size={18} className="text-secondary group-hover:text-primary transition-colors shrink-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100" />
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

const GRID = 'grid grid-cols-1 md:grid-cols-2 gap-8';

const Projects = () => {
    const featured = projects.slice(0, INITIAL_COUNT);
    const rest = projects.slice(INITIAL_COUNT);

    return (
        <section id="projects" className="py-24 px-6 border-t border-border-subtle/30">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-12 text-primary">Selected Works</h2>

                <div className={GRID}>
                    {featured.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>

                {rest.length > 0 && (
                    <details className="group/more mt-12">
                        <summary className="mx-auto w-fit cursor-pointer list-none px-6 py-2 border border-border-subtle text-sm text-primary hover:border-accent hover:text-accent transition-colors group-open/more:hidden [&::-webkit-details-marker]:hidden">
                            Load more
                        </summary>

                        <div>
                            <div className={`${GRID} mt-12`}>
                                {rest.map((project) => (
                                    <ProjectCard key={project.id} project={project} />
                                ))}
                            </div>
                        </div>
                    </details>
                )}
            </div>
        </section>
    );
};

export default Projects;
