import React, { useState, useEffect, useRef } from 'react';
import { RiMenuFold2Line, RiMenuFoldLine, RiCloseLine } from 'react-icons/ri';
import { NavLink } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import emailjs from "emailjs-com";
import Swal from 'sweetalert2';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [form, setForm] = useState({ email: "", message: "" });
    const [isSending, setIsSending] = useState(false);


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const sendEmail = (e) => {
        e.preventDefault();
        setIsSending(true);

        emailjs
            .send(
                import.meta.env.VITE_EMAIL_SERVICE_ID,
                import.meta.env.VITE_EMAIL_TEMPLATE_ID,
                {
                    email: form.email,
                    message: form.message,
                },
                import.meta.env.VITE_EMAIL_PUBLIC
            )
            .then(() => {
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'Your message has been delivered successfully.',
                    icon: 'success',
                    confirmButtonColor: '#0A0A0A',
                    background: '#111111',
                    color: '#FFFFFF',
                });
                setForm({ email: "", message: "" });
                closeModal();
            })
            .catch((err) => {
                console.error(err);
                Swal.fire({
                    title: 'Oops!',
                    text: 'Failed to send your message. Try again later.',
                    icon: 'error',
                    confirmButtonColor: '#0A0A0A',
                    background: '#111111',
                    color: '#FFFFFF',
                });
            })
            .finally(() => setIsSending(false));
    };

    const links = [
        {
            title: 'Services',
            to: '#services',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 1,
        },
        {
            title: 'Education',
            to: '#education',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 2,
        },
        {
            title: 'About Me',
            to: '#about-me',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 3,
        },
        {
            title: 'Projects',
            to: '#projects',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 4,
        },
        {
            title: 'Contact Me',
            to: '#contact-me',
            classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300',
            id: 5,
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

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const modalVariants = {
        initial: { opacity: 0, y: -150 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -150 },
        transition: { duration: 0.3, ease: 'easeInOut' }
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
                    <button onClick={() => setIsModalOpen(true)} className="rounded-3xl bg-[#FFFFFF] hover:bg-[#AEAEAE] text-[#0A0A0A] w-36 h-12 font-semibold transition-all duration-300">
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
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="rounded-3xl bg-[#FFFFFF] hover:bg-[#AEAEAE] text-[#0A0A0A] w-36 h-12 font-semibold transition-all duration-300">
                                    Book A Call
                                </button>
                            </motion.div>
                        </motion.div>
                    </>
                )}
                {isModalOpen && (
                    <motion.div
                        variants={modalVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition="transition"
                        className="fixed inset-0 flex items-center justify-center z-50">
                        <motion.div
                            className="relative w-full max-w-lg mx-auto bg-[rgba(10,10,10,0.1)] backdrop-blur-md p-6 rounded-lg shadow-lg"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                        >
                            <h2 className="text-white text-3xl mb-4">Submit Your Details</h2>

                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-2"
                                aria-label="Close modal"
                            >
                                <RiCloseLine size={20} />
                            </button>

                            <form onSubmit={sendEmail} className="space-y-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Email"
                                    className="w-full px-4 py-2 rounded bg-white text-black"
                                />
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Message"
                                    className="w-full px-4 py-2 rounded bg-white text-black"
                                    rows="4"
                                />
                                <button
                                    type="submit"
                                    disabled={isSending}
                                    className="bg-[#111111] text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-[#FFFFFF] hover:text-[rgb(10,10,10)] transition-colors duration-300"
                                >
                                    {isSending ? "Booking..." : "Book A Call"}
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}

            </AnimatePresence>
        </nav>
    );
};

export default Navbar;