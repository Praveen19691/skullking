import React from "react";
import "./HistoryTable.scss";

/**
 * Generic table component for displaying historical data (bids/tricks)
 * Reusable across different data types with customizable styling
 *
 * @param {string} title - Table title
 * @param {Array} playerNames - Array of player names for column headers
 * @param {number} currentRound - Current round number (determines rows to show)
 * @param {Array} data - 2D array of data to display [playerIndex][roundIndex]
 * @param {string} dataLabel - Label for the data type (unused but kept for future use)
 * @param {string} highlightColor - Optional color class for highlighting cells
 */
function HistoryTable({
  title,
  playerNames,
  currentRound,
  data,
  dataLabel,
  highlightColor,
}) {
  return (
    <div className="card history-table">
      <h3>{title}</h3>

      {/* Mobile Card View */}
      <div className="mobile-card-view">
        {playerNames.map((name, playerIdx) => (
          <div key={playerIdx} className={`player-card player-${playerIdx}`}>
            <div className="player-card-header">
              <span className="player-name">{name}</span>
            </div>
            <div className="rounds-container">
              {Array.from({ length: currentRound }).map((_, roundIdx) => (
                <div key={roundIdx} className="round-data">
                  <span className="round-label">Round {roundIdx + 1}:</span>
                  <span
                    className={`round-value ${
                      highlightColor ? `highlight-${highlightColor}` : ""
                    }`}
                  >
                    {data[playerIdx][roundIdx]}
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
              {Array.from({ length: currentRound }).map((_, roundIdx) => (
                <tr key={roundIdx}>
                  <td>
                    <strong>{roundIdx + 1}</strong>
                  </td>
                  {playerNames.map((_, playerIdx) => (
                    <td
                      key={playerIdx}
                      className={
                        highlightColor ? `highlight-${highlightColor}` : ""
                      }
                    >
                      {data[playerIdx][roundIdx]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryTable;
