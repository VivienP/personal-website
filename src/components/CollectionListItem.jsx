import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CollectionListItem = ({ to, date, tag, title, headingLevel = 'h3' }) => {
    const Heading = headingLevel;

    return (
        <Link
            to={to}
            className="group flex items-center justify-between py-5 px-4 border-b border-border-subtle hover:bg-white/50 transition-colors cursor-pointer"
        >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 w-full pr-8">
                <div className="flex flex-col items-start shrink-0 md:w-32">
                    <span className="font-mono text-xs text-secondary">{date}</span>
                    {tag && (
                        <span className="inline-flex mt-2 whitespace-nowrap px-2 py-1 border border-border-subtle font-mono text-[10px] leading-none tracking-wide text-secondary">
                            {tag}
                        </span>
                    )}
                </div>
                <div className={`flex-1 md:mt-0 ${tag ? 'mt-3' : 'mt-1'}`}>
                    <Heading className="text-base font-normal text-primary group-hover:text-accent transition-colors">
                        {title}
                    </Heading>
                </div>
            </div>
            <ArrowUpRight size={16} className="text-secondary opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100 transition-opacity shrink-0 mt-1" />
        </Link>
    );
};

export default CollectionListItem;
