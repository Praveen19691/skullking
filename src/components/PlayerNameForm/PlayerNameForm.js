import React from "react";
import "./PlayerNameForm.scss";

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
            {invalidNames[idx] && (
              <span className="error-text">
                Name must be at least 3 characters
              </span>
            )}
          </div>
        ))}
        {error && <div className="error-message">{error}</div>}
        <button type="submit">Start Game</button>
      </form>
    </div>
  );
}

export default PlayerNameForm;
