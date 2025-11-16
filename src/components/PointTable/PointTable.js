import React from "react";
import "./PointTable.scss";

function PointTable({ playerNames, currentRound, scores, totalScores }) {
  return (
    <div className="card point-table">
      <h3>Point Table</h3>
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
                <td>{roundIdx + 1}</td>
                {playerNames.map((_, playerIdx) => (
                  <td key={playerIdx}>{scores[playerIdx][roundIdx]}</td>
                ))}
              </tr>
            ))}
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
  );
}

export default PointTable;
