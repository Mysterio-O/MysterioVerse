import React from 'react';
import Banner from '../../components/Banner/Banner';
import TechCarousel from '../../components/TechCarousel/TechCarousel';

const Home = () => {
    return (
        <div className='bg-[#111111]'>
            <div className='z-10'>
                <Banner />
            </div>
            <div className='z-20'>
                <TechCarousel/>
            </div>
        </div>
    );
};

export default Home;