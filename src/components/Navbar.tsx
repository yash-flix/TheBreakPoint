import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { ProgressiveBlur } from './ui';

import logo from '../assets/logo.png';

const NAV_LINKS = [
    { to: '/', label: 'Studio' },
    { to: '/work', label: 'Work' },
    { to: '/contact', label: 'Contact' },
];

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { pathname } = useLocation();

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
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-0 z-50"
        >
            {/* Blur ramps in as the page scrolls under the bar */}
            <div
                aria-hidden
                className={`absolute inset-0 -bottom-8 transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'
                    }`}
            >
                <ProgressiveBlur direction="top" />
                <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/55 to-transparent" />
            </div>

            <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
                <div className="flex h-20 items-center justify-between">
                    {/* Wordmark */}
                    <Link
                        to="/"
                        onClick={(e) => {
                            if (window.location.pathname === '/') {
                                e.preventDefault();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        }}
                        className="group flex items-center gap-3"
                    >
                        <img src={logo} alt="" className="h-9 w-auto" />
                        <span className="flex flex-col leading-none">
                            <span className="text-lg font-medium tracking-[-0.02em] text-mist-50">
                                Breakpoint
                            </span>
                            <span className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.28em] text-mist-700 transition-colors duration-500 group-hover:text-ice-300/70">
                                Applied AI
                            </span>
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <div className="hidden items-center gap-9 md:flex">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${pathname === link.to
                                    ? 'text-mist-50'
                                    : 'text-mist-500 hover:text-mist-100'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <Link
                            to="/contact"
                            className="inline-flex items-center gap-1.5 rounded-full bg-ice-300 px-5 py-2.5 text-[13px] font-medium text-ink-950 shadow-[0_0_36px_-14px_rgba(166,218,255,0.9)] transition-colors duration-300 hover:bg-ice-200"
                        >
                            Start a project
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-mist-100 md:hidden"
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden md:hidden"
                        >
                            <div className="space-y-1 border-t hairline py-5">
                                {NAV_LINKS.map((link) => (
                                    <Link
                                        key={link.to}
                                        to={link.to}
                                        onClick={handleMobileMenuClick}
                                        className="block rounded-lg px-3 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-mist-300 transition-colors hover:bg-white/[0.04] hover:text-white"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                <div className="pt-4">
                                    <Link
                                        to="/contact"
                                        onClick={handleMobileMenuClick}
                                        className="flex items-center justify-center gap-1.5 rounded-full bg-ice-300 px-5 py-3.5 text-sm font-medium text-ink-950"
                                    >
                                        Start a project
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
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
