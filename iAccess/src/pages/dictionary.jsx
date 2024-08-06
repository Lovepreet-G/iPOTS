import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/dictionary.css";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";
import homeImg from "../../public/home.png";
import briefcaseImg from "../../public/briefcase.png";
import backpackImg from "../../public/backpack.png";
import transitImg from "../../public/image 18.png";
import hospitalImg from "../../public/hospital-sign.png";
import earthImg from "../../public/planet-earth.png";
import unsaveImg from "../../public/unsave.png";
import saveImg from "../../public/save.png";
import dictionaryImg from "../../public/Dictionary.png";

const Dictionary = () => {
  const host = "http://localhost";
  const userId = "1";
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get("location");
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [definition, setDefinition] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchDefinitions = async () => {
  //     try {
  //       const url = host + "/iPots/iAccess-Server/definitions.php?method=All";
  //       const response = await axios.get(url);
  //       setDefinition(response.data);
  //     } catch (error) {
  //       console.error("Error fetching medical conditions:", error);
  //     }
  //   };
  //   const fetchBookmarks = async () => {
  //     const url =
  //       host +
  //       "/iPots/iAccess-Server/myDefinitions.php?method=All&userId=" +
  //       userId;
  //     const response = await axios.get(url);
  //     if (Array.isArray(response.data)) {
  //       setBookmarks(response.data);
  //     }
  //   };

  //   fetchDefinitions();
  //   fetchDefinitions();
  // }, []);

  // const handleBookmark = async (conditionId) => {
  //   const url = host + "/iPots/iAccess-Server/myDefinitions.php";
  //   const params = {
  //     userId: userId,
  //     medicalConditionId: conditionId,
  //     method: "Add",
  //   };
  //   const response = await axios.get(url, { params });

  //   setBookmarks([...bookmarks, conditionId]);
  // };

  // const handleUnbookmark = async (conditionId) => {
  //   const url = host + "/iPots/iAccess-Server/myDefinitions.php";
  //   const params = {
  //     userId: userId,
  //     medicalConditionId: conditionId,
  //     method: "Delete",
  //   };
  //   const response = await axios.get(url, { params });

  //   setBookmarks(bookmarks.filter((id) => id !== conditionId));
  // };

  // const isBookmarked = (conditionId) => {
  //   return bookmarks.includes(conditionId);
  // };

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
  };

  const checkBeforeNavigate = (letter, event) => {
    if (!selectedLocation) {
      alert("Please select a location first");
      event.preventDefault();
      return;
    } else {
      const Url =
        "/definitionreview?Method=Letter&letter=" +
        letter +
        "&location=" +
        selectedLocation;
      navigate(Url);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConditions = definition.filter((condition) =>
    condition.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="dictionary-total-page">
        <div className="dictionary-page-title">
          <span className="logo">
            <img src={dictionaryImg} />
          </span>
          <span className="page-name"> Dictionary</span>
        </div>
        <div className="nav-container">
          {locations.map((location) => (
            <div
              key={location.name}
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
            </div>
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
            />
            <PiMicrophoneFill className="microphone-icon" />
          </div>
        </div>
        {searchTerm ? (
          <div className="conditions-container">
            {filteredConditions.length > 0 ? (
              filteredConditions.map((condition) => (
                <div key={condition.id} className="condition-box">
                  <div
                    className="condition"
                    onClick={() => handleConditionClick(condition)}
                  >
                    {condition.term}
                  </div>
                  <div className="icons">
                    {isBookmarked(condition.id) ? (
                      <img
                        className="img"
                        src={saveImg}
                        onClick={() => handleUnbookmark(condition.id)}
                        alt="Save"
                      />
                    ) : (
                      <img
                        className="img"
                        src={unsaveImg}
                        onClick={() => handleBookmark(condition.id)}
                        alt="UnSave"
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="Error">No definitions matchs {searchTerm}.</p>
            )}
          </div>
        ) : (
          <div className="dictionary-letters-container">
            {letters.map((letter) => (
              <div
                key={letter.num}
                className={`dictionary-letter ${
                  selectedLetter === letter.num ? "selected" : ""
                }`}
                onClick={(event) => {
                  checkBeforeNavigate(letter.char, event);
                  handleLetterClick(letter.num);
                }}
              >
                <span className="dictionary-the-letters">{letter.char}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Dictionary;
