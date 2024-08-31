import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "../styles/myAccommodations.css";

import homeImg from "../../public/01-home.png";
import briefcaseImg from "../../public/02-work.png";
import backpackImg from "../../public/03-school.png";
import transitImg from "../../public/04-transit.png";
import hospitalImg from "../../public/05-medical.png";
import earthImg from "../../public/06-all.png";

import assistiveTechImg from "../../public/Assistive Technology.png";
import caduceusImg from "../../public/Caduceus.png";
import allergyImg from "../../public/06-allergy.png";
import backImg from "../../public/Back.png";

const MyAccommodations = () => {
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get("location");

  const [selectedLocation, setSelectedLocation] = useState(location);
  const navigate = useNavigate();
  const listRef = useRef(null); // Create a ref for the list

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "l") {
        if (listRef.current) {
          listRef.current.focus(); // Focus the list when "L" is pressed
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

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
    { name: "Home", img: homeImg, area: "Home" },
    { name: "Work", img: briefcaseImg, area: "Work"},
    { name: "School", img: backpackImg, area: "School" },
    { name: "Transit", img: transitImg, area: "Transit" },
    { name: "Medical", img: hospitalImg, area: "Medical" },
    { name: "All", img: earthImg, area: "All Locations" },
  ];

  const categories = [
    {
      name: "My Accessibility Category",
      img: assistiveTechImg,
      url: "/myaccessmenu",
    },
    {
      name: "My Medical Conditions",
      img: caduceusImg,
      url: "/mymedicalconditions",
    },
    { name: "My Allergies", img: allergyImg, url: "/myallergies" },
  ];

  return (
    <div className="myAccommodations">
      <h1 className="myAccommodations-title">My Accommodations</h1>
      <div className="myNavbar-container">
        {locations.map((location) => (
          <a
            key={location.name}
            href="#"
              aria-label={`${location.area}${selectedLocation === location.name ? " (selected)" : ""}`}
            className={`myLocation ${
              selectedLocation === location.name ? "selected" : ""
            }`}
            onClick={(event) => {
              event.preventDefault();
              handleLocationClick(location.name)}}
          >
            <img
              src={location.img}
              alt={location.name}
              className="myLocation-img"
            />
            <span className="myLocation-name">{location.name}</span>
          </a>
        ))}
      </div>
      <div className="myAccessibility-categories-container">
        <ul aria-label="My accommodation menu options" tabIndex="-1" ref={listRef}>
        {categories.map((category) => (
          <li key={category.name} className="myAccessibility-items">
          <a
            key={category.name}
            href="#"
            className="myAccessibility-category"
            onClick={(event) => {
              event.preventDefault();
              checkBeforeNavigate(category.url, event)}}
          >
            <img
              src={category.img}
              alt={category.name}
              className="myAccessibility-category-icon"
            />
            <span className="myAccessibility-category-name">
              {category.name}
            </span>
            <img
              src={backImg}
              aria-label="Right Arrow"
              alt="Right Arrow"
              className="myAccessibility-category-back"
            />
          </a>
          </li>
        ))}
        </ul>
      </div>
    </div>
  );
};

export default MyAccommodations;
