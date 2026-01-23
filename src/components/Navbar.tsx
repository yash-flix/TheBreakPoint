import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

import logo from '../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMobileMenuClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tighter text-white">
                        <img src={logo} alt="The BreakPoint" className="h-14 w-auto" />
                        <span className="hidden sm:inline">THE BREAKPOINT</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                            About Us
                        </Link>
                        <Link to="/contact" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
                            Contact Us
                        </Link>

                        <div className="flex items-center gap-4">
                            <Link
                                to="/work"
                                className="px-6 py-2.5 text-sm font-semibold text-neutral-950 bg-white rounded-full hover:bg-neutral-200 transition-all duration-300 hover:scale-105"
                            >
                                See Our Work
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white p-2"
                        aria-label="Toggle mobile menu"
                    >
                        <motion.div
                            initial={false}
                            animate={{ rotate: isMobileMenuOpen ? 0 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {isMobileMenuOpen ? (
                                <X size={24} />
                            ) : (
                                <Menu size={24} />
                            )}
                        </motion.div>
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-3 bg-neutral-900/50 backdrop-blur-md border-t border-white/10">
                                <Link
                                    to="/"
                                    onClick={handleMobileMenuClick}
                                    className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all"
                                >
                                    About Us
                                </Link>
                                <Link
                                    to="/work"
                                    onClick={handleMobileMenuClick}
                                    className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all"
                                >
                                    See Our Work
                                </Link>
                                <Link
                                    to="/contact"
                                    onClick={handleMobileMenuClick}
                                    className="block px-4 py-3 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 rounded-lg transition-all"
                                >
                                    Contact Us
                                </Link>

                                <div className="pt-3 border-t border-neutral-800">
                                    <a
                                        href="#"
                                        className="block px-4 py-3 text-sm font-semibold text-center text-neutral-950 bg-white rounded-lg hover:bg-neutral-200 transition-all"
                                    >
                                        Start a Project
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;
