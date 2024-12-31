const Courses = ({courses}) => {
    return (
        <section className="py-12 bg-gray-100">
            <div className="container mx-auto">
                <div className="flex space-x-4 scroll-hidden">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white shadow-md rounded-md overflow-hidden w-60">
                            <img src={course.imageUrl} alt={course.title} className="w-full h-40 object-cover" />
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
