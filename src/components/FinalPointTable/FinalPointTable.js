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
  );
}

export default FinalPointTable;
