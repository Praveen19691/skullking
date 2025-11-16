import React from "react";
import "./GameInput.scss";

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
