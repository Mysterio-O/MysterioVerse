import React from 'react';
import { FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { motion } from "motion/react";

const links = [
    { title: 'Services', to: '#services', classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300', id: 1 },
    { title: 'Education', to: '#education', classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300', id: 2 },
    { title: 'About Me', to: '#about-me', classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300', id: 3 },
    { title: 'Projects', to: '#projects', classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300', id: 4 },
    { title: 'Contact Me', to: '#contact-me', classes: 'text-[#FFFFFF] font-semibold text-xl hover:text-cyan-400 transition-all duration-300', id: 5 },
];
const Footer = () => {

    const phoneNumber = +8801601111011;

    const handleScroll = (e, target) => {
        e.preventDefault();
        const section = document.querySelector(target);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <motion.footer
            initial={{ scale: 1, y: -10, opacity:0 }}
            whileInView={{scale:1,y:0,opacity:1}}
            transition={{duration:0.9,ease:'easeInOut',stiffness:30,damping:2}}
            className="bg-black text-white py-6 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center overflow-hidden">
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <div>
                        <img src="/logo.webp" alt="MysterioVerse Logo" className="p-2 h-20" />
                    </div>
                    <p className="text-gray-400 text-sm">&copy; 2025 Mysterio</p>
                    <p className="text-gray-500 text-xs">Portfolio Theme by MysterioVerse</p>
                </div>
                <div className="text-center mb-4 md:mb-0">
                    <h3 className="text-orange-500 text-lg mb-2">NAVIGATION</h3>
                    <ul className="space-y-2 text-gray-400">
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
                </div>
                <div className="text-center">
                    <h3 className="text-orange-500 text-lg mb-2">CONNECT</h3>
                    <ul className="space-y-2 text-gray-400">
                        <a
                            href='https://www.linkedin.com/in/sk-maruf-hossain-9586a5334'
                            target='_blank'
                            className="flex items-center justify-center hover:text-blue-500 transition-colors duration-300">
                            <FaLinkedin className="mr-2" />Linkedin
                        </a>
                        <a
                            href={`https://wa.me/${phoneNumber}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className="flex items-center justify-center hover:text-blue-500 transition-colors duration-300">
                            <FaWhatsapp className="mr-2" />
                            <span>Whatsapp</span>
                        </a>
                    </ul>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;