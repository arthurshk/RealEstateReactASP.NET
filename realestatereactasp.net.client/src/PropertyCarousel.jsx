import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from 'react';
import Slider from 'react-slick';
import './PropertyCarousel.css'; 
const properties = [
    { id: 1, imageUrl: 'https://www.qantas.com/content/dam/qantas/destinations/hawaii/kualoa-oahu-hawaii.jpg/jcr:content/renditions/hero.desktop.jpg', title: 'Property 1', description: 'Description for property 1' },
    { id: 2, imageUrl: 'path/to/image2.jpg', title: 'Property 2', description: 'Description for property 2' },
    { id: 3, imageUrl: 'path/to/image3.jpg', title: 'Property 3', description: 'Description for property 3' },
    
];

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
};

function PropertyCarousel() {
    return (
        <div className="property-carousel">
            <Slider {...settings}>
                {properties.map(property => (
                    <div key={property.id} className="property-slide">
                        <img src={property.imageUrl} alt={property.title} />
                        <h3>{property.title}</h3>
                        <p>{property.description}</p>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default PropertyCarousel;