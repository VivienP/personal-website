import React from 'react';
import { Link } from 'react-router-dom';

// Rendered at the end of long-form articles. Ties the content to the author
// entity in crawlable text (E-E-A-T / AI-search attribution) and routes
// readers toward the freelance landing page and adjacent work.
const AuthorBio = ({ readNext = [] }) => (
    <footer className="mt-16 pt-8 border-t border-border-subtle space-y-8">
        <div className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-widest text-secondary">About the author</h2>
            <p className="text-sm text-secondary leading-relaxed max-w-2xl">
                <strong className="text-primary font-medium">Vivien Perrelle</strong> is a Paris-based founder and{' '}
                <Link
                    to="/freelance-ai-engineer-biology"
                    className="text-primary border-b border-primary/40 hover:text-accent hover:border-accent transition-colors"
                >
                    freelance AI engineer for biology
                </Link>
                . He builds LocusLab, verification infrastructure for biology research, and takes on
                selective freelance engagements with biotech, techbio, and AI-for-science teams:
                AI agents, context engineering, and scientific tooling.{' '}
                <a
                    href="https://www.linkedin.com/in/vivien-perrelle/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary border-b border-primary/40 hover:text-accent hover:border-accent transition-colors"
                >
                    LinkedIn
                </a>
                {' · '}
                <a
                    href="https://github.com/VivienP"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary border-b border-primary/40 hover:text-accent hover:border-accent transition-colors"
                >
                    GitHub
                </a>
            </p>
        </div>

        {readNext.length > 0 && (
            <div className="space-y-3">
                <h2 className="font-mono text-xs uppercase tracking-widest text-secondary">Read next</h2>
                <ul className="space-y-2">
                    {readNext.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className="text-sm text-primary hover:text-accent transition-colors"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </footer>
);

export default AuthorBio;
