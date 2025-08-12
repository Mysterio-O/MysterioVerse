import React from 'react';
import { motion } from 'motion/react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { MdOutlinePageview } from "react-icons/md";
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const MyProjects = () => {

    const { data: projects = [], isLoading, isError } = useQuery({
        queryKey: ['allProjects'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/projects`);
            // console.log(res);
            return res.data;
        }
    });
    console.log(projects);


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

                {
                    isLoading ? (
                        <div className="space-y-14">
                            {[...Array(3)].map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex flex-col lg:flex-row gap-8 items-center bg-[#111] p-6 rounded-2xl shadow-xl"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                                >
                                    {/* Skeleton Image */}
                                    <div className="skeleton w-full lg:w-1/2 h-64 rounded-xl"></div>

                                    {/* Skeleton Details */}
                                    <div className="flex-1 space-y-4 text-center lg:text-left">
                                        <div className="skeleton h-8 w-3/4 mx-auto lg:mx-0"></div>
                                        <div className="skeleton h-4 w-full"></div>
                                        <div className="skeleton h-4 w-5/6 mx-auto lg:mx-0"></div>

                                        <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="skeleton h-7 w-20 rounded-full"></div>
                                            ))}
                                        </div>

                                        <div className="flex justify-center lg:justify-start gap-4 mt-4">
                                            <div className="skeleton h-6 w-24"></div>
                                            <div className="skeleton h-6 w-24"></div>
                                            <div className="skeleton h-6 w-24"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : isError ? (
                        <motion.div
                            className="bg-[#111] p-6 rounded-2xl shadow-xl text-center"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-semibold text-red-500">Error Loading Projects</h3>
                            <p className="text-gray-400 mt-4">We encountered an issue while fetching the projects. Please try again later.</p>
                        </motion.div>
                    ) : (
                        <div className="space-y-14">
                            {projects.map(project => (
                                <motion.div
                                    key={project._id}
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
                                                className="flex items-center gap-2 text-green-500 hover:underline transition-all duration-300"
                                            >
                                                <FaExternalLinkAlt /> Live
                                            </a>
                                            <a
                                                href={project.githubLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                                            >
                                                <FaGithub /> Code
                                            </a>
                                            <Link to={`/project-details/${project?._id}`} className="flex items-center gap-2 text-[#53EAFD]/70 hover:text-[#53EAFD] transition-all duration-300">
                                                <MdOutlinePageview /> View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )
                }


            </div>
        </section>
    );
};

export default MyProjects;
