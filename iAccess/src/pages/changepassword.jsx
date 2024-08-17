import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/changepassword.css';

const ChangePassword = () => {
  return (
    <div className="change-password-page">
      <h1 className='changepassword-header'>Change Password</h1>
      <div className="password-form">
      <div className="password-form-group">
        <label htmlFor="current-password" className='pwd-heading'>Current Password <span className="required">*</span></label>
        <input type="password" id="current-password" className="password-form-control" placeholder="Please enter your password" />
      </div>
      <div className="password-form-group">
        <label htmlFor="new-password" className='pwd-heading'>New Password <span className="required">*</span></label>
        <input type="password" id="new-password" className="password-form-control" placeholder="Enter your new password" />
      </div>
      <div className="password-form-group">
        <label htmlFor="confirm-password" className='pwd-heading'>Confirm Password <span className="required">*</span></label>
        <input type="password" id="confirm-password" className="password-form-control" placeholder="Re-enter your password" />
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
