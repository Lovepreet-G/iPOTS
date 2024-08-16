import React, { useState } from 'react';
import '../styles/myallergies.css'; 
import allergiesImg from "../../public/allergies.png";
import downImg from "../../public/arrowDown.png";
import upImg from "../../public/arrowUp.png";

const MyAllergies = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="allergies-page">
      <div className="allergies-page-header">
        <img src={allergiesImg} alt="Allergies Icon" className="allergies-icon" />
        <h1 className='allergies-heading'>My Allergies</h1>
      </div>
      <div className="item-list">
      <div className={`allergies-category ${openCategory === 'food' ? 'expanded' : ''}`} onClick={() => toggleCategory('food')}>
        <div className="allergies-category-header">
          Food Allergies
          <img src={openCategory === 'food' ? upImg : downImg} alt="" />
        </div>
      </div>
      <div className={`allergies-category ${openCategory === 'environmental' ? 'expanded' : ''}`} onClick={() => toggleCategory('environmental')}>
        <div className="allergies-category-header">
          Environmental Allergies
          <img src={openCategory === 'environmental' ? upImg : downImg} alt="" />
        </div>
      </div>
      <div className={`allergies-category ${openCategory === 'medication' ? 'expanded' : ''}`} onClick={() => toggleCategory('medication')}>
        <div className="allergies-category-header">
          Medication Allergies
          <img src={openCategory === 'medication' ? upImg : downImg} alt="" />
        </div>
        {openCategory === 'medication' && (
          <div className="allergies-category-content">
            <div className="allergy-medication-item">Penicillin</div>
            <div className="allergy-medication-item">Sulfa Drugs</div>
            <div className="allergy-medication-item">Insulin</div>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default MyAllergies;
