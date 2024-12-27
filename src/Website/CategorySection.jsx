import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);

    useEffect(() => {
        // Fetch categories from API
        axios.get('/api/getCategories').then((response) => {
            setCategories(response.data);
            if (response.data.length > 0) {
                setActiveCategory(response.data[0].name);
                fetchSubcategories(response.data[0].name);
            }
        });
    }, []);

    const fetchSubcategories = (categoryName) => {
        axios
            .get(`/api/getCategorySubcategories?category=${categoryName}`)
            .then((response) => setSubcategories(response.data));
    };

    const handleCategoryClick = (categoryName) => {
        setActiveCategory(categoryName);
        fetchSubcategories(categoryName);
    };

    return (
        <section className="bg-white shadow-md py-4">
            <div className="container mx-auto flex items-center space-x-6 overflow-x-auto scrollbar-hide">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        className={`category-link ${activeCategory === category.name ? 'text-blue-600 font-bold' : 'text-gray-700'
                            }`}
                        onClick={() => handleCategoryClick(category.name)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
            <div className="flex space-x-4 scroll-hidden mt-4">
                {subcategories.map((subcategory, index) => (
                    <div key={index} className="flex-shrink-0 bg-white shadow-md rounded-full px-6 py-3 text-center">
                        <h3 className="font-semibold text-gray-700">{subcategory}</h3>
                        <p className="text-sm text-gray-500">Explore now</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
