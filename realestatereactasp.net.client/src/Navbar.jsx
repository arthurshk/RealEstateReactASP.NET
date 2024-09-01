import React from 'react';
import { Link } from 'react-router-dom';
import './navbarstyles.css'; 

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/" className="navbar-link">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/add-property" className="navbar-link">Add Property</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/login" className="navbar-link">Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
