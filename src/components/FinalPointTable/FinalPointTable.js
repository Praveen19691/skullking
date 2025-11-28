import React from "react";
import "./FinalPointTable.scss";

/**
 * Comprehensive point breakdown table shown at game end
 * Displays scores for each player across all rounds
 * Includes a final total row with cumulative scores
 *
 * @param {Array} playerNames - Array of all player names
 * @param {Array} scores - 2D array of scores [playerIndex][roundIndex]
 * @param {Array} totalScores - Array of final cumulative scores per player
 * @param {number} totalRounds - Total number of rounds played
 */
function FinalPointTable({ playerNames, scores, totalScores, totalRounds }) {
  return (
    <div className="card final-point-table">
      <h3>Final Point Table</h3>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {playerNames.map((name, playerIdx) => (
          <div key={playerIdx} className={`player-card player-${playerIdx}`}>
            <div className="player-card-header">
              <span className="player-name">{name}</span>
              <span className="final-total">{totalScores[playerIdx]}</span>
            </div>
            <div className="rounds-container">
              {Array.from({ length: totalRounds }).map((_, roundIdx) => (
                <div key={roundIdx} className="round-data">
                  <span className="round-label">Round {roundIdx + 1}:</span>
                  <span
                    className={`round-value ${
                      scores[playerIdx][roundIdx] >= 0 ? "positive" : "negative"
                    }`}
                  >
                    {scores[playerIdx][roundIdx]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="desktop-table-view">
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Round</th>
                {playerNames.map((name, idx) => (
                  <th key={idx}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Display score for each round */}
              {Array.from({ length: totalRounds }).map((_, roundIdx) => (
                <tr key={roundIdx}>
                  <td>
                    <strong>{roundIdx + 1}</strong>
                  </td>
                  {playerNames.map((_, playerIdx) => (
                    <td key={playerIdx}>{scores[playerIdx][roundIdx]}</td>
                  ))}
                </tr>
              ))}
              {/* Final total row highlighting cumulative scores */}
              <tr className="final-total-row">
                <td>
                  <strong>Final Total</strong>
                </td>
                {totalScores.map((score, idx) => (
                  <td key={idx}>
                    <strong>{score}</strong>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default FinalPointTable;
