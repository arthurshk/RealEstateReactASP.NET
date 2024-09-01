import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import Navbar from './Navbar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<PropertyList />} />
                    <Route path="/add-property" element={<PropertyForm />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
