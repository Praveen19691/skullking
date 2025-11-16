import React from "react";
import "./PlayerNameForm.scss";

/**
 * Player name entry form displayed at game start
 * Validates that all names are at least 3 characters and unique
 *
 * @param {Array} playerNames - Array of current player name values
 * @param {Array} invalidNames - Boolean array indicating invalid names
 * @param {string} error - General error message (e.g., duplicate names)
 * @param {function} onNameChange - Handler for name input changes (index, value)
 * @param {function} onSubmit - Form submission handler
 */
function PlayerNameForm({
  playerNames,
  invalidNames,
  error,
  onNameChange,
  onSubmit,
}) {
  return (
    <div className="card">
      <h2>Enter Player Names</h2>
      <form onSubmit={onSubmit}>
        {/* Generate input field for each player */}
        {playerNames.map((name, idx) => (
          <div key={idx} className="player-name-input">
            <label>
              Player {idx + 1} Name:
              <input
                type="text"
                value={name}
                onChange={(e) => onNameChange(idx, e.target.value)}
                required
                className={invalidNames[idx] ? "invalid" : ""}
              />
            </label>
            {/* Show individual validation error */}
            {invalidNames[idx] && (
              <span className="error-text">
                Name must be at least 3 characters
              </span>
            )}
          </div>
        ))}
        {/* Show general error (e.g., duplicate names) */}
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default PlayerNameForm;
