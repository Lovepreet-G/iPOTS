import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from 'axios';

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
import medicationImg from "../../public/12-medication.png";


import grayVisionImg from "../../public/01-vision-grey.png";
import grayEarImg from "../../public/02-hearing-grey.png";
import grayMobilityImg from "../../public/03-mobility-grey.png"; // Gray images
import grayBrainImg from "../../public/04-cognitive-grey.png";
import graySensorImg from "../../public/05-sensory-grey.png";
import grayAllergyImg from "../../public/06-allergy-grey.png";
import graySafetyImg from "../../public/07-safety-grey.png";
import grayStomachImg from "../../public/08-digestion-grey.png";
import grayPainImg from "../../public/09-pain-grey.png";
import grayMedicalImg from "../../public/10-medical devices-grey.png";
import grayMentalImg from "../../public/11-mental health-grey.png";
import grayMedicationImg from "../../public/12-medication-grey.png";

const AccessMenu = () => {
  const locat = useLocation(); // Get the current location object
  const host = "http://localhost";
  const userId = '1';
  const queryParams = new URLSearchParams(locat.search); // Parse the query string
  const location = queryParams.get("location");
  const medicalCondition = queryParams.get('medicalCondition');
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [myAccessibilityCat, setMyAccessibilityCat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // for fetching data from database when page loads 
    const fetchmyAccessibilityCat = async () => {
        try {
            const params = {
                method: 'Category',
                userId: userId,
                location: location
            };
            
            // Checking if the user is coming from the medical page
            if (medicalCondition) {
                params.medicalCondition = medicalCondition;
            }
            
            const url = host + '/iPots/iAccess-Server/myAccessibility.php';
            const response = await axios.get(url, { params });
            
            setMyAccessibilityCat(response.data.map(item => item.category));
            // console.log(response.data.map(item => item.category));
            
          } catch (error) {
            console.error("Error fetching Accommodation:", error);
          }
    };
    fetchmyAccessibilityCat();
  }, [location]);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    fetchmyAccessibilityCat();
  };

  const checkBeforeNavigate = (category, event) => {
    // checking if the user selected the location
    if (!selectedLocation) {
      alert("Please select a location first");
      event.preventDefault(); // Prevent the default link click behavior
      return;
    }
    let Url =
      "/myaccommodations?location=" + selectedLocation + "&category=" + category;

    if (medicalCondition) {
      Url += `&medicalCondition=${medicalCondition}`;
    }

    navigate(Url);
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
    { name: "Mobility", img: mobilityImg, grayImg: grayMobilityImg },
    { name: "Hearing", img: earImg, grayImg: grayEarImg },
    { name: "Cognitive", img: brainImg, grayImg: grayBrainImg },
    { name: "Mental Health", img: mentalImg, grayImg: grayMentalImg},
    { name: "Sensory", img: sensorImg, grayImg: graySensorImg},
    { name: "Allergy", img: allergyImg, grayImg: grayAllergyImg},
    { name: "Vision", img: visionImg, grayImg: grayVisionImg },
    { name: "Pain", img: painImg, grayImg: grayPainImg },
    { name: "Digestion", img: stomachImg, grayImg: grayStomachImg },
    { name: "Safety", img: safetyImg, grayImg: graySafetyImg },
    { name: "Medical Devices", img: medicalImg, grayImg: grayMedicalImg },
    { name: "Medication", img: medicationImg, grayImg: grayMedicationImg },
  ];

  return (
    <div className="access-menu-page">
      <h1 className="header-access-menu-title">
        My Accessibility Categories
      </h1>
      {medicalCondition && (
        <h1 className="medical-condition">{medicalCondition}</h1>
      )}
      <div className="navbar-access-menu-container">
        {locations.map((loc) => (
          <div
            key={loc.name}
            className={`location-access-menu ${
              selectedLocation === loc.name ? "selected" : ""
            }`}
            onClick={() => handleLocationClick(loc.name)}
          >
            <img
              src={loc.img}
              alt={loc.name}
              className="location-access-menu-img"
            />
            <span className="location-access-menu-name">{loc.name}</span>
          </div>
        ))}
      </div>
      <div className="categories-access-menu-container">
        {categories.map((category) => {
          const isCategoryAvailable = myAccessibilityCat.includes(category.name);
          return (
            <div
              key={category.name}
              className={`category-access-menu ${isCategoryAvailable ? "" : "category-access-gray-menu"}`}
              onClick={(event) => isCategoryAvailable && checkBeforeNavigate(category.name, event)}
            >
              <img
                src={isCategoryAvailable ? category.img : category.grayImg}
                alt={category.name}
                className="category-access-menu-icon"
              />
              <span className="category-access-menu-names">
                {category.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccessMenu;
