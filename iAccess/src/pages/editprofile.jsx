import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/editprofile.css';

import plantImg from '../../public/Joseph.png'; // Replace with the correct path to your image
import editIcon from '../../public/pen.512x512 3.png'; // Replace with the correct path to your edit icon

const ProfileEdit = () => {

    const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate('/changepassword');
  };

  return (
    <div className="profile-edit-page">
      <div className="profile-header2">
        <img src={plantImg} alt="Profile" className="profile-picture2" />
        <p className="change-picture2">Change profile picture</p>
        <h2>@iaccessuser</h2>
      </div>
      <div className="profile-form">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="John" />
          <img src={editIcon} alt="Edit" className="edit-icon" />
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Smith" />
          <img src={editIcon} alt="Edit" className="edit-icon" />
        </div>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="iaccess@email.com" />
          <img src={editIcon} alt="Edit" className="edit-icon" />
        </div>
        <div className="form-group">
          <input type="password" className="form-control" placeholder="************" />
          <p className="change-password" onClick={handleEditProfile}>Change Password</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
