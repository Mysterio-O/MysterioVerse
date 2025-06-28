import React from 'react';
import Banner from '../../components/Banner/Banner';
import TechCarousel from '../../components/TechCarousel/TechCarousel';
import AboutMe from '../../components/AboutMe/AboutMe';

const Home = () => {
    return (
        <div className='bg-[#111111]'>
            <div className=''>
                <Banner />
            </div>
            <div className=''>
                <TechCarousel/>
            </div>
            <div>
                <AboutMe/>
            </div>
        </div>
    );
};

export default Home;