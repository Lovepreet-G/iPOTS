import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/myMedicalConditions.css";
import { CiSearch } from "react-icons/ci";
import homeImg from "../../public/01-home.png";
import briefcaseImg from "../../public/02-work.png";
import backpackImg from "../../public/03-school.png";
import transitImg from "../../public/04-transit.png";
import hospitalImg from "../../public/05-medical.png";
import earthImg from "../../public/06-all.png";

import caduceusImg from "../../public/Caduceus.png";

import unsaveImg from "../../public/unsave.png";
import saveImg from "../../public/save.png";

const myMedicalCondits = () => {
  const host = "http://localhost";
  const userId = "1";
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get("location");
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
    const fetchMyMedicalConditions = async () => {
      try {
        const url =
          host +
          "/iPots/iAccess-Server/myMedicalCondition.php?method=showAll&userId=" +
          userId;
        const response = await axios.get(url);
        setMedicalConditions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching medical conditions:", error);
      }
    };
    const fetchBookmarks = async () => {
      const url =
        host +
        "/iPots/iAccess-Server/myMedicalCondition.php?method=All&userId=" +
        userId;
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }
    };

    fetchBookmarks();
    fetchMyMedicalConditions();
  }, []);

  const handleBookmark = async (conditionId) => {
    const url = host + "/iPots/iAccess-Server/myMedicalCondition.php";
    const params = {
      userId: userId,
      medicalConditionId: conditionId,
      method: "Add",
    };
    const response = await axios.get(url, { params });

    setBookmarks([...bookmarks, conditionId]);
  };

  const handleUnbookmark = async (conditionId) => {
    const url = host + "/iPots/iAccess-Server/myMedicalCondition.php";
    const params = {
      userId: userId,
      medicalConditionId: conditionId,
      method: "Delete",
    };
    const response = await axios.get(url, { params });

    setBookmarks(bookmarks.filter((id) => id !== conditionId));
  };

  const isBookmarked = (conditionId) => {
    return bookmarks.includes(conditionId);
  };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleConditionClick = (condition) => {
    navigate(
      `/myaccessmenu?medicalCondition=${condition.term}&location=${location}`
    );
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

  return (
    <>
      <div className="total-page">

        <div className="my-medical-condit-title">
            <img src={caduceusImg} alt="Medical Conditions" className="my-medical-condit-logo" />
          <h1 className="my-medical-condit-name">My Medical Conditions</h1>
        </div>

        <div className="nav-container">
          {locations.map((location) => (
            <a
              key={location.name}
              href="#"
              aria-label={`${location.area}${selectedLocation === location.name ? " (selected)" : ""}`}
              className={`location-condits ${
                selectedLocation === location.name ? "selected" : ""
              }`}
              onClick={() => handleLocationClick(location.name)}
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
              aria-label="Search for my medical conditions"
            />
          </div>
        </div>

        <div className="conditions-container">
          {filteredConditions.length > 0 ? (
            <ul className="conditions-list" aria-label="List of my medical conditions" tabIndex="-1" ref={listRef}>
            {filteredConditions.map((condition) => (
               <li key={condition.id} className="condition-box">
                <div
                  className="condition"
                  onClick={() => handleConditionClick(condition)}
                >
                  {condition.term}
                </div>
                <div className="icons">
                  {isBookmarked(condition.id) ? (
                    <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleUnbookmark(condition.id);
                    }}
                    aria-label="Click to remove bookmark from this item"
                  >
                    <img
                      className="bookmark-img"
                      src={saveImg}
                      alt="Save"
                    />
                  </a>
                  ) : (
                    <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleBookmark(condition.id);
                    }}
                    aria-label="Click to bookmark this item"
                  >
                    <img
                      className="unbookmarkimg"
                      src={unsaveImg}
                      alt="UnSave"
                    />
                  </a>
                  )}
                </div>
              </li>
            ))}
            </ul>
          ) : (
            <p className="Error">No medical conditions match "{searchTerm}".</p>
          )}
        </div>
      </div>
    </>
  );
};

export default myMedicalCondits;
