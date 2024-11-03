// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { z } from 'zod';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    // Define a schema for the login form
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });


    const handleLogin = async () => {
        try {
            const loginResult = loginSchema.safeParse({ email, password });
            // console.log('Login validation result:', loginResult);
            if (loginResult.success) {
                const response = await axios.post('http://localhost:3000/api/v1/admin/signin', { email, password });
                console.log('Login successful:', response.data);
                console.log('Login successful:', response.data.message);
                console.log('Login successful:', response.data.token);
            }
            else {
                console.log(loginResult.error);

                // const validationErrors = loginResult.error.issues.map(issue => issue.message);
                // console.log('Validation errors:', validationErrors);
            }
        }
        catch (error) {
            console.log(error);
            setError('Invalid email or password. Please try again.'); // You can customize the error message based on your API response
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            <form style={styles.form}>
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

                <button type="button" onClick={handleLogin}>
                    Login
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

export default Login;