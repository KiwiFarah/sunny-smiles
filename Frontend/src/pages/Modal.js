import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./Modal.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function Modal({ show, onClose, onGenerateReport, currentLevel }) {
  const navigate = useNavigate();

  if (!show) return null;

  const handleNextLevel = () => {
    let nextLevelRoute;

    // Decide the route based on the current level.
    switch (currentLevel) {
      case 1:
        nextLevelRoute = "/level-two";
        break;
      case 2:
        nextLevelRoute = "/level-three";
        break;
      case 3:
        nextLevelRoute = "/level-four";
        break;
      case 4:
        nextLevelRoute = "/level-five";
        break;
      case 5:
        nextLevelRoute = "/level-six";
        break;
      case 6:
        nextLevelRoute = "/level-seven";
        break;
      default:
        nextLevelRoute = "/";
    }

    navigate(nextLevelRoute);
  };

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        {/* <CloseIcon className="closeIcon" onClick={onClose} /> */}
        <img src={logo} alt="Logo" className="modalLogo" />
        <h1>Congratulations!</h1>
        <p>You did fantastic! Ready for the next level?</p>
        <div className="buttonGroup">
          <button className="generateReportButton" onClick={onGenerateReport}>
            Generate Report
          </button>
          <button className="nextLevelButton" onClick={handleNextLevel}>
            Next Level <ArrowForwardIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
