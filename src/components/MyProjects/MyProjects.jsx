import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import { MdOutlinePageview } from "react-icons/md";
import { Link, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';


const MyProjects = () => {

    const { user } = useContext(AuthContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        if (!user) {
            return setIsAdmin(false);
        }

        if (user?.email === adminEmail) {
            setIsAdmin(true);
        }
        else {
            setIsAdmin(false)
        }

    }, [user]);
    console.log(user);

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
        <section id="projects" className="bg-black text-white py-20 px-6 md:px-20 relative">
            <div className="max-w-7xl mx-auto">
                <motion.h2
                    className={`text-4xl md:text-5xl font-bold mb-12 ${isAdmin ? 'flex items-center gap-4 justify-center' : 'text-center'}`}
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    My Projects {
                        isAdmin && <motion.span
                            onClick={() => navigate('/control-projects')}
                            initial={{ scale: 1, rotate: 0 }}
                            whileHover={{ scale: 1.25, rotate: 180 }}
                            whileTap={{ scale: 0.55 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className='text-indigo-700 font-bold cursor-pointer'>
                            <IoMdAdd size={40} />
                        </motion.span>
                    }
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
                        <div className='sticky top-0'>
                            <div className="flex flex-col gap-14">
                                {projects.map((project, idx) => (
                                    <motion.div
                                        key={project._id}
                                        className={`flex flex-col lg:flex-row gap-8 items-center bg-[#111] p-6 rounded-2xl shadow-xl hover:shadow-2xl transition sticky top-30 -mb-20 z-[${idx * 10 + 10}]`}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Image Part */}
                                        <motion.img
                                            initial={{ scale: 0.9, opacity: 0 }}
                                            whileInView={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full lg:w-1/2 rounded-xl object-cover"
                                        />

                                        {/* Details Part */}
                                        <div className="flex-1 space-y-4 text-center lg:text-left">
                                            <motion.h3
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className="text-2xl md:text-3xl font-semibold text-white">{project.title}</motion.h3>
                                            <motion.p
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                                className="text-gray-400">{project.description}</motion.p>

                                            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                                                {project.technologies.map((tech, idx) => (
                                                    <motion.span
                                                        initial={{ scale: 0.9, y: -25, opacity: 0 }}
                                                        whileInView={{ scale: 1, y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.1 * idx }}
                                                        key={idx}
                                                        className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300 hover:outline-1 hover:outline-cyan-300 transition-all duration-300"
                                                    >
                                                        {tech}
                                                    </motion.span>
                                                ))}
                                            </div>

                                            <div className="flex justify-center lg:justify-start gap-4 mt-4">
                                                <motion.a
                                                    initial={{ scale: 0.75, opacity: 0, y: -10 }}
                                                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-green-500 hover:underline transition-all duration-300"
                                                >
                                                    <FaExternalLinkAlt /> Live
                                                </motion.a>
                                                <motion.a
                                                    initial={{ scale: 0.75, opacity: 0, y: -10 }}
                                                    whileInView={{ scale: 1, opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.4 }}
                                                    href={project.githubLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                                                >
                                                    <FaGithub /> Code
                                                </motion.a>
                                                <Link to={`/project-details/${project?._id}`} className="text-[#53EAFD]/70 hover:text-[#53EAFD] transition-all duration-300">
                                                    <motion.span
                                                        initial={{ scale: 0.75, opacity: 0, y: -10 }}
                                                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.6 }}
                                                        className='flex items-center gap-2'>
                                                        <MdOutlinePageview /> View Details
                                                    </motion.span>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )
                }


            </div>
        </section>
    );
};

export default MyProjects;
