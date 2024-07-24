import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import "../styles/accessmenu.css";
import homeImg from "../../public/home.png";
import briefcaseImg from "../../public/briefcase.png";
import backpackImg from "../../public/backpack.png";
import transitImg from "../../public/image 18.png";
import hospitalImg from "../../public/hospital-sign.png";
import earthImg from "../../public/planet-earth.png";
import mobilityImg from "../../public/mobility.png";
import earImg from "../../public/ear.png";
import brainImg from "../../public/brain.png";
import mentalImg from "../../public/mental.png";
import sensorImg from "../../public/sensorial.png";
import allergyImg from "../../public/allergies.png";
import visionImg from "../../public/witness.png";
import painImg from "../../public/pain.png";
import stomachImg from "../../public/stomach.png";
import safetyImg from "../../public/prevention.png";
import medicalImg from "../../public/medical.png";

const AccessMenu = () => {

  const locat = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(locat.search); // Parse the query string
  const location = queryParams.get('location');
  const [selectedLocation, setSelectedLocation] = useState(location);
  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (category, event) => {   
    //checking if the user selected the location
    if (!selectedLocation) {
        alert('Please select a location first');
        event.preventDefault(); // Prevent the default link click behavior
        return;
    }

    const Url = "/accommodation?location="+ selectedLocation +"&category="+category;

    navigate(Url);

  }
  const locations = [
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
  ];

  const categories = [
    { name: "Mobility", img: mobilityImg }, // 1
    { name: "Hearing", img: earImg }, // 2
    { name: "Cognitive", img: brainImg }, // 3
    { name: "Mental Health", img: mentalImg }, // 4
    { name: "Sensory", img: sensorImg }, // 5
    { name: "Allergy", img: allergyImg }, // 6
    { name: "Vision", img: visionImg }, // 7
    { name: "Pain", img: painImg }, // 8
    { name: "Digestion", img: stomachImg }, // 9
    { name: "Safety", img: safetyImg }, // 10
    { name: "Medical Devices", img: medicalImg }, // 11
  ];

  return (
    <>
      <div className="access-page">
        <h1 className="header-title">Choose Your Accessibility</h1>
        <div className="navbar-container">
          {locations.map((location) => (
            <div
              key={location.name}
              className={`location ${
                selectedLocation === location.name ? "selected" : ""
              }`}
              onClick={() => handleLocationClick(location.name)}
            >
              <img
                src={location.img}
                alt={location.name}
                className="location-img"
              />
              <span className="location-name">{location.name}</span>
            </div>
          ))}
        </div>
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category.name} className="category" onClick={(event) => checkBeforeNavigate(category.name,event)}>
              <img
                src={category.img}
                alt={category.name}
                className="category-icon"
              />
              <span className="category-names">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AccessMenu;
