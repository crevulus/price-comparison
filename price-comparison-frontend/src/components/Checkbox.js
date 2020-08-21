import React from "react";
import "../App.css";

const Checkbox = ({
  label,
  isSelected,
  onCheckboxChange,
  dbKey,
  onClick,
  price,
}) => (
  <div className="answer-row">
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
    <div className="answer-price">€{price}</div>
  </div>
);

export default Checkbox;
