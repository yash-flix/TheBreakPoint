import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import logo from '../assets/logo.png';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-neutral-950/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-6 md:px-6">
                <div className="flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tighter text-white">
                        <img src={logo} alt="The BreakPoint" className="h-14 w-auto" />
                        <span>THE BREAKPOINT</span>
                    </Link>

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
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
