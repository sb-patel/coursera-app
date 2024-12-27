import React from 'react';

const Menu = () => {
    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                <a href="#" className="text-2xl font-bold text-gray-800">Udemy</a>
                <nav className="space-x-6">
                    <a href="#" className="text-gray-700 hover:text-gray-900">Categories</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">My Learning</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">Wishlist</a>
                    <a href="#" className="text-gray-700 hover:text-gray-900">Cart</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border border-gray-300 rounded-md px-3 py-1 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button className="text-white bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700">Login</button>
                    <button className="text-white bg-gray-800 px-4 py-2 rounded-md hover:bg-gray-900">Sign Up</button>
                </div>
            </div>
        </header>
    );
};

export default Menu;
