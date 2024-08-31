import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "../styles/homepage.css";

import homeImg from "../../public/01-home.png";
import briefcaseImg from "../../public/02-work.png";
import backpackImg from "../../public/03-school.png";
import transitImg from "../../public/04-transit.png";
import hospitalImg from "../../public/05-medical.png";
import earthImg from "../../public/06-all.png";

import assistiveTechImg from "../../public/Assistive Technology.png";
import caduceusImg from "../../public/Caduceus.png";
import lawImg from "../../public/Law.png";
import dictionaryImg from "../../public/Dictionary.png";
import allergyImg from "../../public/06-allergy.png";
import saveImg from "../../public/unsave.png";
import backImg from "../../public/Back.png";

const HomePage = () => {
  const userId =1;
  const [selectedLocation, setSelectedLocation] = useState("");
  const [open, setOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState("");
  const closeModal = () => setOpen(false);
  const closeSignInModal = () => setSignInOpen(false);
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

  const checkBeforeNavigate = (category, event) => {

    //Check if the user is trying to access "My Accommodations"
    if (category.url === "/myaccommodationsmenu" && !userId) {
      setSignInOpen(true);
      event.preventDefault();
      return;
    }
     // Skip location check if category is "Dictionary" or "Legal"
    if (category.name !== "Dictionary" && category.name !== "Legal") {
      // Check if the user selected the location
      if (!selectedLocation) {
        setOpen(true);
        event.preventDefault(); // Prevent the default link click behavior
        return;
      }
      const newUrl = category.url + "?location=" + selectedLocation;

      navigate(newUrl);
      return;
    }

    navigate(category.url);
  }

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
      name: "Accessibility Category",
      img: assistiveTechImg,
      url: "/accessmenu",
    },
    { name: "Medical Conditions", img: caduceusImg, url: "/medicalcondits" },
    { name: "Legal", img: lawImg, url: "" },
    { name: "Dictionary", img: dictionaryImg, url: "/dictionary" },
    { name: "My Accommodations", img: saveImg, url: "/myaccommodationsmenu" },
    { name: "My Allergies", img: allergyImg, url: "/myallergies" },
  ];

  return (
    <div className="homepage">
      <h1 className="homepage-home-title">iACCESS</h1>
      <div className="navbar-home-container">
        {locations.map((location) => (
          <a
          key={location.name}
          href="#"
          aria-label={`${location.area}${selectedLocation === location.name ? " (selected)" : ""}`}
            className={`location-home ${
              selectedLocation === location.name ? "selected" : ""
            }`}
            onClick={() => handleLocationClick(location.name)}
            
          >
            <img
              src={location.img}
              alt={location.name}
              className="location-home-img"
            />
            <span className="location-home-name">{location.name}</span>
          </a>
        ))}
      </div>
      <div className="accessibility-categories-container">
        <ul aria-label="Main Menu Options " tabIndex="-1" ref={listRef}>
          {categories.map((category) => (
            <li key={category.name} className="accessibility-category-item">
              <a
                key={category.name}
                href="#"
                className="accessibility-category"
                onClick={(event) => checkBeforeNavigate(category, event)}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="accessibility-category-icon"
                />
                <span className="accessibility-category-name">{category.name}</span>
                <img
                  src={backImg}
                  aria-label="Right Arrow"
                  alt="Right Arrow"
                  className="accessibility-category-back"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <Popup
        open={open}
        closeOnDocumentClick
        onClose={closeModal}
        overlayClassName="popup-overlay"
        contentClassName="popup-content"
      >
        <div className="popup-message">
          <ul className="popup-location-list" aria-label="List of Locations">
            {locations.map((location) => (
              <li key={location.name} className="popup-location-item" aria-label={location.area}>
                <img
                  src={location.img}
                  alt={location.name}
                  className="popup-location-img"
                />
                <span className="popup-location-name">{location.name}</span>
              </li>
            ))}
          </ul>
          <div className="message">
            Select the location where these accommodations will be used
          </div>
          <div id="button-description" style={{ position: 'absolute', left: '-9999px' }}>
      Button-
    </div>
          <button className="close" onClick={closeModal} aria-describedby="button-description">
            OK
          </button>
         
        </div>
      </Popup>
      <Popup
        open={signInOpen}
        closeOnDocumentClick
        onClose={closeSignInModal}
        overlayClassName="popup-overlay"
        contentClassName="popup-content"
      >
        <div className="popup-message">
          <h2 className="popup-title">SIGN IN REQUIRED</h2>
          <div className="message">
            Please sign in to access My Accommodation
          </div>
          <div id="button-description" style={{ position: 'absolute', left: '-9999px' }}>
            Button-
          </div>
          <button className="sign-in" onClick={closeSignInModal} aria-describedby="button-description">
            Sign In
          </button>
          <div id="button-description" style={{ position: 'absolute', left: '-9999px' }}>
            Button-
           </div>
          <button className="cancel" onClick={closeSignInModal}>
            Cancel
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default HomePage;
