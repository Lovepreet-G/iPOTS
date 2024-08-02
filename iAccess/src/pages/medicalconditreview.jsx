import { useEffect, useState } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import axios from "axios";
import * as CiIcons from "react-icons/ci";
import * as PiIcons from "react-icons/pi";
import "../styles/medicalconditreview.css";

const MedicalConditsReview = () => {
  const host = "http://localhost";
  const [conditions, setConditions] = useState([]);
  const locat = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(locat.search);
  const method = queryParams.get("Method");
  const letter = queryParams.get("letter");
  const location = queryParams.get("location");

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const url = host + '/iPots/iAccess-Server/medical_conditions.php?method='+method +"&letter="+letter;
        const response = await axios.get(url);
        setConditions(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching medical conditions:", error);
      }
    };

    fetchConditions();
  }, [method, letter]);
// to redirct the user to accessmenu page 
  const handleConditionClick = (condition) => {
    navigate(`/accessmenu?medicalCondition=${condition.term}&location=${location}`);
  };

  return (
    <>
      <div className="all-page">
        <div className="title-page">
          <span className="icon">
            <img src="../../public/Caduceus.png" className="caduceus" />
          </span>
          <span className="name-page">My Medical Conditions</span>
        </div>
        <div className="letter-area">
          <h1 className="letter-style">{letter}</h1>
        </div>
        <div className="search-bar-container">
          <div className="search-bar">
            <CiIcons.CiSearch className="search-icon" />
            <input type="search" className="searchbox" placeholder="Search" />
            <PiIcons.PiMicrophoneFill className="microphone-icon" />
          </div>
        </div>
        <div className="conditions-container">
          {conditions.map((condition) => (
            <div key={condition.id} className="condition-box">
              <div className="condition" onClick={() => handleConditionClick(condition)}>{condition.term}</div>
              <div className="icons">
                <CiIcons.CiBookmark className="bookmark" size={36} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MedicalConditsReview;
