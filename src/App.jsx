import React from 'react';
import Menu from './Website/Menu';
import Footer from './Website/Footer';
import Courses from './Website/Courses';
import HomePageSlider from './Website/HomePageSlider';
import CategorySection from './Website/CategorySection';

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