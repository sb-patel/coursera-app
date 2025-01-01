import React from "react";
import { useParams, useLocation } from "react-router-dom";

const CourseDetails = () => {
    const { id } = useParams(); // Get course ID from URL
    const location = useLocation(); // Contains the `state` passed during navigation
    const {state} = location;

    return (
        <div className="container mx-auto py-12">
            <h1 className="text-2xl font-bold mb-4">Course Details</h1>
            <p>Course ID: {id}</p>
            {/* <p>Course ID (from state): {state?.courseId}</p> */}
            {/* Add logic to fetch and display detailed course information */}
        </div>
    );
};

export default CourseDetails;
