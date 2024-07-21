import React, { useState } from 'react';
import '../styles/homepage.css';

import homeImg from '../../public/home.png';
import briefcaseImg from '../../public/briefcase.png';
import backpackImg from '../../public/backpack.png';
import transitImg from '../../public/image 18.png';
import hospitalImg from '../../public/hospital-sign.png';
import earthImg from '../../public/planet-earth.png';

import assistiveTechImg from '../../public/Assistive Technology.png';
import caduceusImg from '../../public/Caduceus.png';
import lawImg from '../../public/Law.png';
import dictionaryImg from '../../public/Dictionary.png';
import saveImg from '../../public/save-instagram.png';
import backImg from '../../public/Back.png';

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };
  const locations = [
    { name: 'Home', img: homeImg },
    { name: 'Work', img: briefcaseImg },
    { name: 'School', img: backpackImg },
    { name: 'Transit', img: transitImg },
    { name: 'Medical', img: hospitalImg },
    { name: 'All', img: earthImg },
  ];

  const categories = [
    { name: 'Accessibility Category', img: assistiveTechImg },
    { name: 'Medical Conditions', img: caduceusImg },
    { name: 'Legal', img: lawImg },
    { name: 'Dictionary', img: dictionaryImg },
    { name: 'My Accommodations', img: saveImg },
  ];

  return (
    <div className="homepage">
      <h1 className="homepage-title">Homepage</h1>
      <div className="navbar-container">
        {locations.map((location) => (
          <div
            key={location.name}
            className={`location ${selectedLocation === location.name ? 'selected' : ''}`}
            onClick={() => handleLocationClick(location.name)}
          >
            <img src={location.img} alt={location.name} className="location-img" />
            <span className="location-name">{location.name}</span>
          </div>
        ))}
      </div>
      <div className="categories-container">
        {categories.map((category) => (
          <div key={category.name} className="category">
            <img src={category.img} alt={category.name} className="category-icon" />
            <span className="category-name">{category.name}</span>
            <img src={backImg} alt="Back" className="category-back" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;

