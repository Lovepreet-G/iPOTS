import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/changepassword.css';

const ChangePassword = () => {
  return (
    <div className="change-password-page">
      <h1>Change Password</h1>
      <div className="password-form">
      <div className="form-group2">
        <label htmlFor="current-password">Current Password <span className="required">*</span></label>
        <input type="password" id="current-password" className="form-control2" placeholder="Please enter your password" />
      </div>
      <div className="form-group2">
        <label htmlFor="new-password">New Password <span className="required">*</span></label>
        <input type="password" id="new-password" className="form-control2" placeholder="Enter your new password" />
      </div>
      <div className="form-group2">
        <label htmlFor="confirm-password">Confirm Password <span className="required">*</span></label>
        <input type="password" id="confirm-password" className="form-control2" placeholder="Re-enter your password" />
      </div>
      <div className="button-group">
        <button className="btn btn-primary">Next</button>
        <button className="btn btn-outline-primary">Back</button>
      </div>
      </div>
    </div>
  );
};

export default ChangePassword;
