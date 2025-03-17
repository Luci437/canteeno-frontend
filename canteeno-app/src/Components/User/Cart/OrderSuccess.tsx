import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";

export const OrderSuccess = () => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate("/");
  };

  return (
    <div className="success-container">
      <div className="success-box">
        <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
        <h2>Order Placed Successfully!</h2>
        <p>Your delicious food is on the way.</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
