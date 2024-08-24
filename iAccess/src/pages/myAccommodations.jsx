import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { CiSearch } from "react-icons/ci";

import "../styles/accommodation.css";
import homeImg from "../../public/01-home.png";
import briefcaseImg from "../../public/02-work.png";
import backpackImg from "../../public/03-school.png";
import transitImg from "../../public/04-transit.png";
import hospitalImg from "../../public/05-medical.png";
import earthImg from "../../public/06-all.png";

import unsaveImg from '../../public/unsave.png';
import saveImg from '../../public/save.png';
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

const myAccommodations = () => {
    const host = "http://localhost";
    const userId = '1';
    const [accommodations, setAccommodations] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const locat = useLocation();
    const queryParams = new URLSearchParams(locat.search);
    const location = queryParams.get('location');
    const category = queryParams.get('category');
    const medicalCondition = queryParams.get('medicalCondition');
    const [selectedLocation, setSelectedLocation] = useState(location);
    const [selectedItem, setSelectedItem] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);


    useEffect(() => {
        const bookmark = async () => {
            // Fetch the user's accessibilty
            const url = host + "/iPots/iAccess-Server/myAccessibility.php?method=All&userId="+userId ; 
            const response = await axios.get(url) 
            if(Array.isArray(response.data)){
                setBookmarks(response.data);
            }           
            
        }
        // for fetching data from database when page loads 
        const fetchData = async () => {
            try {
                const params = {
                    method: 'showAll',
                    userId: userId,
                    location: location,
                    category:category
                };
                
                // Checking if the user is coming from the medical page
                if (medicalCondition) {
                    params.medicalCondition = medicalCondition;
                }
                
                const url = host + '/iPots/iAccess-Server/myAccessibility.php';
                const response = await axios.get(url, { params });
                
                setAccommodations(response.data);
                
              } catch (error) {
                console.error("Error fetching Accommodation:", error);
              }
        };

        bookmark();
        fetchData();
    }, [location, category]);

     // to add accommodation to myAccessibility
     const handleBookmark = async (accommodationId) => {
        const url = host + "/iPots/iAccess-Server/myAccessibility.php";
        const params ={
            userId: userId, 
            accommodationId: accommodationId,
            method: 'Add'
        } 
        const response = await axios.get(url, {params})
        console.log(response);
        setBookmarks([...bookmarks, accommodationId]);
        };
    
    // to add accommodation to myAccessibility
    const handleUnbookmark =  async (accommodationId) => {
        const url = host + "/iPots/iAccess-Server/myAccessibility.php";
        const params = {
            userId: userId,
            accommodationId: accommodationId,
            method:"Delete"
        }
        const response = await axios.get(url, {params})
        console.log(response);
        
        setBookmarks(bookmarks.filter(id => id !== accommodationId));
        
    };

    const isBookmarked = (accommodationId) => {
        return bookmarks.includes(accommodationId);
    };
    // to handle the location change
    const handleLocationClick = async (location) => {
        setSelectedLocation(location);
        try {
            const url =  host + '/iPots/iAccess-Server/myAccessibility.php'
            const response = await axios.get(url , {
                params: {
                    method: 'showAll',
                    userId: userId,
                    location: location,
                    category:category
                },
            });

            if (Array.isArray(response.data)) {
                setAccommodations(response.data);
            } else {
                console.error('The fetched data is not an array:', response.data);
            }
        } catch (error) {
            console.error('There was an error fetching the data!', error);
        }

    };

    const handleItemClick = (accommodation) => {
        setSelectedItem(accommodation.id === selectedItem ? null : accommodation.id);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredAccommodations = accommodations.filter(accommodation =>
        accommodation.accommodation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const locations = [
        { name: "Home", img: homeImg, area: "Home" },
        { name: "Work", img: briefcaseImg, area: "Work"},
        { name: "School", img: backpackImg, area: "School" },
        { name: "Transit", img: transitImg, area: "Transit" },
        { name: "Medical", img: hospitalImg, area: "Medical" },
        { name: "All", img: earthImg, area: "All Locations" },
    ];  
    const categories = [
        { name: "Mobility", img: mobilityImg },
        { name: "Hearing", img: earImg },
        { name: "Cognitive", img: brainImg },
        { name: "MentalHealth", img: mentalImg },
        { name: "Sensory", img: sensorImg },
        { name: "Allergy", img: allergyImg },
        { name: "Vision", img: visionImg },
        { name: "Pain", img: painImg },
        { name: "Digestion", img: stomachImg },
        { name: "Safety", img: safetyImg },
        { name: "MedicalDevices", img: medicalImg },
        { name: "Medication", img: medicationImg },
      ];  
    const categoryObject = categories.find(cat => cat.name === category);
    const iconImg = categoryObject ? categoryObject.img : null;
        return (
            <div className="accommodations-page">
                <div className="header-container2">
                    <img src={iconImg} alt={category} className="category-image" />
                    <h1 className="accommodation-title">{category} </h1>
                    {medicalCondition && (
                        <h2 className="accommodation-title">  ({medicalCondition})</h2>
                    )}
                </div>
                <div className="navbar-container">
                    {locations.map((location) => (
                        <a
                            key={location.name}
                            href="#"
                            aria-label={`${location.area}${selectedLocation === location.name ? " (selected)" : ""}`}
                            className={`location ${selectedLocation === location.name ? "selected" : ""
                                }`}
                            onClick={() => handleLocationClick(location.name)}
                        >
                            <img
                                src={location.img}
                                alt={location.name}
                                className="location-img"
                            />
                            <span className="location-name">{location.name}</span>
                        </a>
                    ))}
                </div>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <CiSearch className="search-icon" />
                        <input 
                            type="search" 
                            className="searchbox" 
                            placeholder="Search" 
                            value={searchQuery}
                            onChange={handleSearchChange}
                            aria-label={`Search for my accommodations for ${category}`}
                        />
                    </div>
                </div>
                <div className="item-container">
                    {filteredAccommodations.length > 0 ? (
                    <ul className="item-list" aria-label="List of my accommodations">
                    {filteredAccommodations.map((accommodation) => (
                        <li
                            key={accommodation.id}
                            className={`item ${selectedItem === accommodation.id ? 'selected' : ''}`}
                            
                        >
                            <div className={`item-header ${selectedItem === accommodation.id ? 'expanded' : ''}`}>
                                <span onClick={() => handleItemClick(accommodation)}>{accommodation.accommodation}</span>
                                {isBookmarked(accommodation.id) ? (                                     
                                     <a 
                                     href="#" 
                                     onClick={(e) => {
                                       e.preventDefault(); 
                                       handleUnbookmark(accommodation.id);
                                     }}
                                     aria-label="Click to remove bookmark from this item"
                                   >
                                     <img
                                       className="img"
                                       src={saveImg}
                                       alt="Save"
                                     />
                                   </a>
                                ) : (
                                    <a 
                                        href="#" 
                                        onClick={(e) => {
                                        e.preventDefault(); 
                                        handleBookmark(accommodation.id);
                                        }}
                                        aria-label="Click to bookmark this item"
                                    >
                                        <img
                                        className="img"
                                        src={unsaveImg}
                                        alt="UnSave"
                                        />
                                    </a>
                                )}
                               
                            </div>
                            {selectedItem === accommodation.id && (
                                <div className="item-details" onClick={() => handleItemClick(accommodation)}>
                                    <img src={iconImg} alt={accommodation.accommodation} className="item-image" />
                                    <p>{accommodation.description}</p>
                                </div>
                            )}
                        </li>
                    ))}
                    </ul>
                    ) : (
                        <p className='Error'>No My Accommodations available for {category} at {selectedLocation}.</p>
                    )}
                </div>
            </div>

        );
    };

    export default myAccommodations;
