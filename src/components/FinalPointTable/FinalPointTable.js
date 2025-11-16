import React from "react";
import "./FinalPointTable.scss";

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
