import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const articles = [
    {
        date: "2023-08",
        title: "Exploring Activity-Induced Lactate Pharmacokinetics: Implications for Minimally-Invasive Monitoring",
        link: "https://www.researchgate.net/publication/375229419_Exploring_Activity-Induced_Lactate_Pharmacokinetics_Implications_for_Minimally-Invasive_Monitoring"
    },
    {
        date: "2023-10",
        title: "Smartwatch-Embedded Biosensors For Healthcare Monitoring",
        link: "https://www.researchgate.net/publication/375227950_Smartwatch-Embedded_Biosensors_For_Healthcare_Monitoring"
    }
];

const AcademicWorkItem = ({ article }) => (
    <a
        href={article.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between py-5 px-4 border-b border-border-subtle hover:bg-white/50 transition-colors cursor-pointer"
    >
        <div className="flex flex-col md:flex-row md:items-center md:space-x-12 w-full pr-8">
            <span className="font-mono text-xs text-secondary w-32 shrink-0">{article.date}</span>
            <h3 className="text-base text-primary group-hover:text-accent transition-colors flex-1 mt-1 md:mt-0">
                {article.title}
            </h3>
        </div>
        <ArrowUpRight size={16} className="text-secondary opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0" />
    </a>
);

const AcademicWork = () => {
    return (
        <section id="academic-work" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl text-primary">Academic Work</h2>
                </div>

                <div className="flex flex-col">
                    {articles.map((article, index) => (
                        <AcademicWorkItem key={index} article={article} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AcademicWork;
