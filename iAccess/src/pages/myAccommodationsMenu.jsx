import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import "../styles/myAccommodations.css";

import homeImg from "../../public/home.png";
import briefcaseImg from "../../public/briefcase.png";
import backpackImg from "../../public/backpack.png";
import transitImg from "../../public/image 18.png";
import hospitalImg from "../../public/hospital-sign.png";
import earthImg from "../../public/planet-earth.png";

import assistiveTechImg from "../../public/Assistive Technology.png";
import caduceusImg from "../../public/Caduceus.png";
import lawImg from "../../public/Law.png";
import dictionaryImg from "../../public/Dictionary.png";
import saveImg from "../../public/save.png";
import backImg from "../../public/Back.png";

const MyAccommodations = () => {

  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get('location');

  const [selectedLocation, setSelectedLocation] = useState(location);
  const navigate = useNavigate();

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (url, event) => {
    //checking if the user selected the location
    if (!selectedLocation) {
      alert("Please select a location first");
      event.preventDefault(); // Prevent the default link click behavior
      return;
    }

    const newUrl = url + "?location=" + selectedLocation;

    navigate(newUrl);
  };
  const locations = [
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
  ];

  const categories = [
    {
      name: "Accessibility Category",
      img: assistiveTechImg,
      url: "/myaccessmenu",
    },
    { name: "Medical Conditions", img: caduceusImg, url: "/mymedicalconditions" },
  ];

  return (
    <div className="myAccommodations">
      <h1 className="myAccommodations-title">My Accommodations</h1>
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
      <div className="accessibility-categories-container">
        {categories.map((category) => (
          <div
            key={category.name}
            className="accessibility-category"
            onClick={(event) => checkBeforeNavigate(category.url, event)}
          >
            <img
              src={category.img}
              alt={category.name}
              className="accessibility-category-icon"
            />
            <span className="accessibility-category-name">{category.name}</span>
            <img
              src={backImg}
              alt="Back"
              className="accessibility-category-back"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAccommodations;
