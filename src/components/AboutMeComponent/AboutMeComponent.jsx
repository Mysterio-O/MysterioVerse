import React from 'react';
import { motion } from 'motion/react';
import { FaEnvelope } from 'react-icons/fa';

const experienceList = [
    {
        title: 'Plant Pulse',
        year: 2025,
        description: 'MERN-stack Development | React, Tailwind, Motion, Firebase, Express, MongoDB'
    },
    {
        title: 'GalaxiMart',
        year: 2025,
        description: 'MERN-stack Development | MERN Stack, Firebase, Motion'
    },
    {
        title: 'LifeDrop',
        year: 2025,
        description: 'MERN-stack Development | React, Tailwind, Motion, Firebase, Express, MongoDB'
    },
    {
        title: 'React-Setup-Pro',
        year: 2025,
        description: 'CLI Tool | Node, JavaScript, Chalk, Ora, Validate-npm-package'
    },
    {
        title: 'StudySphere',
        year: 2025,
        description: 'Student Life Toolkit | React, Tailwind, DaisyUI, Motion, Lottie React, Recharts, Swiper JS, Tanstack Query, Axios, Firebase, Google Generative AI, Express JS, Firebase Admin, MongoDB'
    }
]
const AboutMeComponent = () => {

    const experienceVariant = {
        initial: { x: -60, opacity: 0 },
        view: { x: 0, opacity: 1 }
    }
    const educationVariant = {
        initial: { x: 60, opacity: 0 },
        view: { x: 0, opacity: 1 }
    }

    return (
        <div className="min-h-screen bg-black text-white py-16 px-6 md:px-20 overflow-x-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col-reverse md:flex-row gap-10">
                    {/* Experience Section */}
                    <motion.div
                        variants={experienceVariant}
                        initial="initial"
                        whileInView="view"
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className='flex-1'>
                        <h3 className="text-xl font-semibold mb-6">Experience</h3>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.7 }}
                            className="border border-gray-800 p-2 md:p-6 rounded-lg md:px-8 flex flex-col-reverse">
                            {
                                experienceList.map((e, i) => (
                                    <motion.div
                                    initial={{opacity:0, x:-20}}
                                    whileInView={{opacity:1,x:0}}
                                    transition={{duration:0.3, staggerChildren:200}}
                                    key={i} className="group relative hover:bg-[rgb(31,31,31)] transition-colors duration-300 rounded-xl p-3">
                                        <div className="w-2 h-2 absolute -left-3.5 top-1 rounded-full bg-white" />
                                        <div className="bg-white w-[2px] h-10 absolute -left-3 transition-all duration-300 ease-in-out group-hover:h-full" />
                                        <p className="text-gray-400 text-sm">{e.year}</p>
                                        <p className="font-semibold text-lg">{e.title}</p>
                                        <p className="text-sm text-gray-400">{e.description}</p>
                                    </motion.div>
                                ))
                            }
                        </motion.div>
                    </motion.div>

                    {/* Education Section */}
                    {/* Education Section */}
                    <motion.div
                        variants={educationVariant}
                        initial="initial"
                        whileInView="view"
                        transition={{ duration: 0.7, ease: "easeInOut" }}
                        className='flex-1'>
                        <h3 className="text-xl font-semibold mb-6">Education</h3>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.7 }}
                            className="border border-gray-800 p-2 md:p-6 rounded-lg md:px-8">
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
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};
export default AboutMeComponent;