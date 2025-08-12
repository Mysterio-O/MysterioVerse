import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { FaExternalLinkAlt, FaGithub, FaArrowLeft } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProjectDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: projectData = [], isLoading, isError } = useQuery({
        queryKey: ['projectDetails', id],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/project/${id}`);
            return res.data;
        },
    });

    const project = projectData[0] || {};

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page
    };

    return (
        <section className="bg-black text-white py-10 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <motion.button
                    onClick={handleBack}
                    className="mb-6 flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <FaArrowLeft /> Back
                </motion.button>

                {isLoading ? (
                    <div className="space-y-8">
                        {/* Skeleton Slider */}
                        <div className="skeleton h-96 w-full rounded-2xl"></div>
                        {/* Skeleton Details */}
                        <div className="bg-[#111] p-6 rounded-2xl shadow-xl">
                            <div className="skeleton h-8 w-3/4 mb-4"></div>
                            <div className="skeleton h-4 w-full mb-2"></div>
                            <div className="skeleton h-4 w-5/6 mb-4"></div>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="skeleton h-7 w-20 rounded-full"></div>
                                ))}
                            </div>
                            <div className="skeleton h-6 w-1/2 mb-2"></div>
                            <div className="skeleton h-4 w-full mb-2"></div>
                            <div className="skeleton h-4 w-5/6 mb-4"></div>
                            <div className="skeleton h-6 w-1/2 mb-2"></div>
                            <div className="skeleton h-4 w-full mb-2"></div>
                            <div className="skeleton h-4 w-5/6 mb-4"></div>
                            <div className="flex gap-4">
                                <div className="skeleton h-6 w-24"></div>
                                <div className="skeleton h-6 w-24"></div>
                            </div>
                        </div>
                    </div>
                ) : isError ? (
                    <motion.div
                        className="bg-[#111] p-6 rounded-2xl shadow-xl text-center"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-semibold text-red-500">Error Loading Project Details</h3>
                        <p className="text-gray-400 mt-4">We encountered an issue while fetching the project details. Please try again later.</p>
                    </motion.div>
                ) : (
                    <div className="space-y-12">
                        {/* Image Slider */}
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                navigation={true}
                                pagination={{ clickable: true }}
                                autoplay={{ delay: 5000, disableOnInteraction: false }}
                                loop={true}
                                className="rounded-2xl overflow-hidden"
                                style={{ maxHeight: '600px' }}
                            >
                                {project.images?.map((img, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="flex items-center justify-center h-[50vh] md:h-[60vh] w-full">
                                            <img
                                                src={img}
                                                alt={`Project image ${idx + 1}`}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </motion.div>

                        {/* Project Details */}
                        <motion.div
                            className="bg-[#111] p-6 rounded-2xl shadow-xl hover:shadow-2xl transition"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-center lg:text-left">Project Details</h3>
                            
                            <div className="space-y-6">
                                {/* Description */}
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Description</h4>
                                    <p className="text-gray-400">{project.description}</p>
                                </div>

                                {/* Technologies */}
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.map((tech, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 text-sm bg-gray-800 rounded-full text-gray-300 hover:outline-1 hover:outline-cyan-300 transition-all duration-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Challenges */}
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Challenges</h4>
                                    <p className="text-gray-400">{project.challenges}</p>
                                </div>

                                {/* Future Improvements */}
                                <div>
                                    <h4 className="text-xl font-semibold mb-2">Future Improvements</h4>
                                    <p className="text-gray-400">{project.futureImprovements}</p>
                                </div>

                                {/* Links */}
                                <div className="flex justify-center lg:justify-start gap-4 mt-4">
                                    <a
                                        href={project.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-green-500 hover:underline transition-all duration-300"
                                    >
                                        <FaExternalLinkAlt /> Live Site
                                    </a>
                                    <a
                                        href={project.githubLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300"
                                    >
                                        <FaGithub /> GitHub Code
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectDetails;