import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/accommodationsPage.css";

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

const AccommodationsPage = () => {
  const locat = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(locat.search); // Parse the query string
  const selectedLocation = queryParams.get("location");
  const selectedCategory = queryParams.get("category");

  console.log("Selected Location:", selectedLocation);
  console.log("Selected Category:", selectedCategory);

  const accommodationsData = {
    Vision: ["Accommodation 1 for Vision", "Accommodation 2 for Vision"],
    Hearing: ["Accommodation 1 for Hearing", "Accommodation 2 for Hearing"],
    Mobility: ["Accommodation 1 for Mobility", "Accommodation 2 for Mobility"],
    Cognitive: [
      "Accommodation 1 for Cognitive",
      "Accommodation 2 for Cognitive",
    ],
    MentalHealth: [
      "Accommodation 1 for Mental Health",
      "Accommodation 2 for Mental Health",
    ],
    Sensory: ["Accommodation 1 for Sensory", "Accommodation 2 for Sensory"],
    Allergy: ["Accommodation 1 for Allergy", "Accommodation 2 for Allergy"],
    Pain: ["Accommodation 1 for Pain", "Accommodation 2 for Pain"],
    Digestion: [
      "Accommodation 1 for Digestion",
      "Accommodation 2 for Digestion",
    ],
    Safety: ["Accommodation 1 for Safety", "Accommodation 2 for Safety"],
    MedicalDevices: [
      "Accommodation 1 for Medical Devices",
      "Accommodation 2 for Medical Devices",
    ],
  };

  const categoryItems = {
    Mobility: mobilityImg,
    Hearing: earImg,
    Cognitive: brainImg,
    MentalHealth: mentalImg,
    Sensory: sensorImg,
    Allergy: allergyImg,
    Vision: visionImg,
    Pain: painImg,
    Digestion: stomachImg,
    Safety: safetyImg,
    MedicalDevices: medicalImg,
  };

  const displayNames = {
    Mobility: "Mobility",
    Hearing: "Hearing",
    Cognitive: "Cognitive",
    MentalHealth: "Mental Health",
    Sensory: "Sensory",
    Allergy: "Allergy",
    Vision: "Vision",
    Pain: "Pain",
    Digestion: "Digestion",
    Safety: "Safety",
    MedicalDevices: "Medical Devices",
  };

  const locations = [
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
  ];

  return (
    <div className="accommodations-page">
      <div className="navbar-container">
        {locations.map((location) => (
          <div
            key={location.name}
            className={`location ${
              selectedLocation === location.name ? "selected" : ""
            }`}
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
      <h1>
        {displayNames[selectedCategory]} accommodations for {selectedLocation}
      </h1>
      {categoryItems[selectedCategory] && (
        <div className="category-image-container">
          <img
            src={categoryItems[selectedCategory]}
            alt={selectedCategory}
            className="category-img"
          />
        </div>
      )}
      <ul>
        {accommodationsData[selectedCategory]?.map((accommodation, index) => (
          <li key={index}>{accommodation}</li>
        ))}
      </ul>
    </div>
  );
};

export default AccommodationsPage;
