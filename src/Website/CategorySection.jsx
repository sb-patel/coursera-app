import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySection = ({ setCourses }) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const token = localStorage.getItem("token");


    useEffect(() => {
        // Fetch categories from API
        axios.get('http://localhost:3000/api/v1/category').
            then((response) => {
                setCategories(response.data.data);
                if (response.data.data.length > 0) {
                    setActiveCategory(response.data.data[0]._id);
                    fetchSubcategories(response.data.data[0]._id);
                }
            });
    }, []);

    const fetchSubcategories = (categoryId) => {
        axios.get(`http://localhost:3000/api/v1/category/${categoryId}/subcategories`).
            then((response) => {
                setSubcategories(response.data.data)
                if(response.data.data.length > 0){
                    setActiveSubCategory(response.data.data[0]._id);
                    fetchCourses(response.data.data[0]._id);
                }
            });
    };

    const fetchCourses = (subCategoryId) => {
        axios.get(`http://localhost:3000/api/v1/subcategory/${subCategoryId}/courses`).
        then((response) => {
            setCourses(response.data.data)
        });
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        fetchSubcategories(categoryId);
    };

    const handleSubCategoryClick = (subCategoryId) => {
        setActiveSubCategory(subCategoryId);
        fetchCourses(subCategoryId);
    };

    return (
        <section className="bg-white shadow-md py-4">
            <div className="container mx-auto flex items-center space-x-6 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category._id}
                        className={`category-link ${activeCategory === category._id ? 'text-blue-600 font-bold' : 'text-gray-700'
                            }`}
                        onClick={() => handleCategoryClick(category._id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="flex space-x-4 scroll-hidden mt-4">
                {subcategories.map((subcategory, index) => (
                    <button key={index} className={`flex-shrink-0 ${activeSubCategory === subcategory._id ? 'bg-gray-200' : 'bg-white'} shadow-md rounded-full px-6 py-3 text-center`} onClick={() => handleSubCategoryClick(subcategory._id)}>
                        <h3 className="font-semibold text-gray-700">{subcategory.name}</h3>
                        <p className="text-sm text-gray-500">Explore now</p>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;