import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import axios from "axios";



const HomePage = () => {
    const { isLoggedIn } = useContext(AuthContext);

    if (!isLoggedIn) {
        return <p>You must be logged in to view this page.</p>;
    }

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState("");

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
            {courses.length === 0 ? (
                <p>No courses found. Create one to get started!</p>
            ) : (
                <ul>
                    {courses.map((course) => (
                        <li key={course._id}>
                            <h3>{course.title}</h3>
                            <h3>{course.description}</h3>
                            <h3>{course.price}</h3>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};

export default HomePage;