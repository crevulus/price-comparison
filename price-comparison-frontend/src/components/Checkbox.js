import React from "react";
import "../App.css";

const Checkbox = ({ label, isSelected, onCheckboxChange, dbKey, onClick }) => (
  <div className="answers-list">
    <label className="answer-and-check">
      <input
        type="checkbox"
        name={label}
        checked={isSelected}
        onChange={onCheckboxChange}
        className="checkbox"
        onClick={onClick}
        value={dbKey}
      />
      {label}
    </label>
  </div>
);

export default Checkbox;
