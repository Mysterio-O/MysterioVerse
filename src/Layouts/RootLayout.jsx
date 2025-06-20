import React from 'react';
import Navbar from '../components/Header/Navbar/Navbar';
import { Outlet } from 'react-router';
import ClickSpark from '../ClickSpark/ClickSpark';

const RootLayout = () => {
    return (
        <div className='min-h-screen relative font-mona-sans'>
            <ClickSpark>
                <section id="navbar" className='sticky top-0 left-0 w-full z-10'>
                    <Navbar />
                </section>


                <Outlet />


            </ClickSpark>
        </div>
    );
};

export default RootLayout;