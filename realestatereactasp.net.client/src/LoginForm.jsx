import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { email, password });
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('jwtToken', token);
                window.location.href = '/';
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
                window.location.href = '/';
            } else {
                console.error("Failed to authenticate with backend", backendResponse);
            }
        } catch (error) {
            console.error("Error during Google login process", error);
        }
    };

    const handleGoogleLoginFailure = (response) => {
        console.error("Google Login Failed", response);
    };

    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <button onClick={() => navigate('/register')}>Register here</button></p>

                <GoogleLogin
                    onSuccess={handleGoogleLoginSuccess}
                    onFailure={handleGoogleLoginFailure}
                    useOneTap
                />
            </div>
        </GoogleOAuthProvider>
    );
}

export default LoginForm;
