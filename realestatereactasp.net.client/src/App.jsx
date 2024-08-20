import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PropertyList from './PropertyList';
import PropertyForm from './PropertyForm';
import Navbar from './Navbar'; 

function App() {
    return (
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<PropertyList />} />
                    <Route path="/add-property" element={<PropertyForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
