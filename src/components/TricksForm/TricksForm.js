import React from "react";
import GameInput from "../GameInput";
import "./TricksForm.scss";

function TricksForm({
  playerNames,
  currentRound,
  tricksWon,
  tricksInputErrors,
  tricksError,
  onTricksChange,
  onSubmit,
}) {
  return (
    <div className="card tricks-form">
      <h3>Round {currentRound} - Tricks Won</h3>
      <div className="table-wrapper">
        <form onSubmit={onSubmit}>
          <table>
            <thead>
              <tr>
                {playerNames.map((name, idx) => (
                  <th key={idx}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {playerNames.map((_, idx) => (
                  <td key={idx}>
                    <GameInput
                      value={tricksWon[idx][currentRound - 1]}
                      onChange={(e) => onTricksChange(idx, e.target.value)}
                      hasError={tricksInputErrors[idx]}
                      errorMessage="Enter a valid number"
                      hintText="Tricks Won"
                      maxValue={currentRound}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          {tricksError && <div className="error-message">{tricksError}</div>}
          <button type="submit" className="submit-btn">
            Calculate Scores
          </button>
        </form>
      </div>
    </div>
  );
}

export default TricksForm;
