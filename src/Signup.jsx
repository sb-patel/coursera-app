// Signup.js
import React, { useState } from 'react';
import { z } from 'zod';
import axios  from 'axios';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Define a schema for the login form
    const signupSchema = z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const handleSignup = async (e) => {
        e.preventDefault();
        
        // Add your signup logic here
        console.log('Signing up with:', { firstName, lastName, email, password });

        try {
            const signupResult = signupSchema.safeParse({ firstName, lastName, email, password });
            // console.log('Login validation result:', signupResult);
            if (signupResult.success) {
                const response = await axios.post('http://localhost:3000/api/v1/user/signup', { firstName, lastName, email, password });
                console.log('Signup successful:', response.data.message);
            }
            else {
                console.log(signupResult.error);

                // const validationErrors = loginResult.error.issues.map(issue => issue.message);
                // console.log('Validation errors:', validationErrors);
            }
        }
        catch (error) {
            console.log(error);
            setError('Invalid Name, email or password. Please try again.'); // You can customize the error message based on your API response
        }
    };

    return (
        <div style={styles.container}>
            <h2>Sign Up</h2>
            <form style={styles.form}>
                <label>First Name:</label>
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="button" onClick={handleSignup}>
                    Sign Up
                </button>
            </form>
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
