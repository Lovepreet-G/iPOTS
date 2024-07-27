import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { PiMicrophoneFill } from "react-icons/pi";

import "../styles/accommodation2.css";
import homeImg from "../../public/home.png";
import briefcaseImg from "../../public/briefcase.png";
import backpackImg from "../../public/backpack.png";
import transitImg from "../../public/image 18.png";
import hospitalImg from "../../public/hospital-sign.png";
import earthImg from "../../public/planet-earth.png";
import saveImg from '../../public/save-instagram.png';
import visionImg from "../../public/witness.png";

const Accommodation2 = () => {
    const locat = useLocation(); // Get the current location object
    const queryParams = new URLSearchParams(locat.search); // Parse the query string
    const selectedLocation = queryParams.get("location");
    // const selectedCategory = queryParams.get("category");
    // const [selectedLocation, setSelectedLocation] = useState(location);
    // const navigate = useNavigate();

    // const handleLocationClick = (location) => {
    //     setSelectedLocation(location);
    // };
        const [selectedItem, setSelectedItem] = useState(null);

        const handleItemClick = (item) => {
            setSelectedItem(item.id === selectedItem ? null : item.id);
        };

    const locations = [
        { name: "Home", img: homeImg },
        { name: "Work", img: briefcaseImg },
        { name: "School", img: backpackImg },
        { name: "Transit", img: transitImg },
        { name: "Medical", img: hospitalImg },
        { name: "All", img: earthImg },
    ];
    const items = [
        {
            id: 1,
            title: "Lorem Ipsum",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            image: visionImg, // Placeholder image URL
        },
        {
            id: 2,
            title: "Lorem Ipsum",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            image: visionImg, // Placeholder image URL
        },
    ];
    

        return (
            <div className="accommodations-page">
                <div className="header-container2">
                    <img src={visionImg} alt="Vision" className="vision-image" />
                    <h1 className="accommodation-title">Vision</h1>
                </div>
                <div className="navbar-container">
                    {locations.map((location) => (
                        <div
                            key={location.name}
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
                        </div>
                    ))}
                </div>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <CiSearch className="search-icon" />
                        <input type="search" className="searchbox" placeholder="Search" />
                        <PiMicrophoneFill className="microphone-icon" />
                    </div>
                </div>
                <div className="item-list">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`item ${selectedItem === item.id ? 'selected' : ''}`}
                            onClick={() => handleItemClick(item)}
                        >
                            <div className={`item-header ${selectedItem === item.id ? 'expanded' : ''}`}>
                                <span>{item.title}</span>
                                <img src={saveImg} alt="Save" className="acommodation-save" />
                            </div>
                            {selectedItem === item.id && (
                                <div className="item-details">
                                    <img src={item.image} alt={item.title} className="item-image" />
                                    <p>{item.description}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

        );
    };

    export default Accommodation2;