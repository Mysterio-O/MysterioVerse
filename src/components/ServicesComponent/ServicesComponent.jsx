import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaLaptopCode, FaLock, FaShoppingCart } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';

const ServiceCard = ({ icon, title, description, technologies }) => (
    <motion.div
        className="bg-[rgb(10,10,10)] hover:bg-[#202020] transition-colors duration-300 p-6 rounded-lg text-white flex-1 m-4 relative group border border-white/20"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex justify-between items-start mb-4">
            <div className='flex gap-4 mb-12'>
                <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-3xl">{icon}</motion.span>
                <motion.h3
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 }}
                    className="text-2xl font-bold mb-2">{title}</motion.h3>
            </div>
            <motion.div
                initial={{ scale: 0.75, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-xl -rotate-45 group-hover:rotate-0 group-hover:bg-white group-hover:text-black transition-all duration-300 rounded-full"
            >
                <MdArrowForward size={34} />
            </motion.div>
        </div>
        <motion.p
            initial={{ scale: 0.75, y: -20, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.6 }}
            className="mb-4 text-start text-gray-300">{description}</motion.p>
        <div className="text-sm text-gray-400">
            <ul className="list-none flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                    <motion.li
                        initial={{ scale: 0.75, opacity: 0, y: -15 }}
                        whileInView={{ scale: 1, opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut", delay: 0.1 * index}}
                        key={index} className="px-4 py-1.5 bg-gradient-to-r from-[rgba(10,10,10,1)] to-[rgba(33,33,33,1)] text-white p-2 rounded-full border border-white/20">{tech}</motion.li>
                ))}
            </ul>
        </div>
    </motion.div>
);

const ServicesComponent = () => {
    const services = [
        {
            icon: <FaHome />,
            title: 'Landing Pages',
            description: 'Crafting engaging single-page websites designed to convert visitors.',
            technologies: ['React', 'Tailwind', 'DaisyUI']
        },
        {
            icon: <FaLaptopCode />,
            title: 'Full Featured Frontend',
            description: 'Building dynamic and interactive user interfaces with modern tools.',
            technologies: ['React/Next', 'Tailwind', 'ReactBits', 'Motion', 'Lottie-React', 'React-Awesome-Components']
        },
        {
            icon: <FaLock />,
            title: 'Authentication',
            description: 'Implementing secure user authentication systems for your apps.',
            technologies: ['Firebase', 'Custom Authentication with Express', 'MongoDB/Mongoose']
        },
        {
            icon: <FaShoppingCart />,
            title: 'eCommercez',
            description: 'Creating robust eCommerce solutions with comprehensive features.',
            technologies: ['React/Next', 'Tailwind', 'Material UI', 'Motion', 'Axios', 'TanStack Query', 'Firebase', 'Express', 'Node', 'MongoDB/Mongoose']
        }
    ];

    return (
        <div className="bg-[#0A0A0A] text-center py-10 overflow-x-hidden">
            <div className='max-w-4xl mx-auto'>
                <div className='flex gap-10'>
                    <span
                        className=" text-[#FFFFFF] text-sm min-w-20">What I Do</span>
                    <motion.h1
                        initial={{ x: 100, opacity: 0, scale: 0.75 }}
                        whileInView={{ x: 0, opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="text-2xl md:text-4xl font-bold mb-8 text-white text-balance text-end">DIGITAL WEB DEVELOPMENT SERVICES I OFFER</motion.h1>
                </div>
                <div className="flex flex-wrap justify-center">
                    {services.slice(0, 2).map((service, index) => (
                        <ServiceCard key={index} {...service} />
                    ))}
                </div>
                <div className="flex flex-wrap justify-center">
                    {services.slice(2, 4).map((service, index) => (
                        <ServiceCard key={index + 2} {...service} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ServicesComponent;