import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/medicalcondits.css";
import { CiSearch } from "react-icons/ci";

import caduceusImg from "../../public/Caduceus.png";

import homeImg from "../../public/01-home.png";
import briefcaseImg from "../../public/02-work.png";
import backpackImg from "../../public/03-school.png";
import transitImg from "../../public/04-transit.png";
import hospitalImg from "../../public/05-medical.png";
import earthImg from "../../public/06-all.png";


import unsaveImg from '../../public/unsave.png';
import saveImg from '../../public/save.png';

const MedicalCondits = () => {
  const host = "http://localhost";
  const userId = '1'; 
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get('location');
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [medicalConditions, setMedicalConditions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
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

  useEffect(() => {
    const fetchMedicalConditions = async () => {
      try {
        const url = host + '/iPots/iAccess-Server/medical_conditions.php?method=All';
        const response = await axios.get(url);
        setMedicalConditions(response.data);
        
      } catch (error) {
        console.error("Error fetching medical conditions:", error);
      }
    };
    const fetchBookmarks = async () => {
      const url = host + "/iPots/iAccess-Server/myMedicalCondition.php?method=All&userId=" + userId; 
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }           
    }

    fetchMedicalConditions();
    fetchBookmarks();
  }, []);

  const handleBookmark = async (conditionId) => {
    const url = host + "/iPots/iAccess-Server/myMedicalCondition.php";
    const params = {
      userId: userId, 
      medicalConditionId: conditionId,
      method: 'Add'
    };
    const response = await axios.get(url, { params });
    
    setBookmarks([...bookmarks, conditionId]);
  };

  const handleUnbookmark = async (conditionId) => {
    const url = host + "/iPots/iAccess-Server/myMedicalCondition.php";
    const params = {
      userId: userId,
      medicalConditionId: conditionId,
      method: "Delete"
    };
    const response = await axios.get(url, { params });
    
    setBookmarks(bookmarks.filter(id => id !== conditionId));
  };

  const isBookmarked = (conditionId) => {
    return bookmarks.includes(conditionId);
  };


  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (letter, event) => {
    if (!selectedLocation) {
      alert("Please select a location first");
      event.preventDefault();
      return;
    } else {
      const Url ="/medicalconditreview?Method=Letter&letter=" + letter + "&location=" + selectedLocation;
      navigate(Url);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConditions = medicalConditions.filter((condition) =>
    condition.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const locations = [
    { name: "Home", img: homeImg, area: "Home" },
    { name: "Work", img: briefcaseImg, area: "Work"},
    { name: "School", img: backpackImg, area: "School" },
    { name: "Transit", img: transitImg, area: "Transit" },
    { name: "Medical", img: hospitalImg, area: "Medical" },
    { name: "All", img: earthImg, area: "All Locations" },
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
      <div className="medical-condit-page">
        <div className="medical-condit-title">
            <img src={caduceusImg} alt="Medical Conditions" className="medical-condit-logo" />
          <h1 className="medical-condit-name"> Medical Conditions</h1>
        </div>
        <div className="nav-medical-condit-container">
          {locations.map((location) => (
            <a
              key={location.name}
              href="#"
              aria-label={`${location.area}${selectedLocation === location.name ? " (selected)" : ""}`}
              className={`location-condits ${
                selectedLocation === location.name ? "selected" : ""
              }`}
              onClick={(event) => {
                event.preventDefault();
                handleLocationClick(location.name)}}
            >
              <img
                src={location.img}
                alt={location.name}
                className="location-condits-img"
              />
              <span className="location-condits-name">{location.name}</span>
            </a>
          ))}
        </div>
        <div className="search-bar-container">
          <div className="search-bar">
            <CiSearch className="search-icon" />
            <input
              type="search"
              className="searchbox"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label="Search for medical conditions"
            />
          </div>
        </div>
        {searchTerm ? (
          <div className="medical-conditions-container">
            {filteredConditions.length > 0 ? (
              filteredConditions.map((condition) => (
                <div key={condition.id} className="medical-condition-box">
                  <div className="medical-condition" onClick={() => handleConditionClick(condition)}>{condition.term}</div>
                  <div className="medical-icons">
                    {isBookmarked(condition.id) ? (
                      <img className="img" src={saveImg} onClick={() => handleUnbookmark(condition.id)} alt="Save" />
                    ) : (
                      <img className="img" src={unsaveImg} onClick={() => handleBookmark(condition.id)} alt="UnSave" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="Error">No medical conditions matchs {searchTerm}.</p>
            )}
          </div>
        ) : (
          <div className="medical-letters-container">
            <ul aria-label="List of letters" tabIndex="-1" ref={listRef}>
            {letters.map((letter) => (
              <li key={letter.num} className="letter-items">
              <a
                key={letter.num}
                href="#"
                aria-label={`Search with ${letter.char}`}
                className={`medical-letter ${
                  selectedLetter === letter.num ? "selected" : ""
                }`}
                onClick={(event) => {
                  event.preventDefault();
                  checkBeforeNavigate(letter.char, event);
                  handleLetterClick(letter.num);
                }}
              >
                <span className="medical-the-letters">{letter.char}</span>
              </a>
              </li>
            ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default MedicalCondits;
