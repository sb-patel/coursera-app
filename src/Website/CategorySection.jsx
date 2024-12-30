import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const token = localStorage.getItem("token");


    useEffect(() => {
        // Fetch categories from API
        axios.get('http://localhost:3000/api/v1/category').
            then((response) => {
                setCategories(response.data.data);
                if (response.data.length > 0) {
                    setActiveCategory(response.data[0]._id);
                    fetchSubcategories(response.data[0]._id);
                }
            });
    }, []);

    const fetchSubcategories = (categoryId) => {
        axios
            .get(`http://localhost:3000/api/v1/subcategory/cat_id/${categoryId}`)
            .then((response) => {
                setSubcategories(response.data.data)
            });
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        fetchSubcategories(categoryId);
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
                    <div key={index} className="flex-shrink-0 bg-white shadow-md rounded-full px-6 py-3 text-center">
                        <h3 className="font-semibold text-gray-700">{subcategory.name}</h3>
                        <p className="text-sm text-gray-500">Explore now</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;