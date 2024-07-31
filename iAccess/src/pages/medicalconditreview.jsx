import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as CiIcons from "react-icons/ci";
import * as PiIcons from "react-icons/pi";
import "../styles/medicalconditreview.css";

const MedicalConditsReview = () => {
  const { letter } = useParams();
  const [conditions, setConditions] = useState([]);

  //useEffect and axios to get data from backend
  useEffect(() => {
    axios
      .get(`http://localhost:8880/iPOTS/iAccess-Server/medical_conditions.php?letter=${letter}`)
      .then((response) => {
        setConditions(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, [letter]);
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
        {/* {conditions.map((condition) => (
            <div key={condition.id} className="condition-box">
              <div className="condition">{condition.term}</div>
              <div className="icons">
                <CiIcons.CiBookmark className="bookmark" size={36} />
                <PiIcons.PiDotsThreeOutlineLight className="three-dots" size={36} />
              </div>
            </div>
          ))} */}
          <div className="condition-box">
            <div className="condition">Condition</div>
            <div className="icons">
              <CiIcons.CiBookmark className="bookmark" size={36} />
            </div>
          </div>
          <div className="condition-box">
            <div className="condition">Condition</div>
            <div className="icons">
              <CiIcons.CiBookmark className="bookmark" size={36} />
            </div>
          </div>
          <div className="condition-box">
            <div className="condition">Condition</div>
            <div className="icons">
              <CiIcons.CiBookmark className="bookmark" size={36} />
            </div>
          </div>
          <div className="condition-box">
            <div className="condition">Condition</div>
            <div className="icons">
              <CiIcons.CiBookmark className="bookmark" size={36} />
            </div>
          </div>
          <div className="condition-box">
            <div className="condition">Condition</div>
            <div className="icons">
              <CiIcons.CiBookmark className="bookmark" size={36} />
            </div>
          </div>
          <div className="condition-box">
            <div className="condition">Condition</div>
            <div className="icons">
              <CiIcons.CiBookmark className="bookmark" size={36} />
            </div>
          </div>
          <div className="condition-box">
            <div className="condition">Condition</div>
            <div className="icons">
              <CiIcons.CiBookmark className="bookmark" size={36} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicalConditsReview;
