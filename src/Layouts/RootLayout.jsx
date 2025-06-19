import React from 'react';
import Navbar from '../components/Header/Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='bg-[#111111] min-h-screen relative'>
            <section id="navbar" className='fixed top-0 left-0 w-full z-10'>
                <Navbar/>
            </section>
        </div>
    );
};

export default RootLayout;