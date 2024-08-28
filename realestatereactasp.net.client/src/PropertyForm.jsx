import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const PropertyForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        e.preventDefault();

        const propertyData = {
            title,
            description,
            location,
            price: parseFloat(price),
            imageUrl,
        };

        axios.post('https://localhost:7014/api/properties', propertyData)
            .then(response => {
                console.log('Property added successfully:', response.data);
                navigate('/'); 
            })
            .catch(error => {
                console.error('There was an error!', error);
                if (error.response && error.response.status === 415) {
                    setError('Unsupported Media Type. Please ensure your input is correct.');
                } else if (error.response && error.response.status === 400) {
                    setError('Bad Request. Please check the input data.');
                } else {
                    setError('Failed to add property. Please try again later.');
                }
            });
    };

    return (
        <div>
            <h1>Add New Property</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                    />
                </div>
                <button type="submit">Add Property</button>
            </form>
        </div>
    );
};

export default PropertyForm;
