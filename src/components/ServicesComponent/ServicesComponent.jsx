import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaLaptopCode, FaLock, FaShoppingCart } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';

const ServiceCard = ({ icon, title, description, technologies }) => (
    <motion.div
        className="bg-[rgb(10,10,10)] hover:bg-[#202020] transition-colors duration-300 p-6 rounded-lg text-white flex-1 m-4 relative group border border-white/20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className="flex justify-between items-start mb-4">
            <div className='flex gap-4 mb-12'>
                <span className="text-3xl">{icon}</span>
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
            </div>
            <div
                className="text-xl -rotate-45 group-hover:rotate-0 group-hover:bg-white group-hover:text-black transition-all duration-300 rounded-full"
            >
                <MdArrowForward size={34}/>
            </div>
        </div>
        <p className="mb-4 text-start text-gray-300">{description}</p>
        <div className="text-sm text-gray-400">
            <ul className="list-none flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                    <li key={index} className="px-4 py-1.5 bg-gradient-to-r from-[rgba(10,10,10,1)] to-[rgba(33,33,33,1)] text-white p-2 rounded-full border border-white/20">{tech}</li>
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
        <div className="bg-[#0A0A0A] text-center py-10">
            <div className='max-w-4xl mx-auto'>
                <div className='flex gap-10'>
                    <span className=" text-[#FFFFFF] text-sm min-w-20">What I Do</span>
                    <h1 className="text-2xl md:text-4xl font-bold mb-8 text-white text-balance text-end">DIGITAL WEB DEVELOPMENT SERVICES I OFFER</h1>
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