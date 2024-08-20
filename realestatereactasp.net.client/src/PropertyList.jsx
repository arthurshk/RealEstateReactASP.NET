import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7014/api/properties')
            .then(response => setProperties(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Property Listings</h1>
            <ul>
                {properties.map(property => (
                    <li key={property.id}>
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
