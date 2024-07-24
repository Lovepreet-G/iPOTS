import React, { useState } from "react";
import law from "/Law.png";
import "../styles/accommodationsPage.css";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import homeImg from "../../public/home.png";
import briefcaseImg from "../../public/briefcase.png";
import backpackImg from "../../public/backpack.png";
import transitImg from "../../public/image 18.png";
import hospitalImg from "../../public/hospital-sign.png";
import earthImg from "../../public/planet-earth.png";

export default function AccommodationsPage() {
  const AccommodationsPage = () => {
  const locat = useLocation(); // Get the current location object
  const queryParams = new URLSearchParams(locat.search); // Parse the query string
  const selectedLocation = queryParams.get('location');
  const selectedCategory = queryParams.get('category');
  const accommodationsData = {
    Mobility: [ "Lorem Ipsum"],
    Hearing: ["Lorem Ipsum"],
    Cognitive: ["Lorem Ipsum"],
    MentalHealth: ["Lorem Ipsum"],
    Sensory: ["Lorem Ipsum"],
    Allergy: ["Lorem Ipsum"],
    Vision: ["Lorem Ipsum"],
    Pain: ["Lorem Ipsum"],
    Digestion: ["Lorem Ipsum"],
    Safety: ["Lorem Ipsum"],
    MedicalDevices: ["Lorem Ipsum"]
  }
  const locations = [
    { name: "Home", img: homeImg },
    { name: "Work", img: briefcaseImg },
    { name: "School", img: backpackImg },
    { name: "Transit", img: transitImg },
    { name: "Medical", img: hospitalImg },
    { name: "All", img: earthImg },
  ];

  return (
    
  )
}