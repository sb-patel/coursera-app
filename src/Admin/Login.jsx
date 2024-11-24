// Login.js
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();
    const { setIsLoggedIn } = useContext(AuthContext);

    // Define a schema for the login form
    const loginSchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });


    const handleLogin = async () => {
        try {
            setError('');
            setValidationErrors({});
            const loginResult = loginSchema.safeParse({ email, password });
            // console.log('Login validation result:', loginResult);
            if (!loginResult.success) {
                const errors = loginResult.error.format();

                setValidationErrors({
                    email: errors.email?._errors[0],
                    password: errors.password?._errors[0],
                });

                return;
            }
            // const validationErrors = loginResult.error.issues.map(issue => issue.message);
            // console.log('Validation errors:', validationErrors);

            const response = await axios.post('http://localhost:3000/api/v1/admin/signin', { email, password });
            console.log('Login successful:', response.data);
            console.log('Login successful:', response.data.message);
            console.log('Login successful:', response.data.token);

            localStorage.setItem('token',response.data.token);

            setIsLoggedIn(true);
            navigate("/home");
        }
        catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid email or password');
            }
            else {
                setError('An error occurred. Please try again later.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Admin Login</h2>
            <form style={styles.form}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {validationErrors.email && <p style={{ color: 'red' }}>{validationErrors.email}</p>}
                </div>

                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {validationErrors.password && <p style={{ color: 'red' }}>{validationErrors.password}</p>}
                </div>

                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
            {/* Display server error message, e.g., incorrect credentials */}
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

export default Login;