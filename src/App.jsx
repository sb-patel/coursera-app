import React, { useEffect, useState } from 'react';
import Menu from './Website/Menu';
import Footer from './Website/Footer';
import Courses from './Website/Courses';
import HomePageSlider from './Website/HomePageSlider';
import CategorySection from './Website/CategorySection';
import axios from 'axios';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CourseDetails from './Website/CourseDetails';

const App = () => {
    const [courses, setCourses] = useState([]);

    return (
        <Router>
            <div className="bg-gray-50 font-sans">
                <Menu />

                <Routes>
                    <Route 
                        path='/' 
                        element={
                            <>
                                <HomePageSlider />
                                <CategorySection setCourses={setCourses}/>
                                <Courses courses={courses} />
                            </>
                        }
                    />
                    <Route 
                        path='/course/:id'
                        element={
                            <>
                                <CourseDetails />
                            </>
                        }
                    />
                </Routes>

                <Footer />
            </div>
        </Router>
    );
};

export default App;