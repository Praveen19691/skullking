import React from "react";
import "./HistoryTable.scss";

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
