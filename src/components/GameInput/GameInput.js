import React from "react";
import "./GameInput.scss";

/**
 * Reusable input component with validation styling
 * Used for bid and tricks input forms
 *
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler
 * @param {boolean} hasError - Whether input has validation error
 * @param {string} errorMessage - Error message to display
 * @param {string} hintText - Optional hint text
 * @param {number} maxValue - Maximum allowed value
 * @param {string} className - Additional CSS classes
 */
function GameInput({
  value,
  onChange,
  hasError,
  errorMessage,
  hintText,
  maxValue,
  className = "",
}) {
  return (
    <div className="game-input-container">
      <input
        type="text"
        min={0}
        max={maxValue}
        value={value}
        onChange={onChange}
        required
        className={`game-input ${hasError ? "error" : ""} ${className}`}
      />
      {hasError && <div className="error-text">{errorMessage}</div>}
      {hintText && <div className="hint-text">{hintText}</div>}
    </div>
  );
}

export default GameInput;
