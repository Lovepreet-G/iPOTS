import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/accountinfo.css';

import plantImg from '../../public/Joseph.png'; // Replace with the correct path to your image
import accommodationsImg from '../../public/save.png';
import medicalConditionsImg from '../../public/Caduceus.png';
import allergiesImg from '../../public/06-allergy.png';
import legalImg from "../../public/Law.png";

import dictionaryImg from '../../public//Dictionary.png';
import editProfileImg from '../../public/pen.512x512 3.png';
import locationImg from '../../public/Placeholder.png';
import languageImg from '../../public/Language.png';
import notificationsImg from '../../public/Notification.png';
import managePermissionsImg from '../../public/Shield.png';
import accountSettingsImg from '../../public/Add user.png';
import aboutPoliciesImg from '../../public/Info.png';

import backImg from "../../public/Back.png";


const ProfilePage = () => {

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

  const handleOptionClick = (url) => {
    if (url) {
      navigate(url);
    }
  };

  const options = [
    { name: 'My Accommodations', img: accommodationsImg, url: "/myaccommodationsmenu"},
    { name: 'My Medical Conditions', img: medicalConditionsImg, url: "/mymedicalconditions"  },
    { name: 'My Allergies', img: allergiesImg, url: "/myallergies"  },
    { name: 'Legal', img: legalImg, url: "/legalpage" },
    { name: 'Dictionary', img: dictionaryImg, url: "/dictionary"},
    { name: 'Edit Profile', img: editProfileImg, url: "/editprofile" },
    { name: 'Location', img: locationImg },
    { name: 'Language', img: languageImg },
    { name: 'Notifications', img: notificationsImg },
    { name: 'Manage Permissions', img: managePermissionsImg },
    { name: 'Account Settings', img: accountSettingsImg },
    { name: 'About & Policies', img: aboutPoliciesImg },
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={plantImg} alt="Profile picture of user" className="profile-picture" />
        <a href="#change-profile-picture" className="change-picture" aria-label="Change profile picture">Change profile picture</a>
        <h1 aria-label="Username" className='username'>@iaccessuser</h1>
      </div>
      <ul className="options-list" aria-label='List of account info options' tabIndex="-1" ref={listRef}>
        {options.map((option, index) => (
          <li key={index} className="option" onClick={() => handleOptionClick(option.url)}
          role="listitem"
        tabIndex="0"
        aria-label={`${option.name}, click to select`}
          >
            <img src={option.img} alt={option.name} className="option-icon" />
            <span className="option-name">{option.name}</span>
            <img
              src={backImg}
              alt="Right Arrow"
              className="option-arrow"
            />
          </li>
        ))}
      </ul>
      <button className="logout-button" aria-label="Logout" tabIndex="0">Logout</button>
    </div>
  );
};

export default ProfilePage;
