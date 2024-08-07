import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import * as CiIcons from "react-icons/ci";
import * as PiIcons from "react-icons/pi";
import unsaveImg from "../../public/unsave.png";
import saveImg from "../../public/save.png";
import dictionaryImg from "../../public/Dictionary.png";
import "../styles/dictionaryreview.css";

const DictionaryReview = () => {
  const host = "http://localhost";
  const userId = "1";
  const [conditions, setConditions] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const locat = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(locat.search);
  const method = queryParams.get("Method");
  const letter = queryParams.get("letter");
  const location = queryParams.get("location");

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const url =
          host +
          "/iPots/iAccess-Server/medical_conditions.php?method=" +
          method +
          "&letter=" +
          letter;
        const response = await axios.get(url);
        setConditions(response.data);
      } catch (error) {
        console.error("Error fetching medical conditions:", error);
      }
    };

    const fetchBookmarks = async () => {
      const url =
        host +
        "/iPots/iAccess-Server/myMedicalCondition.php?method=All&userId=" +
        userId;
      const response = await axios.get(url);
      if (Array.isArray(response.data)) {
        setBookmarks(response.data);
      }
    };

    fetchConditions();
    fetchBookmarks();
  }, [method, letter]);

  const handleConditionClick = (condition) => {
    navigate(
      `/accessmenu?medicalCondition=${condition.term}&location=${location}`
    );
  };

  const handleBookmark = async (conditionId) => {
    const url = host + "/iPots/iAccess-Server/myMedicalCondition.php";
    const params = {
      userId: userId,
      medicalConditionId: conditionId,
      method: "Add",
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
      method: "Delete",
    };
    const response = await axios.get(url, { params });
    console.log(response);
    setBookmarks(bookmarks.filter((id) => id !== conditionId));
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
      <div className="dictionary-all-page">
        <div className="dictionary-title-page">
          <span className="icon">
            <img src={dictionaryImg} className="dictionary" />
          </span>
          <span className="dictionary-name-page">Dictionary</span>
        </div>
        <div className="dictionary-letter-area">
          <h1 className="dictionary-letter-style">{letter}</h1>
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
            />
            <PiIcons.PiMicrophoneFill className="microphone-icon" />
          </div>
        </div>
        <div className="dictionary-container">
          {filteredConditions.length > 0 ? (
            filteredConditions.map((condition) => (
              <div key={condition.id} className="dictionary-box">
                <div
                  className="dictionary"
                  onClick={() => handleConditionClick(condition)}
                >
                  {condition.term}
                </div>
                <div className="icons">
                  {isBookmarked(condition.id) ? (
                    <img
                      className="img"
                      src={saveImg}
                      onClick={() => handleUnbookmark(condition.id)}
                      alt="Save"
                    />
                  ) : (
                    <img
                      className="img"
                      src={unsaveImg}
                      onClick={() => handleBookmark(condition.id)}
                      alt="UnSave"
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="Error">No definitions match your search.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DictionaryReview;
