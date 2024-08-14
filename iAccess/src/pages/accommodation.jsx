import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";

import "../styles/accommodation.css";
import homeImg from "../../public/home.png";
import briefcaseImg from "../../public/briefcase.png";
import backpackImg from "../../public/backpack.png";
import transitImg from "../../public/image 18.png";
import hospitalImg from "../../public/hospital-sign.png";
import earthImg from "../../public/planet-earth.png";
import saveImg from '../../public/save.png';
import mobilityImg from "../../public/mobility.png";
import earImg from "../../public/ear.png";
import brainImg from "../../public/brain.png";
import mentalImg from "../../public/mental.png";
import sensorImg from "../../public/sensorial.png";
import allergyImg from "../../public/allergies.png";
import visionImg from "../../public/witness.png";
import painImg from "../../public/pain.png";
import stomachImg from "../../public/stomach.png";
import safetyImg from "../../public/prevention.png";
import medicalImg from "../../public/medical.png";

const Accommodation2 = () => {
    const host = "http://localhost";
    const [accommodations, setAccommodations] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const locat = useLocation();
    const queryParams = new URLSearchParams(locat.search);
    const location = queryParams.get('location');
    const category = queryParams.get('category');
    const medicalCondition = queryParams.get('medicalCondition');
    const [selectedLocation, setSelectedLocation] = useState(location);


    useEffect(() => {
        const fetchBookmarks = async () => {
            const url = host + "/iPots/iAccess-Server/myAccessibility.php?method=All&userId=" + userId;
            const response = await axios.get(url);
            if (Array.isArray(response.data)) {
                setBookmarks(response.data);
            }
        };

        const fetchData = async () => {
            try {
                const params = { category: category, location: location };
                if (medicalCondition) {
                    params.medicalCondition = medicalCondition;
                }

                const url = host + 'iPots/iAccess-Server/accommodation.php';
                const response = await axios.get(url, { params });
                if (Array.isArray(response.data)) {
                    setAccommodations(response.data);
                } else {
                    console.error('The fetched data is not an array:', response.data);
                }
            } catch (error) {
                console.error('There was an error fetching the data!', error);
            }
        };

        fetchBookmarks();
        fetchData();
    }, [location, category]);

    const handleBookmark = async (accommodationId) => {
        const url = host + "/iPots/iAccess-Server/myAccessibility.php";
        const params = { userId: userId, accommodationId: accommodationId, method: 'Add' };
        const response = await axios.get(url, { params });
        console.log(response);
        setBookmarks([...bookmarks, accommodationId]);
    };

    const handleUnbookmark = async (accommodationId) => {
        const url = host + "/iPots/iAccess-Server/myAccessibility.php";
        const params = { userId: userId, accommodationId: accommodationId, method: "Delete" };
        const response = await axios.get(url, { params });
        console.log(response);
        setBookmarks(bookmarks.filter(id => id !== accommodationId));
    };

    const isBookmarked = (accommodationId) => {
        return bookmarks.includes(accommodationId);
    };

    const handleLocationClick = async (location) => {
        setSelectedLocation(location);
        try {
            const url = host + '/iPots/iAccess-Server/accommodation.php';
            const response = await axios.get(url, { params: { category: category, location: location } });
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
        setSearchTerm(event.target.value);
    };

    const filteredAccommodations = accommodations.filter((accommodation) =>
        accommodation.accommodation.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const locations = [
        { name: "Home", img: homeImg },
        { name: "Work", img: briefcaseImg },
        { name: "School", img: backpackImg },
        { name: "Transit", img: transitImg },
        { name: "Medical", img: hospitalImg },
        { name: "All", img: earthImg },
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
    ];

    const categoryObject = categories.find(cat => cat.name === category);
    const iconImg = categoryObject ? categoryObject.img : null;

    return (
        <div className="accommodations-page">
            <div className="header-container2">
                <img src={iconImg} alt="Vision" className="vision-image" />
                <h1 className="accommodation-title">{category}</h1>
                {medicalCondition && (
                        <h2 className="accommodation-title">  ({medicalCondition})</h2>
                    )}
            </div>
            <div className="navbar-container">
                {locations.map((location) => (
                    <div
                        key={location.name}
                        className={`location ${selectedLocation === location.name ? "selected" : ""}`}
                        onClick={() => handleLocationClick(location.name)}
                    >
                        <img src={location.img} alt={location.name} className="location-img" />
                        <span className="location-name">{location.name}</span>
                    </div>
                ))}
            </div>
            <div className="search-bar-container">
                <div className="search-bar">
                    <CiSearch className="search-icon" />
                    <input 
                        type="search" 
                        className="searchbox" 
                        placeholder="Search" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <PiMicrophoneFill className="microphone-icon" />
                </div>
            </div>
            <div className="item-list">
                {filteredAccommodations.length > 0 ? (
                    filteredAccommodations.map((accommodation) => (
                        <div
                            key={accommodation.id}
                            className={`item ${selectedItem === accommodation.id ? 'selected' : ''}`}
                        >
                            <div className={`item-header ${selectedItem === accommodation.id ? 'expanded' : ''}`}>
                                <span onClick={() => handleItemClick(accommodation)}>{accommodation.accommodation}</span>
                                {isBookmarked(accommodation.id) ? (
                                    <img className="img" src={saveImg} onClick={() => handleUnbookmark(accommodation.id)} alt="Save" />
                                ) : (
                                    <img className="img" src={unsaveImg} onClick={() => handleBookmark(accommodation.id)} alt="Save" />
                                )}
                            </div>
                            {selectedItem === accommodation.id && (
                                <div className="item-details">
                                    <img src={iconImg} alt={accommodation.title} className="item-image" />
                                    <p>{accommodation.description}</p>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className='Error'>No accommodations available for {category} at {selectedLocation}.</p>
                )}
            </div>
        </div>
    );
};

export default Accommodation2;
