import React from "react";
import "./ScoreDisplayTable.scss";

/**
 * Simple table component to display scores for all players
 * Used in RoundScores to show the results of a completed round
 *
 * @param {Array} playerNames - Array of player names for column headers
 * @param {Array} values - Array of values to display for each player
 */
function ScoreDisplayTable({ playerNames, values }) {
  return (
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
            <td key={idx}>{value}</td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default ScoreDisplayTable;
