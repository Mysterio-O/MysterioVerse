import React from 'react';
import { NavLink } from 'react-router';

const Navbar = () => {

    const links = [
        {
            title: "Services",
            to: "services",
            classes: "text-[#FFFFFF] font-semibold text-xl hover:underline transition-all duration-500",
            id: 1
        },
        {
            title: "Works",
            to: "works",
            classes: "text-[#FFFFFF] font-semibold text-xl hover:underline transition-all duration-500",
            id: 2
        },
        {
            title: "About Me",
            to: "about--me",
            classes: "text-[#FFFFFF] font-semibold text-xl hover:underline transition-all duration-500",
            id: 3
        },
        {
            title: "Articles",
            to: "articles",
            classes: "text-[#FFFFFF] font-semibold text-xl hover:underline transition-all duration-500",
            id: 4
        },
        {
            title: "Pages",
            to: "pages",
            classes: "text-[#FFFFFF] font-semibold text-xl hover:underline transition-all duration-500",
            id: 5
        },
        {
            title: "Contact Me",
            to: "contact-me",
            classes: "text-[#FFFFFF] font-semibold text-xl hover:underline transition-all duration-500",
            id: 6
        }
    ]

    return (
        <nav className='bg-[#0A0A0A] px-12 py-5'>
            <div className='flex justify-between items-center'>
                <div className=''>
                    <img src="/logo.webp" alt="" className='p-2 h-20' />

                    {/* <svg width="220" height="60" viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#00FFFF" />
                                <stop offset="100%" stop-color="#8A2BE2" />
                            </linearGradient>
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <text x="10" y="40" font-family="Orbitron, sans-serif" font-size="28"
                            fill="url(#gradient)" filter="url(#glow)" letter-spacing="1.5">
                            MysterioVerse
                        </text>
                    </svg> */}


                </div>
                <div className='flex gap-4'>
                    <ul className='flex items-center gap-8 uppercase'>
                        {
                            links.map(link => <NavLink
                                key={link.id}
                            >
                                <li
                                    className={`${link.classes}`}
                                >
                                    {link.title}
                                </li>
                            </NavLink>)
                        }
                    </ul>

                    <button className='btn rounded-3xl bg-[#FFFFFF] hover:bg-[#AEAEAE] text-[#0A0A0A] w-36 h-12'>Book A Call</button>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;