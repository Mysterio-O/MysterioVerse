import React from 'react';
import { motion } from 'framer-motion';
import { FaFigma, FaHtml5, FaCss3Alt, FaReact, FaFire, FaCode, FaNodeJs } from 'react-icons/fa';
import { SiDaisyui, SiMaterialformkdocs, SiPostman, SiFramer, SiFirebase, SiReacttable, SiTailwindcss, SiJavascript, SiExpress, SiMongodb, SiNextdotjs, } from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';

const toolsData = [
    { name: 'HTML5', icon: FaHtml5, category: 'Development' },
    { name: 'CSS3', icon: FaCss3Alt, category: 'Development' },
    { name: 'JavaScript', icon: SiJavascript, category: 'Development' },
    { name: 'React', icon: FaReact, category: 'Development' },
    { name: 'Next.js', icon: SiNextdotjs, category: 'Development' },
    { name: 'Tailwind', icon: SiTailwindcss, category: 'Development' },
    { name: 'Framer Motion', icon: SiFramer, category: 'Motion' },
    { name: 'MaterialUI', icon: SiMaterialformkdocs, category: 'Development' },
    { name: 'DaisyUI', icon: SiDaisyui, category: 'Development' },
    { name: 'Firebase', icon: SiFirebase, category: 'Development' },
    { name: 'ReactBits', icon: SiReacttable, category: 'Development' },
    { name: "NodeJs", icon: FaNodeJs, category: 'Development' },
    { name: 'ExpressJs', icon: SiExpress, category: 'Development' },
    { name: 'MongoDB', icon: SiMongodb, category: "Development" },
    { name: 'Mongoose', icon: FaDatabase, category: 'Development' },
    { name: 'Figma', icon: FaFigma, category: 'Tools' },
    { name: 'VS Code', icon: FaCode, category: 'Tools' },
    { name: 'Postman', icon: SiPostman, category: 'Tools' },
];


const ToolsSection = () => {
    return (
        <section className="bg-black text-white py-16 px-4 overflow-x-hidden">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-orange-500 mb-8">Tools</h2>
                <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold mb-12">THE KEY DESIGN AND DEVELOPMENT TOOLS I USE</h1>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                    {toolsData.map((tool, index) => (
                        <motion.div
                            key={index}
                            className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <tool.icon className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                            <p className="text-center text-lg">{tool.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ToolsSection;