import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch courses from API
        axios.get('/api/getCourses').then((response) => setCourses(response.data));
    }, []);

    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Courses</h2>
                <div className="flex space-x-4 scroll-hidden">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white shadow-md rounded-md overflow-hidden w-60">
                            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-700">{course.title}</h3>
                                <p className="text-sm text-gray-600 mt-2">{course.description}</p>
                                <span className="text-blue-600 font-bold mt-2 block">${course.price}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Courses;
