// Signup.js
import React, { useContext, useState } from 'react';
import { z } from 'zod';
import axios  from 'axios';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    // Define a schema for the login form
    const signupSchema = z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const handleSignup = async (e) => {
        setValidationErrors({});
        setError('');
        e.preventDefault();
        
        // Add your signup logic here
        console.log('Signing up with:', { firstName, lastName, email, password });

        try {
            const signupResult = signupSchema.safeParse({ firstName, lastName, email, password });
            // console.log('Login validation result:', signupResult);
            if (!signupResult.success) {
                const errors = signupResult.error.format();

                setValidationErrors({
                    email: errors.email?._errors[0],
                    password: errors.password?._errors[0],
                    firstName: errors.firstName?._errors[0],
                    lastName: errors.lastName?._errors[0],
                });

                return;
            }
            const response = await axios.post('http://localhost:3000/api/v1/admin/signup', { firstName, lastName, email, password });
            console.log('Signup successful:', response.data.message);

            setIsLoggedIn(true);
            navigate('/home');

        }
        catch (error) {
            console.log(error.response.data.message);
            setError(error.response.data.message);
            // setError('Invalid Name, email or password. Please try again.'); // You can customize the error message based on your API response
        }
    };

    return (
        <div style={styles.container}>
            <h2>Admin Sign Up</h2>
            <form style={styles.form}>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                {validationErrors.firstName && <p style={{ color: 'red' }}>{validationErrors.firstName}</p>}
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                {validationErrors.lastName && <p style={{ color: 'red' }}>{validationErrors.lastName}</p>}
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {validationErrors.email && <p style={{ color: 'red' }}>{validationErrors.email}</p>}
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {validationErrors.password && <p style={{ color: 'red' }}>{validationErrors.password}</p>}
                <button type="button" onClick={handleSignup}>
                    Sign Up
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '400px',
        margin: 'auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
};

export default Signup;
