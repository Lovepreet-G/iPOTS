import { useState } from "react";
//import { useLocation, useNavigate } from "react-router-dom";
import "../styles/medicalcondits.css";

import homeImg from "../../public/home.png";
import briefcaseImg from "../../public/briefcase.png";
import backpackImg from "../../public/backpack.png";
import transitImg from "../../public/image 18.png";
import hospitalImg from "../../public/hospital-sign.png";
import earthImg from "../../public/planet-earth.png";

const MedicalCondits = () => {
  //const locat = useLocation();
  //const queryParams = new URLSearchParams(locat.search);
  //const location = queryParams.get("location");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  //const navigate = useNavigate();

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (letter, event) => {
    if (!selectedLocation) {
      alert("Please select a location first");
      event.preventDefault();
      return;
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const locations = [
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
  ];

  const letters = [
    { num: 1, char: "A" },
    { num: 2, char: "B" },
    { num: 3, char: "C" },
    { num: 4, char: "D" },
    { num: 5, char: "E" },
    { num: 6, char: "F" },
    { num: 7, char: "G" },
    { num: 8, char: "H" },
    { num: 9, char: "I" },
    { num: 10, char: "J" },
    { num: 11, char: "K" },
    { num: 12, char: "L" },
    { num: 13, char: "M" },
    { num: 14, char: "N" },
    { num: 15, char: "O" },
    { num: 16, char: "P" },
    { num: 17, char: "Q" },
    { num: 18, char: "R" },
    { num: 19, char: "S" },
    { num: 20, char: "T" },
    { num: 21, char: "U" },
    { num: 22, char: "V" },
    { num: 23, char: "W" },
    { num: 24, char: "X" },
    { num: 25, char: "Y" },
    { num: 26, char: "Z" },
  ];

  return (
    <>
      <div className="total-page">
        <div className="page-title">
          <span className="logo">
            <img src="../../public/Caduceus.png" className="caduceus" />
          </span>
          <span className="page-name">Medical Condition</span>
        </div>
        <div className="nav-container">
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
        <div className="search-bar"></div>
        <div className="letters-container">
          {letters.map((letter) => (
            <div
              key={letter.num}
              className={`letter ${
                selectedLetter === letter.num ? "selected" : ""
              }`}
              onClick={(event) => {
                checkBeforeNavigate(letter.num, event);
                handleLetterClick(letter.num);
              }}
            >
              <span className="the-letters">{letter.char}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MedicalCondits;
