import React from 'react';
import Navbar from '../components/Header/Navbar/Navbar';
import { Outlet } from 'react-router';
import ClickSpark from '../ClickSpark/ClickSpark';
import { motion } from "motion/react";
import AIBubble from '../components/AIBubble/AIBubble';
import Scroll from '../Scroll/Scroll';

const RootLayout = () => {
    return (
        <div className='min-h-screen relative font-mona-sans bg-[#111111]'>
            <Scroll/>
            <ClickSpark>
                <motion.section
                    initial={{ y: -40 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5 }}
                    id="navbar" className='sticky top-0 left-0 w-full z-10'>
                    <Navbar />
                </motion.section>


                <Outlet />


                <motion.section>
                    <AIBubble />
                </motion.section>



            </ClickSpark>
        </div>
    );
};

export default RootLayout;