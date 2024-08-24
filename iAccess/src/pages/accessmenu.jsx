import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "../styles/accessmenu.css";
import homeImg from "../../public/01-home.png";
import briefcaseImg from "../../public/02-work.png";
import backpackImg from "../../public/03-school.png";
import transitImg from "../../public/04-transit.png";
import hospitalImg from "../../public/05-medical.png";
import earthImg from "../../public/06-all.png";

import visionImg from "../../public/01-vision.png";
import earImg from "../../public/02-hearing.png";
import mobilityImg from "../../public/03-mobility.png";
import brainImg from "../../public/04-cognitive.png";
import sensorImg from "../../public/05-sensory.png";
import allergyImg from "../../public/06-allergy.png";
import safetyImg from "../../public/07-safety.png";
import stomachImg from "../../public/08-digestion.png";
import painImg from "../../public/9-pain.png";
import medicalImg from "../../public/10-medical devices.png";
import mentalImg from "../../public/11-mental health.png";
import medicationImg from "../../public/12-medication.png";

const AccessMenu = () => {
  const locat = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(locat.search); // Parse the query string
  const location = queryParams.get("location");
  const medicalCondition = queryParams.get('medicalCondition');
  const [selectedLocation, setSelectedLocation] = useState(location);
  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (category, event) => {
    // checking if the user selected the location
    if (!selectedLocation) {
      alert("Please select a location first");
      event.preventDefault(); // Prevent the default link click behavior
      return;
    }

    let Url =
      "/accommodation?location=" + selectedLocation + "&category=" + category;

    if (medicalCondition) {
      Url += `&medicalCondition=${medicalCondition}`;
    }

    navigate(Url);
  };

  const locations = [
    { name: "Home", img: homeImg, area: "Home" },
    { name: "Work", img: briefcaseImg, area: "Work"},
    { name: "School", img: backpackImg, area: "School" },
    { name: "Transit", img: transitImg, area: "Transit" },
    { name: "Medical", img: hospitalImg, area: "Medical" },
    { name: "All", img: earthImg, area: "All Locations" },
  ];

  const categories = [
    { name: "Vision", img: visionImg },
    { name: "Hearing", img: earImg },
    { name: "Mobility", img: mobilityImg },
    { name: "Cognitive", img: brainImg },
    { name: "Sensory", img: sensorImg },
    { name: "Allergy", img: allergyImg },
    { name: "Safety", img: safetyImg },
    { name: "Digestion", img: stomachImg },
    { name: "Pain", img: painImg },
    { name: "Medical Devices", img: medicalImg },
    { name: "Mental Health", img: mentalImg },
    { name: "Medication", img: medicationImg },
  ];


  return (
    <>
      <div className="access-menu-page">
        <h1 className="header-access-menu-title">
          Accessibility Categories
        </h1>
        {medicalCondition && (
                        <h2 className="header-access-menu-title">  {medicalCondition}</h2>
                    )}
        <div className="navbar-access-menu-container">
          {locations.map((location) => (
            <a
              key={location.name}
              href="#"
              aria-label={`${location.area}${selectedLocation === location.name ? " (selected)" : ""}`}
              className={`location-access-menu ${
                selectedLocation === location.name ? "selected" : ""
              }`}
              onClick={() => handleLocationClick(location.name)}
            >
              <img
                src={location.img}
                alt={location.name}
                className="location-access-menu-img"
              />
              <span className="location-access-menu-name">{location.name}</span>
            </a>
          ))}
        </div>
        <div className="categories-access-menu-container">
          {categories.map((category) => (
            <a
              key={category.name}
              href="#"
              className="category-access-menu"
              onClick={(event) => checkBeforeNavigate(category.name, event)}
            >
              <img
                src={category.img}
                alt={category.name}
                className="category-access-menu-icon"
              />
              <span className="category-access-menu-names">
                {category.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default AccessMenu;
