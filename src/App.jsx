import React from 'react';
import Menu from './Website/Menu';
import HomePageSlider from './Website/HomePageSlider';
import CategorySection from './Website/CategorySection';
import Courses from './Website/Courses';
import Footer from './Website/Footer';

const App = () => {
    return (
        <div className="bg-gray-50 font-sans">
            <Menu />
            <HomePageSlider />
            <CategorySection />
            <Courses />
            <Footer />
        </div>
    );
};

export default App;
