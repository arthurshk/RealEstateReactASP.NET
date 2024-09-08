import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []); 

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                navigate('/');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        try {
            const idToken = response.credential;
            const backendResponse = await axios.post('/api/auth/google-login', { token: idToken });

            if (backendResponse.status === 200) {
                const jwtToken = backendResponse.data.token;
                localStorage.setItem('jwtToken', jwtToken);
                navigate('/');
            }
        } catch (error) {
            console.error("Error during Google login process", error);
        }
    };

    const handleGoogleLoginFailure = (error) => {
        console.error("Google Login Failed", error);
    };

    return (
        <div>
            <h2>Login</h2>
            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginFailure}
                    useOneTap
                />
            </GoogleOAuthProvider>
            <p>or</p>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <button onClick={() => navigate('/register')}>Register here</button></p>
        </div>
    );
}

export default LoginForm;
