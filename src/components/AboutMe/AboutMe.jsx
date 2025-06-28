import React, { useRef } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { AnimatePresence, motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import EmailButton from './EmailButton';
import profile from '../../assets/profile.jpg'

const AboutMe = () => {

    const ref = useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log("changed value", latest)
    })

    const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const blur = useTransform(scrollYProgress, [0, 0.5], [1,0]);
    const filter = useMotionTemplate`blur(${blur}px)`;

    return (
        <AnimatePresence>
            <motion.section
                style={{
                    opacity: contentOpacity,
                    filter
                }}
                ref={ref}
                className="min-h-screen bg-black text-white flex items-center px-6 md:px-20 py-18">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Section Title */}
                    <h2 className="text-3xl md:text-4xl font-semibold mb-10">
                        <span className="border-b-4 border-gray-500 pb-2">About Me</span>
                    </h2>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row items-start gap-10">
                        <div className="flex-1">
                            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight uppercase tracking-tight">
                                A full-stack developer with a <br />
                                knack for building clean UI <br />
                                and scalable backend systems.
                            </h1>

                            <p className="mt-6 text-lg text-gray-300 leading-relaxed">
                                I specialize in crafting dynamic, responsive web apps with modern technologies. My journey started with HTML and CSS, grew into JavaScript and React, and now I’m building real-world projects using Firebase, Express, and MongoDB. My goal is to contribute to meaningful digital products, learn from industry experts, and grow as a developer.
                            </p>

                            <p className="mt-4 text-gray-400">
                                I thrive on building seamless user experiences, developing smart backend APIs, and deploying real-world features that users love.
                            </p>
                        </div>

                        {/* Contact Info */}
                        <motion.a 
                        initial={{scale:0.8,opacity:0,y:20}}
                        whileInView={{scale:1,y:0,opacity:1}}
                        whileHover={{scale:1.1}}
                        whileTap={{scale:0.9}}
                        transition={{duration:0.3,ease:'easeInOut'}}
                        href="mailto:skrabbi.019@gmail.com"
                        className="bg-gradient-to-r from-gray-900 to-black p-6 rounded-2xl flex items-center space-x-4 shadow-lg">
                            <img
                                src={profile}
                                alt="Profile"
                                className="w-14 h-14 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-sm text-gray-400">GET IN TOUCH</p>
                                <EmailButton/>
                            </div>
                        </motion.a>
                    </div>

                    {/* Tech Stack Subsections */}
                    <div className="mt-14 grid md:grid-cols-2 gap-10">
                        <div>
                            <h3 className="text-xl font-bold mb-2">💻 Frontend Development</h3>
                            <p className="text-gray-400">
                                Proficient in React, Tailwind CSS, DaisyUI, React Router, and responsive design. Experienced in building animated UIs and form-driven features.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">⚙️ Backend & Database</h3>
                            <p className="text-gray-400">
                                Skilled in Node.js, Express.js, MongoDB. Built and deployed RESTful APIs with authentication, order management, and database integration.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">🔥 Firebase Integration</h3>
                            <p className="text-gray-400">
                                Integrated Firebase Auth, Firestore, and hosting in multiple projects for secure and scalable app delivery.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-2">🌍 Career Vision</h3>
                            <p className="text-gray-400">
                                Actively seeking freelance and remote roles to contribute to real-world projects and grow professionally. Planning to master Python and advanced stacks next.
                            </p>
                        </div>
                    </div>
                </div>
            </motion.section>
        </AnimatePresence>
    );
};

export default AboutMe;
