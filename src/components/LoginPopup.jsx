import React from "react";
import "../components/LoginPopup.css";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleNext = () => {
    localStorage.setItem("loginPopupShown", "true");
    onClose();
    navigate("/login");
  };

  const handleClose = () => {
    localStorage.setItem("loginPopupShown", "true");
    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-card">
        <button className="popup-close" onClick={handleClose}>×</button>

        <h2>Welcome to VIVASVAN CONSULTANT</h2>
        <p>Please login or sign up to continue</p>

        <button className="popup-btn" onClick={handleNext}>
          Next →
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
