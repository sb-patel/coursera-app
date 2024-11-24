import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App"; // Adjust the path based on your structure

const Navbar = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false); // Set login state to false
        localStorage.removeItem("token"); // Clear token
        navigate("/login"); // Redirect to login page
    };

    return (
        <div style={styles.navbar}>
            {!isLoggedIn ? (
                <>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/login">Login</Link>
                </>
            ) : (
                <>
                    <Link to="/home">Home</Link>
                    <button onClick={handleLogout}>Logout</button>
                </>
            )}
        </div>
    );
};

const styles = {
    navbar: {
        display: "flex",
        gap: "10px",
        marginBottom: "10px",
    },
};

export default Navbar;
