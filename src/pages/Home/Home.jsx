import React from 'react';
import Banner from '../../components/Banner/Banner';
import TechCarousel from '../../components/TechCarousel/TechCarousel';
import AboutMe from '../../components/AboutMe/AboutMe';
import ContactMe from '../../components/ContactMe/ContactMe';
import MyProjects from '../../components/MyProjects/MyProjects';
import ToolsSection from '../../components/ToolsSection/ToolsSection';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    return (
        <div className='bg-[#111111]'>
            <div className=''>
                <Banner />
            </div>
            <div className=''>
                <TechCarousel />
            </div>
            <div id='about-me'>
                <AboutMe />
            </div>
            <div>
                <ToolsSection />
            </div>
            <div id='projects'>
                <MyProjects />
            </div>
            <div id='contact-me' className='bg-black'>
                <ContactMe />
            </div>
<div>
    <Footer/>
</div>
        </div>
    );
};

export default Home;