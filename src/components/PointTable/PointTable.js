import React from "react";
import "./PointTable.scss";

/**
 * Cumulative score table displayed in the Score Table tab
 * Shows scores for each round and running totals for all players
 * Only displays rounds that have been completed
 *
 * @param {Array} playerNames - Array of all player names
 * @param {number} currentRound - Current round number (determines visible rows)
 * @param {Array} scores - 2D array of scores [playerIndex][roundIndex]
 * @param {Array} totalScores - Array of cumulative scores per player
 */
function PointTable({ playerNames, currentRound, scores, totalScores }) {
  return (
    <div className="card point-table">
      <h3>Point Table</h3>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {playerNames.map((name, playerIdx) => (
          <div key={playerIdx} className={`player-card player-${playerIdx}`}>
            <div className="player-card-header">
              <span className="player-name">{name}</span>
              <span className="total-score">{totalScores[playerIdx]}</span>
            </div>
            <div className="rounds-container">
              {Array.from({ length: currentRound }).map((_, roundIdx) => (
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
              {/* Display only completed rounds */}
              {Array.from({ length: currentRound }).map((_, roundIdx) => (
                <tr key={roundIdx}>
                  <td>{roundIdx + 1}</td>
                  {playerNames.map((_, playerIdx) => (
                    <td key={playerIdx}>{scores[playerIdx][roundIdx]}</td>
                  ))}
                </tr>
              ))}
              {/* Running total row */}
              <tr className="total-row">
                <td>
                  <strong>Total</strong>
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

export default PointTable;
