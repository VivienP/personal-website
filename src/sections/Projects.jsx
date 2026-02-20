import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const projects = [
    {
        id: 1,
        title: "Finexov",
        description: "Built AI agents to streamline complex R&D documentation for public funding.",
        tags: ["AI Agents", "FinTech"],
        link: "https://www.finexov.com/",
        github: "#"
    },
    {
        id: 2,
        title: "Oseille AI",
        description: "Developed a specialized agent for French business subsidies.",
        tags: ["AI Agents", "SaaS"],
        link: "https://oseille.ai",
        github: "#"
    },
    {
        id: 3,
        title: "Biosensor Research",
        description: "Master Thesis on embedded healthcare monitoring.",
        tags: ["Research", "HealthTech"],
        link: "/blog/biowatch",
        github: "#"
    },
    {
        id: 4,
        title: "Freelance developer",
        description: "Providing technical leadership and development for high-growth SMBs.",
        tags: ["Consulting", "Leadership"],
        link: "https://www.malt.fr/profile/vivienperrelle",
        github: "#"
    },
    {
        id: 5,
        title: "Research Intern @ PKvitality",
        description: "Contributed to the R&D of the first non-invasive CGM smartwatch for diabetics.",
        tags: ["MedTech", "R&D"],
        link: "https://www.pkvitality.com/",
        github: "#"
    }
];

const ProjectCard = ({ project }) => {
    const isInternal = project.link.startsWith('/');

    return (
        <div className="group border border-border-subtle p-6 hover:border-accent transition-colors duration-300 bg-transparent flex flex-col justify-between h-full">
            <div className="space-y-4">
                <div className="flex justify-between items-start">
                    <h3 className="text-xl text-primary group-hover:text-accent transition-colors">{project.title}</h3>
                    {project.link !== "#" && (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {isInternal ? (
                                <Link to={project.link} className="text-secondary hover:text-primary">
                                    <ExternalLink size={18} />
                                </Link>
                            ) : (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary">
                                    <ExternalLink size={18} />
                                </a>
                            )}
                        </div>
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
        </div>
    );
};

const Projects = () => {
    return (
        <section id="projects" className="py-24 px-6 border-t border-border-subtle/30">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl mb-12 text-primary">Selected Works</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
