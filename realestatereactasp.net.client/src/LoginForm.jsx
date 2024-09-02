import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

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

    const handleGoogleLoginSuccess = (response) => {
        console.log("Google Login Success", response);
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

                <div style={{ marginTop: '20px' }}>
                    <h3>Or login with Google</h3>
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        useOneTap
                    />
                </div>
            </div>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}/>
    );
}

export default LoginForm;
