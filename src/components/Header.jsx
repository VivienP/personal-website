import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavLinks = () => {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <>
            <a href={isHome ? "#projects" : "/#projects"} className="text-secondary hover:text-accent transition-colors duration-300">Selected Works</a>
            <a href={isHome ? "#journal" : "/#journal"} className="text-secondary hover:text-accent transition-colors duration-300">Journal</a>
            <Link to="/art" className="text-secondary hover:text-accent transition-colors duration-300">Art</Link>
        </>
    );
};

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-cream/80 backdrop-blur-md border-b border-border-subtle">
            <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="font-bold text-xl tracking-tight text-primary hover:text-accent transition-colors">
                    Vivien.
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
                    <NavLinks />
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-primary hover:text-accent transition-colors"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation Overlay */}
                {isMenuOpen && (
                    <div className="absolute top-20 left-0 right-0 bg-cream border-b border-border-subtle p-6 md:hidden flex flex-col space-y-4 shadow-sm animate-in slide-in-from-top-2">
                        <NavLinks />
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
