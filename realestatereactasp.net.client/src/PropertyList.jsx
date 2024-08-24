import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://localhost:7014/api/properties')
            .then(response => {
                console.log('API Response:', response.data);
                setProperties(response.data);
                setLoading(false); 
            })
            .catch(error => {
                console.error('Error fetching properties:', error);
                setError('Failed to load properties.');
                setLoading(false); 
            });
    }, []);

    return (
        <div>
            <h1>Property Listings</h1>
            {loading && <p>Loading...</p>} 
            {error && <p>{error}</p>} 
            {!loading && properties.length === 0 && !error && <p>No properties found.</p>} 
            <ul>
                {!loading && !error && properties.map((property, index) => (
                    <li key={`${property.id}-${index}`}>  
                        <h2>{property.title}</h2>
                        <p>{property.description}</p>
                        <p>{property.location}</p>
                        <p>${property.price}</p>
                        <img src={property.imageUrl} alt={property.title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyList;
