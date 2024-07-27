import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/accountinfo.css';

import plantImg from '../../public/Joseph.png'; // Replace with the correct path to your image
import accommodationsImg from '../../public/save-instagram.png';
import medicalConditionsImg from '../../public/Caduceus.png';
import allergiesImg from '../../public/allergies.png';
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

  const handleEditProfile = () => {
    navigate('/editprofile');
  };

  const options = [
    { name: 'My Accommodations', img: accommodationsImg },
    { name: 'My Medical Conditions', img: medicalConditionsImg },
    { name: 'My Allergies', img: allergiesImg },
    { name: 'Legal', img: legalImg },
    { name: 'Dictionary', img: dictionaryImg },
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
        <img src={plantImg} alt="Profile" className="profile-picture" />
        <p className="change-picture">Change profile picture</p>
        <h2>@iaccessuser</h2>
      </div>
      <div className="options-list">
        {options.map((option, index) => (
          <div key={index} className="option" onClick={handleEditProfile}>
            <img src={option.img} alt={option.name} className="option-icon" />
            <span className="option-name">{option.name}</span>
            <img
              src={backImg}
              alt="Back"
              className="option-arrow"
            />
            {/* <span className="option-arrow">➔</span> */}
          </div>
        ))}
      </div>
      <button className="next-button">Next</button>
    </div>
  );
};

export default ProfilePage;
