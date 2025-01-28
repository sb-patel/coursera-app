import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const CategorySection = ({ setCourses }) => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [activeCategory, setActiveCategory] = useState(null);
    const [activeSubCategory, setActiveSubCategory] = useState(null);
    const categoryRef = useRef(null);
    const [cache, setCache] = useState({});

    useEffect(() => {
        // Fetch categories from API
        axios.get('http://localhost:3000/api/v1/category')
            .then((response) => {
                setCategories(response.data.data);
                if (response.data.data.length > 0) {
                    setActiveCategory(response.data.data[0]._id);
                    fetchSubcategories(response.data.data[0]._id);
                }
            });
    }, []);

    const fetchSubcategories = async (categoryId) => {
        try{
            if(cache[categoryId]?.subcategories){
                setSubcategories(cache[categoryId].subcategories);
                setActiveSubCategory(cache[categoryId].activeSubCategory);
                setCourses(cache[categoryId].courses);
                return;
            }

            const response = await axios.get(`http://localhost:3000/api/v1/category/${categoryId}/subcategories`);

            setSubcategories(response.data.data);
            if (response.data.data.length > 0) {
                setActiveSubCategory(response.data.data[0]._id);
                
                const subCategoryCourses = await fetchCourses(response.data.data[0]._id);
                setCache((prevCache) => ({
                    ...prevCache,
                    [categoryId]: {
                        subcategories: response.data.data,
                        activeSubCategory: response.data.data[0]._id,
                        courses: subCategoryCourses ? subCategoryCourses : []
                    },
                }));
            }
        }
        catch(error){

        }
    };

    const fetchCourses = (subCategoryId) => {
        return axios
            .get(`http://localhost:3000/api/v1/subcategory/${subCategoryId}/courses`)
            .then((response) => {
                setCourses(response.data.data); // Update the courses state
                return response.data.data; // Return the courses data
            })
            .catch((error) => {
                console.error("Error fetching courses:", error);
                return []; // Return an empty array on error
            });
    };

    const handleCategoryClick = (categoryId) => {
        setActiveCategory(categoryId);
        fetchSubcategories(categoryId);
    };

    const handleSubCategoryClick = async (subCategoryId, categoryId) => {
        setActiveSubCategory(subCategoryId);
        const courses = await fetchCourses(subCategoryId);

        setCache((prevCache) => ({
            ...prevCache,
            [categoryId]: {
                ...prevCache[categoryId], // Preserve existing data for the category
                activeSubCategory: subCategoryId,
                courses: courses ? courses : []
            },
        }));
    };

    const scrollContainer = (direction) => {
        const container = categoryRef.current;
        const scrollAmount = 300; // Adjust scroll distance as needed
        container.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    };

    return (
        <section className="bg-white shadow-md py-4">
            <div className="container mx-auto flex items-center space-x-6 border-b border-gray-300 pb-3 mb-10">
                {categories.map((category) => (
                    <button
                        key={category._id}
                        className={`category-link ${activeCategory === category._id ? 'text-blue-600 font-bold' : 'text-gray-700'}`}
                        onClick={() => handleCategoryClick(category._id)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            <div className="relative">
                {/* Scroll Buttons for Subcategories */}
                <button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-200 border border-gray-300 shadow-md rounded-full p-2 hover:bg-gray-400"
                    onClick={() => scrollContainer(-1)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>

                <div
                    className="container mx-auto flex space-x-4 overflow-x-auto scrollbar-hide"
                    ref={categoryRef}
                >
                    {subcategories.map((subcategory, index) => (
                        <button
                            key={index}
                            className={`flex-shrink-0 ${activeSubCategory === subcategory._id ? 'bg-gray-800' : 'bg-gray-200'} shadow-md rounded-full px-6 py-3 text-center`}
                            onClick={() => handleSubCategoryClick(subcategory._id, subcategory.categoryId)}
                        >
                            <h3 className={`font-bold ${activeSubCategory === subcategory._id ? 'text-white' : 'text-gray-700'}`}>
                                {subcategory.name}
                            </h3>
                            <p className={`text-sm ${activeSubCategory === subcategory._id ? 'text-white' : 'text-gray-500'}`}>Explore now</p>
                        </button>
                    ))}
                </div>

                <button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-200 border border-gray-300 shadow-md rounded-full p-2 hover:bg-gray-400"
                    onClick={() => scrollContainer(1)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6 text-gray-600"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* Internet Explorer 10+ */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>
        </section>
    );
};

export default CategorySection;