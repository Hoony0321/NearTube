import React, { useState } from "react";

const DropdownInput = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="dropdown-container">
      <label htmlFor="dropdown" className="dropdown-label">
        Select an option:
      </label>
      <select
        id="dropdown"
        value={selectedValue}
        onChange={handleSelectChange}
        className="dropdown-select"
      >
        <option value="">-- Select --</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </select>
      <p className="selected-value">Selected value: {selectedValue}</p>
    </div>
  );
};

export default DropdownInput;
