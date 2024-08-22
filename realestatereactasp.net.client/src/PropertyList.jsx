import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7014/api/properties')
            .then(response => {
                console.log(response.data); 
                setProperties(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Property Listings</h1>
            <ul>
                {properties.map((property, index) => (
                    <li key={property.Id || index}>
                        <h2>{property.Title}</h2>
                        <p>{property.Description}</p>
                        <p>{property.Location}</p>
                        <p>${property.Price}</p>
                        <img src={property.ImageUrl} alt={property.Title} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PropertyList;
