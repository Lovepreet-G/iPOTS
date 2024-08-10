import React, { useState } from 'react';
import '../styles/myallergies.css'; 

const MyAllergies = () => {
  const [openCategory, setOpenCategory] = useState(null);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="allergies-page">
      <div className="page-header">
        <img src="../../public/allergies.png" alt="Allergies Icon" className="allergies-icon" />
        <h1>My Allergies</h1>
      </div>
      <div className="category" onClick={() => toggleCategory('food')}>
        <div className="category-header">
          Food Allergies
          <span>{openCategory === 'food' ? '▲' : '▼'}</span>
        </div>
      </div>
      <div className="category" onClick={() => toggleCategory('environmental')}>
        <div className="category-header">
          Environmental Allergies
          <span>{openCategory === 'environmental' ? '▲' : '▼'}</span>
        </div>
      </div>
      <div className="category" onClick={() => toggleCategory('medication')}>
        <div className="category-header">
          Medication Allergies
          <span>{openCategory === 'medication' ? '▲' : '▼'}</span>
        </div>
        {openCategory === 'medication' && (
          <div className="category-content">
            <div className="allergy-item">Penicillin</div>
            <div className="allergy-item">Sulfa Drugs</div>
            <div className="allergy-item">Insulin</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAllergies;
