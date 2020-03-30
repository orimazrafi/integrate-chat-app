import React from "react";
import "./Button.css";
export const Button = ({ onLeave }) => (
  <div className="button__container">
    <button className="btn btn-secondary" onClick={onLeave}>
      X
    </button>
  </div>
);
