import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="py-12 px-6 border-t border-border-subtle">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <div className="text-sm text-secondary font-mono">
                    &copy; {new Date().getFullYear()} Vivien. All rights reserved.
                </div>

                <div className="flex items-center space-x-8">
                    <a href="https://github.com/vperrelle" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors" aria-label="GitHub">
                        <Github size={20} />
                    </a>
                    <a href="https://x.com/PerrelleVivien" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors" aria-label="Twitter">
                        <Twitter size={20} />
                    </a>
                    <a href="https://www.linkedin.com/in/vivien-perrelle/" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-primary transition-colors" aria-label="LinkedIn">
                        <Linkedin size={20} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
