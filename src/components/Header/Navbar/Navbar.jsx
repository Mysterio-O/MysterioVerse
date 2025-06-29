import React, { useState, useEffect, useRef } from 'react';
import { RiMenuFold2Line, RiMenuFoldLine, RiCloseLine } from 'react-icons/ri';
import { NavLink } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const links = [
        {
            title: 'Services',
            to: '#services',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 1,
        },
        {
            title: 'Works',
            to: '#works',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 2,
        },
        {
            title: 'About Me',
            to: '#about-me',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 3,
        },
        // {
        //     title: 'Articles',
        //     to: '#articles',
        //     classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
        //     id: 4,
        // },
        {
            title: 'Projects',
            to: '#projects',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 5,
        },
        {
            title: 'Contact Me',
            to: '#contact-me',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 6,
        },
    ];

    const handleScroll = (e, target) => {
        e.preventDefault();
        const section = document.querySelector(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Close menu on Escape key
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isMenuOpen]);

    // Trap focus within menu
    useEffect(() => {
        if (isMenuOpen && menuRef.current) {
            const focusableElements = menuRef.current.querySelectorAll('a, button');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            const handleTab = (event) => {
                if (event.key === 'Tab') {
                    if (event.shiftKey && document.activeElement === firstElement) {
                        event.preventDefault();
                        lastElement.focus();
                    } else if (!event.shiftKey && document.activeElement === lastElement) {
                        event.preventDefault();
                        firstElement.focus();
                    }
                }
            };

            document.addEventListener('keydown', handleTab);
            firstElement.focus();
            return () => document.removeEventListener('keydown', handleTab);
        }
    }, [isMenuOpen]);

    const backdropVariants = {
        initial: { opacity: 0 },
        animate: { opacity: 0.5 },
        exit: { opacity: 0 },
    };

    const mobileMenuVariants = {
        initial: { y: '-100%', opacity: 0 },
        animate: { y: 0, opacity: 1 },
        exit: { y: '-100%', opacity: 0 },
    };

    const linkVariants = {
        initial: { y: 20, opacity: 0 },
        animate: (index) => ({
            y: 0,
            opacity: 1,
            transition: { delay: index * 0.1, type: 'spring', stiffness: 100, damping: 15 },
        }),
        exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
    };

    return (
        <nav className="bg-[#0A0A0A] md:px-12 md:py-5 z-50" role="navigation" aria-label="Main navigation">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
                <div>
                    <img src="/logo.webp" alt="MysterioVerse Logo" className="p-2 h-20" />
                </div>

                {/* Desktop menu */}
                <div className="hidden lg:flex gap-4 items-center">
                    <ul className="flex items-center gap-8 uppercase">
                        {links.map((link) => (
                            <li key={link.id}>
                                <a
                                    href={link.to}
                                    onClick={(e) => handleScroll(e, link.to)}
                                    className={link.classes}
                                >
                                    {link.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button className="rounded-3xl bg-[#FFFFFF] hover:bg-[#AEAEAE] text-[#0A0A0A] w-36 h-12 font-semibold transition-all duration-300">
                        Book A Call
                    </button>
                </div>

                {/* Mobile menu icon */}
                <div
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="lg:hidden px-2 cursor-pointer"
                    aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? <RiMenuFold2Line size={36} color="#FFFFFF" /> : <RiMenuFoldLine size={36} color="#FFFFFF" />}
                </div>
            </div>

            {/* Mobile menu options */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            variants={backdropVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black opacity-50 z-40 lg:hidden"
                            onClick={() => setIsMenuOpen(false)}
                        />
                        {/* Menu */}
                        <motion.div
                            ref={menuRef}
                            variants={mobileMenuVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                            className="fixed top-0 left-0 w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center z-50 lg:hidden"
                        >
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="absolute top-4 right-4 text-white"
                                aria-label="Close menu"
                            >
                                <RiCloseLine size={36} />
                            </button>
                            <ul className="flex flex-col items-center gap-6 uppercase py-8">
                                {links.map((link, index) => (
                                    <motion.li
                                        key={link.id}
                                        variants={linkVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        custom={index}
                                    >
                                        <a
                                            href={link.to}
                                            onClick={(e) => {
                                                handleScroll(e, link.to);
                                                setIsMenuOpen(false);
                                            }
                                            }
                                            className={link.classes}
                                        >
                                            {link.title}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                            <motion.div
                                variants={linkVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                custom={links.length}
                            >
                                <button className="rounded-3xl bg-[#FFFFFF] hover:bg-[#AEAEAE] text-[#0A0A0A] w-36 h-12 font-semibold transition-all duration-300">
                                    Book A Call
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;