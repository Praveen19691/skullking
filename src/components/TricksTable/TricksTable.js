import React from "react";
import HistoryTable from "../HistoryTable/HistoryTable";

function TricksTable({ playerNames, currentRound, tricksWon }) {
  return (
    <HistoryTable
      title="Tricks Won History"
      playerNames={playerNames}
      currentRound={currentRound}
      data={tricksWon}
      highlightColor="green"
    />
  );
}

export default TricksTable;
