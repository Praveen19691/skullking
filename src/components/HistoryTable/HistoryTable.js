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
  );
}

export default HistoryTable;
