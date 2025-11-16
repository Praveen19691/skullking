import React from "react";
import HistoryTable from "../HistoryTable";

function BiddingTable({ playerNames, currentRound, bids }) {
  return (
    <HistoryTable
      title="Bidding History"
      playerNames={playerNames}
      currentRound={currentRound}
      data={bids}
      highlightColor="yellow"
    />
  );
}

export default BiddingTable;
