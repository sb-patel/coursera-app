import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";

const HomePage = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <p>You must be logged in to view this page.</p>;
    }

    const [courses, setCourses] = useState([]);
    const [editCourse, setEditCourse] = useState(null);
    const [error, setError] = useState("");
    const [serverError, setServerError] = useState("");

    const handleRemove = async (id) => {
        const token = localStorage.getItem("token");

        try {
            await axios.delete(`http://localhost:3000/api/v1/admin/course/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            // Remove the course from the state
            setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
        }
        catch (error) {
            setServerError(error.response?.data?.message || "Failed to remove course.");
        }
    }

    const handleEdit = async (id, updatedData) => {
        const token = localStorage.getItem("token");

        try {
            const response = await axios.put(
                `http://localhost:3000/api/v1/admin/course/${id}`,
                updatedData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Update the course in the state
            setCourses((prevCourses) =>
                prevCourses.map((course) =>
                    course._id === id ? { ...course, ...response.data.course } : course
                )
            );

            console.log('received data');
            console.log(courses);

            // Clear edit state
            setEditCourse(null);
        } catch (err) {
            setServerError(error.response?.data?.message || "Failed to update course.");
        }
    };

    const startEdit = (course) => {
        setEditCourse(course);
    }

    const cancleEdit = () => {
        setEditCourse(null);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError("No token found ! Please log in !");
            return;
        }

        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/v1/admin/list', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data);
                setCourses(response.data.data);
            }
            catch (error) {
                console.error("Error fetching courses:", err);
                setError(err.response?.data?.message || "Failed to fetch courses.");
            }
        }

        fetchCourses();
    }, [])

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <p>This is Admin Home Page !</p>
            <h2>Your Courses</h2>
            {serverError ? (<p>serverError</p>) : ("")}

            {courses.length === 0 ? (
                <p>No courses found. Create one to get started!</p>
            ) : (
                <ul>
                    {courses.map((course) => (
                        editCourse && editCourse._id === course._id ? (
                            <li key={course._id}>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        const updatedData = {
                                            title: e.target.title.value,
                                            description: e.target.description.value,
                                            price: e.target.price.value,
                                            imageUrl: e.target.imageUrl.value,
                                        };
                                        handleEdit(course._id, updatedData);
                                    }}
                                >
                                    <input
                                        type="text"
                                        name="title"
                                        defaultValue={course.title}
                                        placeholder="Title"
                                    />
                                    <input
                                        type="text"
                                        name="description"
                                        defaultValue={course.description}
                                        placeholder="Description"
                                    />
                                    <input
                                        type="text"
                                        name="imageUrl"
                                        defaultValue={course.imageUrl}
                                        placeholder="Image"
                                    />
                                    <input
                                        type="number"
                                        name="price"
                                        defaultValue={course.price}
                                        placeholder="Price"
                                    />
                                    <button type="submit">Save</button>
                                    <button type="button" onClick={cancleEdit}>
                                        Cancel
                                    </button>
                                </form>
                            </li>
                        ) : (
                            <li key={course._id}>
                                <h3>{course.title}</h3>
                                <p>{course.description}</p>
                                <span>{course.price}</span>
                                <div>
                                    <button onClick={() => startEdit(course)}>Edit</button>
                                    <button onClick={() => handleRemove(course._id)}>Remove</button>
                                </div>
                            </li>
                        )
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HomePage;