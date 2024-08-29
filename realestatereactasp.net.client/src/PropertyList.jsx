import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = () => {
        axios.get('https://localhost:7014/api/properties')
            .then(response => {
                setProperties(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                setError('Failed to load properties.');
                setLoading(false);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`https://localhost:7014/api/properties/${id}`)
            .then(response => {
                console.log('Property deleted successfully:', response.data);
                setProperties(properties.filter(property => property.id !== id));
                window.location.reload();
            })
            .catch(error => {
                console.error('There was an error deleting the property!', error);
                setError('Failed to delete property.');
            });
    };

    return (
        <div className="container">
            <h1>Property Listings - Put your listing while on vacation!</h1>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {!loading && properties.length === 0 && !error && <p>No properties found.</p>}
            <ul>
                {!loading && !error && properties.map(property => (
                    <li key={property.id}>
                        <h2>{property.title}</h2>
                        <p>{property.description}</p>
                        <p>{property.location}</p>
                        <p>${property.price}</p>
                        <img src={property.imageUrl} alt={property.title}/>
                        <button onClick={() => handleDelete(property.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyList;
