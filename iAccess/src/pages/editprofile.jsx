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
        <img src={plantImg} alt="Profile picture of user" className="profile-picture2" />
        <a href="#change-profile-picture" className="change-picture2" aria-label="Change profile picture">Change profile picture</a>
        <h1 aria-label="Username" className='user-name'>@iaccessuser</h1>
      </div>
      <div className="profile-form">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="John" aria-label="Click to edit your first name"/>
          <img src={editIcon} alt="" className="edit-icon" aria-hidden="true"/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Smith" aria-label="Click to edit your last name"/>
          <img src={editIcon} alt="" className="edit-icon" aria-hidden="true"/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="iaccess@email.com" aria-label="Click to edit your email"/>
          <img src={editIcon} alt="" className="edit-icon" aria-hidden="true"/>
        </div>
        <div className="form-group">
          <input type="password" className="form-control" readOnly placeholder="************" aria-label='password'/>
        </div>
        <a href="#" className="change-password" onClick={handleEditProfile} aria-label='click to change your password'>Change Password</a>
      </div>
    </div>
  );
};

export default ProfileEdit;
