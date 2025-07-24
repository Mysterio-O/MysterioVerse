import React from 'react';
import { motion } from 'motion/react';
import { FaEnvelope } from 'react-icons/fa'
const AboutMeComponent = () => {
    return (
        <div className="min-h-screen bg-black text-white py-16 px-6 md:px-20">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col-reverse md:flex-row gap-10">
                    {/* Experience Section */}
                    <div className='flex-1'>
                        <h3 className="text-xl font-semibold mb-6">Experience</h3>
                        <div className="border border-gray-800 p-2 md:p-6 rounded-lg md:px-8">
                            <div className="group mb-6 pb-6 relative hover:bg-[rgb(31,31,31)] transition-colors duration-300 rounded-xl p-3">
                                <div className="w-2 h-2 absolute -left-3.5 top-1 rounded-full bg-white" />
                                <div className="bg-white w-[2px] h-10 absolute -left-3 transition-all duration-300 ease-in-out group-hover:h-full" />
                                <p className="text-gray-400 text-sm">2024 - 2025</p>
                                <p className="font-semibold text-lg">Web Development BootCamp (ProgrammingHero)</p>
                                <p className="text-sm text-gray-400">MERN-stack Development | HTML, CSS, Tailwind, DaisyUI, JavaScript, React, React-Router, Motion, ReactBits, Lottie-React,  Firebase Express, MongoDB</p>
                            </div>
                            <div className="group mb-6 pb-6 relative hover:bg-[rgb(31,31,31)] transition-colors duration-300 rounded-xl p-3">
                                <div className="w-2 h-2 absolute -left-3.5 top-1 rounded-full bg-white" />
                                <div className="bg-white w-[2px] h-10 absolute -left-3 transition-all duration-300 ease-in-out group-hover:h-full" />
                                <p className="text-gray-400 text-sm">2025</p>
                                <p className="font-semibold text-lg">Plant Pulse</p>
                                <p className="text-sm text-gray-400">MERN-stack Development | React, Tailwind, Motion, Firebase Express, MongoDB</p>
                            </div>
                            <div className="group mb-6 pb-6 relative hover:bg-[rgb(31,31,31)] transition-colors duration-300 rounded-xl p-3">
                                <div className="w-2 h-2 absolute -left-3.5 top-1 rounded-full bg-white" />
                                <div className="bg-white w-[2px] h-10 absolute -left-3 transition-all duration-300 ease-in-out group-hover:h-full" />
                                <p className="text-gray-400 text-sm">2025</p>
                                <p className="font-semibold text-lg">GalaxiMart</p>
                                <p className="text-sm text-gray-400">MERN-stack Development | MERN Stack, Firebase, Motion</p>
                            </div>
                            <div className="group relative hover:bg-[rgb(31,31,31)] transition-colors duration-300 rounded-xl p-3">
                                <div className="w-2 h-2 absolute -left-3.5 top-1 rounded-full bg-white" />
                                <div className="bg-white w-[2px] h-10 absolute -left-3 transition-all duration-300 ease-in-out group-hover:h-full" />
                                <p className="text-gray-400 text-sm">2025</p>
                                <p className="font-semibold text-lg">LifeDrop</p>
                                <p className="text-sm text-gray-400">MERN-stack Development | React, Tailwind, Motion, Firebase Express, MongoDB</p>
                            </div>
                        </div>
                    </div>

                    {/* Education Section */}
                    {/* Education Section */}
                    <div className='flex-1'>
                        <h3 className="text-xl font-semibold mb-6">Education</h3>
                        <div className="border border-gray-800 p-2 md:p-6 rounded-lg md:px-8">
                            <div className="group mb-6 pb-6 relative hover:bg-[rgb(31,31,31)] transition-colors duration-300 rounded-xl p-3">
                                <div className="w-2 h-2 absolute -left-3.5 top-1 rounded-full bg-white" />
                                <div className="bg-white w-[2px] h-10 absolute -left-3 transition-all duration-300 ease-in-out group-hover:h-full" />
                                <p className="text-gray-400 text-sm">2023</p>
                                <p className="font-semibold text-lg">HSC – Humanities</p>
                                <p className="text-sm text-gray-400">Bangladesh Open University</p>
                            </div>
                            <div className="group relative hover:bg-[rgb(31,31,31)] transition-colors duration-300 rounded-xl p-3">
                                <div className="w-2 h-2 absolute -left-3.5 top-1 rounded-full bg-white" />
                                <div className="bg-white w-[2px] h-10 absolute -left-3 transition-all duration-300 ease-in-out group-hover:h-full" />
                                <p className="text-gray-400 text-sm">2025 – 2027 (Expected)</p>
                                <p className="font-semibold text-lg">Associate Degree in Computer Science</p>
                                <p className="text-sm text-gray-400">University of the People, USA</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default AboutMeComponent;