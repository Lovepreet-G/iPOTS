import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/myallergies.css'; 
import allergiesImg from "../../public/06-allergy.png";
import downImg from "../../public/arrowDown.png";
import upImg from "../../public/arrowUp.png";

const MyAllergies = () => {
  const host = "http://localhost";
  const userId =1;
  const [openCategory, setOpenCategory] = useState(null);
  const [allergies, setAllergies] = useState([]);
  const [otherAllergies, setOtherAllergies] = useState({
    otherFoodAllergies: [],
    otherEnvironmentalAllergies: [],
    otherMedicationAllergies: [],
  });
  const listRef = useRef(null);

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

  useEffect(() => {
    const fetchAllergies = async () => {
      try {
        // Fetch allergies (method=allallergies)
        const url = host + "/iPots/iAccess-Server/myallergies.php" ;
        const allergiesResponse = await axios.get(url, {
          params: {
            method: 'allallergies',
            iaccess_id: userId ,
          },
        });
        setAllergies(allergiesResponse.data);

        // Fetch other allergies (method=otherallergies)
        
        const otherAllergiesResponse = await axios.get(url, {
          params: {
            method: 'otherallergies',
            iaccess_id: userId, 
          },
        });
       
        // setOtherAllergies(otherAllergiesResponse.data);
        // setOtherAllergies(otherAllergiesResponse.data[0]);
        setOtherAllergies({
          otherFoodAllergies:otherAllergiesResponse.data[0].other_food_allergies || '',
          otherEnvironmentalAllergies: otherAllergiesResponse.data[0].other_environmental_allergies || '',
          otherMedicationAllergies: otherAllergiesResponse.data[0].other_medication_allergies || '',
        });
        console.log( otherAllergies);

      } catch (error) {
        console.error('Error fetching allergies:', error);
      }
    };

    fetchAllergies();
  }, []);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="allergies-page">
      <div className="allergies-page-header">
        <img src={allergiesImg} alt="My Allergies" className="allergies-icon" />
        <h1 className='allergies-heading'>My Allergies</h1>
      </div>
      <div className="allergy-container">
      <ul className="item-list" aria-label={`List of my allergies`} tabIndex="-1" ref={listRef}>
        <li  className={`allergies-category ${openCategory === 'food' ? 'expanded' : ''}`} onClick={() => toggleCategory('food')}>
          <div className="allergies-category-header">
            Food Allergies
            <img src={openCategory === 'food' ? upImg : downImg} 
            alt={openCategory === 'food' ? 'Click to close the food allergies' : 'Click to expand the food allergies'} />
          </div>
          {openCategory === 'food' && (
            <div className="allergies-category-content" aria-label="List of food alergies">
              {allergies.filter(allergy => allergy.type === 'food').map(allergy => (
                <div key={allergy.id} className="allergy-item">{allergy.title}</div>
              ))}
              {otherAllergies.otherFoodAllergies.split(',').map((allergy, index) => (
                <div key={`other-food-${index}`} className="allergy-item">{allergy}</div>
              ))}
            </div>
          )}
        </li>
        <li  className={`allergies-category ${openCategory === 'environmental' ? 'expanded' : ''}`} onClick={() => toggleCategory('environmental')}>
          <div className="allergies-category-header">
            Environmental Allergies
            <img src={openCategory === 'environmental' ? upImg : downImg} 
            alt={openCategory === 'environmental' ? 'Click to close the environmental allergies' : 'Click to expand the environmental allergies'}  />
          </div>
          {openCategory === 'environmental' && (
            <div className="allergies-category-content" aria-label='List of environmental alergies'>
              {allergies.filter(allergy => allergy.type === 'environmental').map(allergy => (
                <div key={allergy.id} className="allergy-item">{allergy.title}</div>
              ))}
              {otherAllergies.otherEnvironmentalAllergies.split(',').map((allergy, index) => (
                <div key={`other-environmental-${index}`} className="allergy-item">{allergy}</div>
              ))}
            </div>
          )}
        </li>
        <li className={`allergies-category ${openCategory === 'medication' ? 'expanded' : ''}`} onClick={() => toggleCategory('medication')}>
          <div className="allergies-category-header">
            Medication Allergies
            <img src={openCategory === 'medication' ? upImg : downImg} 
            alt={openCategory === 'medication' ? 'Click to close the medication allergies' : 'Click to expand the medication allergies'}  />
          </div>
          {openCategory === 'medication' && (
            <div className="allergies-category-content" aria-label='List of medication alergies'>
              {allergies.filter(allergy => allergy.type === 'medication').map(allergy => (
                <div key={allergy.id} className="allergy-item">{allergy.title}</div>
              ))}
              {otherAllergies.otherMedicationAllergies.split(',').map((allergy, index) => (
                <div key={`other-medication-${index}`} className="allergy-item">{allergy}</div>
              ))}
            </div>
          )}
        </li>
      </ul>
      </div>
    </div>
  );
};

export default MyAllergies;
