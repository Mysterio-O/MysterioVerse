import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
    SiReact,
    SiTailwindcss,
    SiDaisyui,
    SiMaterialformkdocs,
    SiFirebase,
    SiFramer,
    SiExpress,
    SiMongodb,
    SiNodedotjs,
    SiVite,
} from 'react-icons/si';

const technologies = [
    { name: 'React', icon: <SiReact className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'DaisyUI', icon: <SiDaisyui className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'Material UI', icon: <SiMaterialformkdocs className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'Firebase', icon: <SiFirebase className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'Framer Motion', icon: <SiFramer className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'Express', icon: <SiExpress className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'MongoDB', icon: <SiMongodb className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'Node.js', icon: <SiNodedotjs className="h-8 w-8 md:w-16 md:h-16" /> },
    { name: 'Vite', icon: <SiVite className="h-8 w-8 md:w-16 md:h-16" /> },
];





const TechCarousel = () => {

    const [animationDuration, setAnimationDuration] = useState(window.innerWidth < 768 ? 15 : 30);

    const [randomNumber, setRandomNumber] = useState(window.innerWidth < 576 ? 1 : 5);


    const getRandomWave = () => {
        const amplitude = 5 + Math.random() * randomNumber; // Random amplitude 
        const duration = 5 + Math.random() * randomNumber; // Random duration 
        return { amplitude, duration };
    };


    useEffect(() => {
        const handleResize = () => {
            setAnimationDuration(window.innerWidth < 768 ? 15 : 30);
        };
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const handleNumber = () => {
            setRandomNumber(window.innerWidth < 576 ? 1 : 5)
        }
        window.addEventListener("resize", handleNumber);
        handleNumber();
        return () => window.removeEventListener("resize", handleNumber);
    }, [])

    console.log(animationDuration)


    // Duplicate technologies multiple times to ensure seamless looping
    const extendedTechnologies = [...technologies, ...technologies, ...technologies, ...technologies, ...technologies,];

    return (
        <section className="h-32 md:mt-10 lg:mt-0">
            <div className="container mx-auto">
                <div className="overflow-hidden py-4">
                    <motion.div
                        className="flex"
                        initial={{ x: 0 }}
                        animate={{
                            x: `-${(100 / extendedTechnologies.length) * technologies.length}%`, // Translate only the width of one set
                            transition: {
                                x: {
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    duration: animationDuration,
                                    ease: 'linear',
                                },
                            },
                        }}
                        style={{ width: `${(extendedTechnologies.length / technologies.length) * 100}%` }} // Ensure wide enough
                    >
                        {extendedTechnologies.map((tech, index) => {
                            const { amplitude, duration } = getRandomWave();
                            return (
                                <div
                                    key={`${tech.name}-${index}`}
                                    className="flex-shrink-0 mx-12 flex flex-col items-center"
                                >
                                    {/* HIGHLIGHT: Wrap icon in motion.div for y-axis wave animation */}
                                    <motion.div
                                        className="text-white hover:text-[#53EAFD] transition-colors duration-300"
                                        animate={{
                                            y: [0, -amplitude, 0, amplitude, 0], // Wave motion: up, center, down, center
                                            transition: {
                                                y: {
                                                    repeat: Infinity,
                                                    repeatType: 'loop',
                                                    duration: duration,
                                                    ease: 'easeInOut',
                                                },
                                            },
                                        }}
                                    >
                                        {tech.icon}
                                    </motion.div>
                                    <span className="text-white text-lg mt-3">{tech.name}</span>
                                </div>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default TechCarousel;