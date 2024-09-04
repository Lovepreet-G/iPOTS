import { useEffect, useState, useRef } from "react";
import { useLocation , useNavigate } from "react-router-dom";
import axios from "axios";
import * as CiIcons from "react-icons/ci";
import * as PiIcons from "react-icons/pi";
import unsaveImg from '../../public/unsave.png';
import saveImg from '../../public/save.png';
import "../styles/medicalconditreview.css";
import caduceusImg from "../../public/Caduceus.png";

const MedicalConditsReview = () => {
  const host = "http://localhost";
  const userId = '1'; 
  const [conditions, setConditions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const locat = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(locat.search);
  const method = queryParams.get("Method");
  const letter = queryParams.get("letter");
  const location = queryParams.get("location");
  const listRef = useRef(null); // Create a ref for the list

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
    const fetchConditions = async () => {
      try {
        const url = host + '/iPots/iAccess-Server/medical_conditions.php?method='+method +"&letter="+letter;
        const response = await axios.get(url);
        setConditions(response.data);
      } catch (error) {
        console.error("Error fetching medical conditions:", error);
      }
    };

    const fetchBookmarks = async () => {
      const url = host + "/iPots/iAccess-Server/myMedicalCondition.php?method=All&userId=" + userId; 
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }           
    }

    fetchConditions();
    fetchBookmarks();
  }, [method, letter]);

  const handleConditionClick = (condition) => {
    navigate(`/accessmenu?medicalCondition=${condition.term}&location=${location}`);
  };

  const handleBookmark = async (conditionId) => {
    const url = host + "/iPots/iAccess-Server/myMedicalCondition.php";
    const params = {
      userId: userId, 
      medicalConditionId: conditionId,
      method: 'Add'
    };
    const response = await axios.get(url, { params });
    console.log(response);
    setBookmarks([...bookmarks, conditionId]);
  };

  const handleUnbookmark = async (conditionId) => {
    const url = host + "/iPots/iAccess-Server/myMedicalCondition.php";
    const params = {
      userId: userId,
      medicalConditionId: conditionId,
      method: "Delete"
    };
    const response = await axios.get(url, { params });
    console.log(response);
    setBookmarks(bookmarks.filter(id => id !== conditionId));
  };

  const isBookmarked = (conditionId) => {
    return bookmarks.includes(conditionId);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConditions = conditions.filter((condition) =>
    condition.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="all-page">
        <div className="title-page">
            <img src={caduceusImg} alt="Medical Conditions" className="medical-condit-logo" />
          <h1 className="name-page"> Medical Conditions</h1>
        </div>
        <div className="letter-area">
          <div className="letter-style">{letter}</div>
        </div>
        <div className="search-bar-container">
          <div className="search-bar">
            <CiIcons.CiSearch className="search-icon" />
            <input 
              type="search" 
              className="searchbox" 
              placeholder="Search" 
              value={searchTerm}
              onChange={handleSearchChange}
              aria-label={`Search with ${letter}`}
            />
          </div>
        </div>
        <div className="conditions-container">
        {filteredConditions.length > 0 ? (
        <ul className="conditions-list" aria-label={`List of conditions start with ${letter}`} tabIndex="-1" ref={listRef}>
            {filteredConditions.map((condition) => (
              <li key={condition.id} className="condition-box">
                <div className="condition" onClick={() => handleConditionClick(condition)}>{condition.term}</div>
                <div className="icons">
                  {isBookmarked(condition.id) ? (
                     <a 
                     href="#" 
                     onClick={(e) => {
                       e.preventDefault(); 
                       handleUnbookmark(condition.id);
                     }}
                     aria-label="Click to remove bookmark from this item"
                   >
                     <img
                       className="bookmark-img"
                       src={saveImg}
                       alt="Save"
                     />
                   </a>
                  ) : (
                    <a 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault(); 
                      handleBookmark(condition.id);
                    }}
                    aria-label="Click to bookmark this item"
                  >
                    <img
                      className="unbookmarkimg"
                      src={unsaveImg}
                      alt="UnSave"
                    />
                  </a>
                  )}
                </div>
              </li>
            ))}
            </ul>
          ) : (
            <p className='Error'>No medical conditions match your search.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MedicalConditsReview;
