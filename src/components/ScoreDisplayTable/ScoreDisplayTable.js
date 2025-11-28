import React from "react";
import "./ScoreDisplayTable.scss";

/**
 * Simple table component to display scores for all players
 * Used in RoundScores to show the results of a completed round
 *
 * @param {Array} playerNames - Array of player names for column headers
 * @param {Array} values - Array of values to display for each player
 */
function formatScore(value) {
  if (typeof value === "number" && !isNaN(value)) {
    if (value < 0) return value.toString();
    if (value === 0) return "0";
    return value.toString();
  }
  return value === 0 ? "0" : value || "0";
}

function ScoreDisplayTable({ playerNames, values }) {
  console.log("ScoreDisplayTable - values:", values);
  console.log(
    "ScoreDisplayTable - values types:",
    values.map((v) => typeof v)
  );

  return (
    <div className="score-display-wrapper">
      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {playerNames.map((name, playerIdx) => {
          const score = values[playerIdx];
          console.log(
            `Player ${name} (${playerIdx}): score =`,
            score,
            "type:",
            typeof score
          );

          return (
            <div key={playerIdx} className={`player-card player-${playerIdx}`}>
              <div className="player-info">
                <span className="player-name">{name}</span>
                <span
                  className={`player-score ${
                    Number(score) >= 0 ? "positive" : "negative"
                  }`}
                >
                  {score !== null && score !== undefined ? score : "N/A"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Table View */}
      <div className="desktop-table-view">
        <table className="score-display-table">
          <thead>
            <tr>
              {playerNames.map((name, idx) => (
                <th key={idx}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {values.map((value, idx) => (
                <td key={idx}>{formatScore(value)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScoreDisplayTable;
