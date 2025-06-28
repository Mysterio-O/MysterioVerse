import React, { useEffect, useState } from 'react';
import { RxCursorArrow } from 'react-icons/rx';
import GradientText from './banner_animations_contents/GradientText/GradientText';
import { AnimatePresence, motion } from "motion/react";
import BlurText from './banner_animations_contents/BlurText/BlurText';
import { GiSpiderWeb } from 'react-icons/gi';
import RotatingText from './banner_animations_contents/RotatingText/RotatingText';
import PortfolioBtn from './banner_animations_contents/Portfolio_Btn/PortfolioBtn';
import resume from '../../assets/pdfs/resume.pdf'
import TechCarousel from '../TechCarousel/TechCarousel';
import profile from '../../assets/profile.jpg'

const Banner = () => {

    const [isCursorIn, setIsCursorIn] = useState(false);
    const [moveRight, setMoveRight] = useState(false);
    const [spiderWeb, setSpiderWeb] = useState(false);
    const [color, setColor] = useState(false);

    const handleIn = () => {
        setIsCursorIn(true);
        setMoveRight(true);
        setTimeout(() => {
            setSpiderWeb(true);
        }, 1500);
    }

    useEffect(() => {
        setTimeout(() => {
            setSpiderWeb(true);
            setColor(true);
        }, 1800);
    }, [])


    const handleOut = () => {
        setIsCursorIn(false);
        setMoveRight(false);
        setSpiderWeb(false);
    }



    return (
        <div className='pt-24 min-h-[calc(100vh-220px)] w-full mx-auto overflow-x-hidden mb-5 md:mb-0'>

            <div className='flex flex-col lg:flex-row justify-between gap-16 w-full'>


                {/* left side contents container */}
                <div className='w-full flex flex-col justify-center items-center'>
                    <div className='flex items-center gap-4 md:gap-12 relative'>
                        <motion.img
                            onMouseEnter={handleIn}
                            onMouseOut={handleOut}
                            animate={{ scale: 1, x: 0 }}
                            whileHover={{
                                scale: 1.7,
                                x: 25,
                                transition: { type: "spring", stiffness: 300, mass: 2, damping: 30 }
                            }}
                            src={profile} alt="Profile"
                            className={`w-24 h-24 rounded-full z-0 transition-all duration-300 md:duration-75 cursor-pointer ${isCursorIn ? '-translate-y-20 translate-x-15 md:translate-y-0 md:translate-x-0' : 'translate-y-0 translate-x-0'} object-cover`} />

                        <span className={`absolute left-32 top-34 transition-all duration-300 ${isCursorIn ? 'text-green-500 scale-50 opacity-0 md:opacity-100 md:scale-100 -translate-x-4 translate-y-2 z-0' : 'scale-150 -translate-x-8 z-0'}`}>
                            <RxCursorArrow size={36} />
                        </span>
                        <h2 className={`uppercase text-3xl md:text-[5rem] text-[#FFFFFF] font-bold whitespace-nowrap transition-all duration-300 leading-[10rem] ${moveRight ? 'md:translate-x-6 translate-y-6 md:translate-y-0 -translate-x-13' : 'translate-x-0 translate-y-0'}`}>Hi, i am</h2>
                    </div>
                    <div>
                        <h2 className={`text-3xl md:text-[5rem] text-[#FFFFFF] font-bold whitespace-nowrap flex items-center contrast-50 transition-all duration-300 leading-[7rem] ${isCursorIn ? "translate-x-22 -translate-y-15 md:-translate-x-10 md:translate-y-0 contrast-100 scale-105 " : 'translate-x-0 translate-y-0 scale-100'}`}>Mysterio-<span>
                            <GradientText
                                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                                animationSpeed={50}
                                showBorder={false}
                                className="custom-class"
                            >
                                O
                            </GradientText>
                        </span>
                        </h2>
                        <AnimatePresence>
                            {
                                isCursorIn && <motion.div
                                    initial={{ scale: 0.7, x: -10, opacity: 0 }}
                                    animate={{ scale: 1, x: 0, opacity: 1 }}
                                    exit={{ scale: 0.7, x: -45, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className='flex gap-4 items-center max-w-full overflow-x-hidden'>
                                    <BlurText
                                        text="Not from Spider-Man Far From Home"
                                        delay={150}
                                        animateBy="words"
                                        direction="top"
                                        // onAnimationComplete={handleAnimationComplete}
                                        className={`text-white/70 md:text-2xl mb-8 md:whitespace-nowrap inline font-exo ${isCursorIn ? "translate-x-5" : ""}`}
                                    />
                                    {
                                        spiderWeb && <motion.span
                                            initial={{
                                                scale: 1.7,
                                                x: -15,
                                                y: 20
                                            }}
                                            animate={{
                                                scale: 1,
                                                x: 0,
                                                y: 0
                                            }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <GiSpiderWeb size={40} className='text-white/60'/>
                                        </motion.span>
                                    }
                                </motion.div>
                            }
                        </AnimatePresence>
                    </div>
                </div>


                {/* right side contents container */}
                <div className='w-full flex flex-col justify-start gap-10'>
                    <div className="text-2xl sm:text-3xl font-bold leading-tight text-white">
                        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
                            <span className="whitespace-nowrap"></span>
                            <RotatingText
                                texts={[
                                    'Pixel Crafter',
                                    'Bug Slayer',
                                    'Design Minded',
                                    'Fast Learner',
                                    '🔥 Focused',
                                    '🧠 Logical'
                                ]}
                                mainClassName="px-3 py-1 bg-cyan-300 text-black rounded-lg whitespace-nowrap min-w-[200px] max-w-full text-end"
                                staggerFrom="last"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.025}
                                splitLevelClassName="overflow-hidden"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={2000}
                            />
                        </div>
                        <p className="mt-2 text-cyan-400 text-center md:text-start">dev to provide you the best</p>
                    </div>

                    <div className='flex flex-col gap-4 items-center'>
                        <PortfolioBtn />
                        <a
                            href={resume}
                            download="resume">

                            <button className="cursor-pointer flex justify-between bg-gray-800 px-3 py-2 rounded-full text-white tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-mono w-[150px]">
                                Download Resume
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 animate-bounce">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>
                            </button>
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;