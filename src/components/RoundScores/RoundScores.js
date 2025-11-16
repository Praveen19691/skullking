import React from "react";
import "./RoundScores.scss";

function RoundScores({
  playerNames,
  currentRound,
  scores,
  totalRounds,
  onNextRound,
}) {
  return (
    <div className="card round-scores">
      <h3>Round {currentRound} - Scores</h3>
      <div className="table-wrapper">
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
                <td key={idx}>{scores[idx][currentRound - 1]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <button type="button" className="next-round-btn" onClick={onNextRound}>
        {currentRound < totalRounds ? "Next Round" : "Show Winner"}
      </button>
    </div>
  );
}

export default RoundScores;
