import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Popup from "reactjs-popup";
// import { AuthContext } from "./Auth";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";

import "../styles/accommodation.css";
import homeImg from "../../public/01-home.png";
import briefcaseImg from "../../public/02-work.png";
import backpackImg from "../../public/03-school.png";
import transitImg from "../../public/04-transit.png";
import hospitalImg from "../../public/05-medical.png";
import earthImg from "../../public/06-all.png";

import unsaveImg from "../../public/unsave.png";
import saveImg from "../../public/save.png";
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

const Accommodation2 = () => {
  const host = "http://localhost";
  const [userId , setUserId] = useState("1");
//   const { user } = useContext(AuthContext);
  const [accommodations, setAccommodations] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const locat = useLocation();
  const queryParams = new URLSearchParams(locat.search);
  const location = queryParams.get("location");
  const category = queryParams.get("category");
  const medicalCondition = queryParams.get("medicalCondition");
//   popup for bookmark
  const [selectedLocation, setSelectedLocation] = useState(location);
  const [signInOpen, setSignInOpen] = useState("");
  const closeSignInModal = () => setSignInOpen(false);
  const handleSignIn = () => {
    closeSignInModal(); // Close the modal
    navigate('/home'); // Redirect to /home
  };
  
  const openpopup = () => {
    setSignInOpen(true);
    return;   
  }


//   set user id if user is logged in
//   if (user) {
//     setUserId(user.data.id);
//     }

  useEffect(() => {
    const fetchBookmarks = async () => {
      const url =
        host +
        "/iPots/iAccess-Server/myAccessibility.php?method=All&userId=" +
        userId;
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }
    };

    const fetchData = async () => {
      try {
        const params = { category: category, location: location };
        if (medicalCondition) {
          params.medicalCondition = medicalCondition;
        }
        const url = host + "/iPots/iAccess-Server/accommodation.php";
        const response = await axios.get(url, { params });
        if (Array.isArray(response.data)) {
          setAccommodations(response.data);
        } else {
          console.error("The fetched data is not an array:", response.data);
        }
      } catch (error) {
        console.error("There was an error fetching the data!", error);
      }
    };
    if(userId)
    {
        fetchBookmarks();
    }
    fetchData();
  }, [location, category]);

  const handleBookmark = async (accommodationId) => {
    const url = host + "/iPots/iAccess-Server/myAccessibility.php";
    const params = {
      userId: userId,
      accommodationId: accommodationId,
      method: "Add",
    };
    const response = await axios.get(url, { params });
    console.log(response);
    setBookmarks([...bookmarks, accommodationId]);
  };

  const handleUnbookmark = async (accommodationId) => {
    const url = host + "/iPots/iAccess-Server/myAccessibility.php";
    const params = {
      userId: userId,
      accommodationId: accommodationId,
      method: "Delete",
    };
    const response = await axios.get(url, { params });
    console.log(response);
    setBookmarks(bookmarks.filter((id) => id !== accommodationId));
  };

  const isBookmarked = (accommodationId) => {
    return bookmarks.includes(accommodationId);
  };

  const handleLocationClick = async (location) => {
    setSelectedLocation(location);
    try {
      const url = host + "/iPots/iAccess-Server/accommodation.php";
      const response = await axios.get(url, {
        params: { category: category, location: location },
      });
      if (Array.isArray(response.data)) {
        setAccommodations(response.data);
      } else {
        console.error("The fetched data is not an array:", response.data);
      }
    } catch (error) {
      console.error("There was an error fetching the data!", error);
    }
  };

  const handleItemClick = (accommodation) => {
    setSelectedItem(
      accommodation.id === selectedItem ? null : accommodation.id
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredAccommodations = accommodations.filter((accommodation) =>
    accommodation.accommodation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const locations = [
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
  ];

  const categories = [
    { name: "Mobility", img: mobilityImg },
    { name: "Hearing", img: earImg },
    { name: "Cognitive", img: brainImg },
    { name: "Mental Health", img: mentalImg },
    { name: "Sensory", img: sensorImg },
    { name: "Allergy", img: allergyImg },
    { name: "Vision", img: visionImg },
    { name: "Pain", img: painImg },
    { name: "Digestion", img: stomachImg },
    { name: "Safety", img: safetyImg },
    { name: "Medical Devices", img: medicalImg },
    { name: "Medication", img: medicationImg },
  ];

  const categoryObject = categories.find((cat) => cat.name === category);
  const iconImg = categoryObject ? categoryObject.img : null;

  return (
    <div className="accommodations-page">
      <div className="acc-header-container">
        <img src={iconImg} alt="Vision" className="vision-image" />
        <h1 className="accommodation-title">{category}</h1>
        {medicalCondition && (
          <h2 className="accommodation-title"> ({medicalCondition})</h2>
        )}
      </div>
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
        </div>
      </div>
      <div className="item-list">
        {filteredAccommodations.length > 0 ? (
          filteredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className={`item ${
                selectedItem === accommodation.id ? "selected" : ""
              }`}
            >
              <div
                className={`item-header ${
                  selectedItem === accommodation.id ? "expanded" : ""
                }`}
              >
                <span onClick={() => handleItemClick(accommodation)}>
                  {accommodation.accommodation}
                </span>
                {/* bookmark works only if user is logged in */}
                {userId ? (
                    isBookmarked(accommodation.id) ? (
                        <img
                        className="img"
                        src={saveImg}
                        onClick={() => handleUnbookmark(accommodation.id)}
                        alt="Save"
                        />
                    ) : (
                        <img
                        className="img"
                        src={unsaveImg}
                        onClick={() => handleBookmark(accommodation.id)}
                        alt="Save"
                        />
                    )
                    ) : (
                        // else popup for signup appears
                    <img
                        className="img"
                        src={unsaveImg}
                        onClick={() => openpopup()}
                        alt="Save"
                    />
                    )}
              </div>
              {selectedItem === accommodation.id && (
                <div
                  className="item-details"
                  onClick={() => handleItemClick(accommodation)}
                >
                  <img
                    src={iconImg}
                    alt={accommodation.accommodation}
                    className="item-image"
                  />
                  <p>{accommodation.description}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="Error">
            No accommodations available for {category} at {selectedLocation}.
          </p>
        )}
      </div>
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
            Please sign in to use BookMark Feature
          </div>
          <button className="sign-in" onClick={handleSignIn}>
            Sign In
          </button>
          <button className="cancel" onClick={closeSignInModal}>
            Cancel
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Accommodation2;
