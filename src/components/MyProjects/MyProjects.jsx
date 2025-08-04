import React from 'react';
import { motion } from 'motion/react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import galaxiImg from '../../assets/projectImages/galaximart.png';
import plantImg from '../../assets/projectImages/Screenshot 2025-06-29 105312.png'
import lifeDropImage from '../../assets/projectImages/life-drop.png';
import reactCLI from '../../assets/projectImages/CLI.png';

const projects = [
    {
        id: 1,
        title: 'GalaxiMart',
        description: 'GaalxiMart is an online wholesale web platform where users can browse a wide range of products across various categories.',
        image: galaxiImg,
        technologies: ['React', 'Tailwind', 'DaisyUI', 'Firebase', 'MongoDB', 'Motion', 'ReactBits', 'Swiper', 'Three', 'Axios', 'Gsap'],
        liveLink: 'https://galaxi-mart.netlify.app',
        githubLink: 'https://github.com/Mysterio-O/Galaximart-Client'
    },
    {
        id: 2,
        title: 'Plant_Pluse',
        description: 'Plant Pulse is a full-featured plant management application that allows users to explore, add, and manage plants. Built from scratch with modern tools and technologies, this project is both user-friendly and visually engaging.',
        image: plantImg,
        technologies: ['React', 'Tailwind', 'DaisyUI', 'Motion', 'Firebase', 'Lottie-React', 'Rechart', 'Swiper', 'ua-parser-js'],
        liveLink: 'https://plant-pulse.netlify.app',
        githubLink: 'https://github.com/Mysterio-O/Plant-Pluse'
    },
    {
        id: 3,
        title: "LifeDrop",
        description: "LifeDrop is a platform where user can either donate blood to others donation requests or request for blood on their own.",
        image: lifeDropImage,
        technologies: ['React', 'Tailwind', 'DaisyUI', 'Motion', "React Hook Form", "Axios", "React-Query", 'Firebase', 'Stripe', "React-Loading-skeleton", 'Jodit-React', 'Rechart', 'React-Tooltip' ],
        liveLink: 'https://life-drop-bd.netlify.app',
        githubLink: 'https://github.com/Mysterio-O/life-drop-client/tree/main'
    },
    {
        id:4,
        title: 'React Setup Pro CLI',
        description: "A full ready react project setup with tailwind configured, firebase authentication functions, axios interceptor setup, multiple custom hooks and theme provider with a theme toggle.",
        image: reactCLI,
        technologies: ['JavaScript', 'React', 'React Router','React Icons', "Motion", "Tailwind", "DaisyUI", 'Firebase', "Axios", "React Query", "Chalk", "Ora", "Validate npm package name"],
        liveLink: 'https://www.npmjs.com/package/react-setup-pro',
        githubLink: 'https://github.com/Mysterio-O/react-setup-pro'
    }
];

const MyProjects = () => {
    return (
        <section id="projects" className="bg-black text-white py-20 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    My Projects
                </motion.h2>

                <div className="space-y-14">
                    {projects.map(project => (
                        <motion.div
                            key={project.id}
                            className="flex flex-col lg:flex-row gap-8 items-center bg-[#111] p-6 rounded-2xl shadow-xl hover:shadow-2xl transition"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Image Part */}
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full lg:w-1/2 rounded-xl object-cover"
                            />

                            {/* Details Part */}
                            <div className="flex-1 space-y-4 text-center lg:text-left">
                                <h3 className="text-2xl md:text-3xl font-semibold text-white">{project.title}</h3>
                                <p className="text-gray-400">{project.description}</p>

                                <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                    {project.technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300 hover:outline-1 hover:outline-cyan-300 transition-all duration-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-center lg:justify-start gap-4 mt-4">
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-green-500 hover:underline"
                                    >
                                        <FaExternalLinkAlt /> Live
                                    </a>
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-400 hover:text-white"
                                    >
                                        <FaGithub /> Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MyProjects;
