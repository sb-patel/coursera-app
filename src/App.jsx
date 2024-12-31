import React, { useEffect, useState } from 'react';
import Menu from './Website/Menu';
import Footer from './Website/Footer';
import Courses from './Website/Courses';
import HomePageSlider from './Website/HomePageSlider';
import CategorySection from './Website/CategorySection';
import axios from 'axios';

const App = () => {
    const [courses, setCourses] = useState([]);

    return (
        <div className="bg-gray-50 font-sans">
            <Menu />
            <HomePageSlider />
            <CategorySection setCourses={setCourses}/>
            <Courses courses={courses} />
            <Footer />
        </div>
    );
};

export default App;