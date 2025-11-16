import React from "react";
import "./GameInput.scss";

/**
 * Reusable input component with validation styling
 * Used for bid and tricks input forms
 *
 * @param {string} value - Current input value
 * @param {function} onChange - Change handler
 * @param {function} onFocus - Focus handler to clear input
 * @param {boolean} hasError - Whether input has validation error
 * @param {string} errorMessage - Error message to display
 * @param {string} hintText - Optional hint text
 * @param {number} maxValue - Maximum allowed value
 * @param {string} className - Additional CSS classes
 */
function GameInput({
  value,
  onChange,
  onFocus,
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
        onFocus={onFocus}
        required
        className={`game-input ${hasError ? "error" : ""} ${className}`}
      />
      {hasError && <div className="error-text">{errorMessage}</div>}
      {hintText && <div className="hint-text">{hintText}</div>}
    </div>
  );
}

export default GameInput;
