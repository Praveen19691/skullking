import React from "react";
import "./BiddingTricksTable.scss";

/**
 * Combined table showing both bidding and tricks won history
 * Displays bids and tricks for each player across all completed rounds
 * Uses a two-tier header: player names on top, Bid/Tricks subheaders below
 * Color-coded cells help distinguish bids from tricks
 *
 * @param {Array} playerNames - Array of all player names
 * @param {number} currentRound - Current round number (determines visible rows)
 * @param {Array} bids - 2D array of bids [playerIndex][roundIndex]
 * @param {Array} tricksWon - 2D array of tricks won [playerIndex][roundIndex]
 */
function BiddingTricksTable({ playerNames, currentRound, bids, tricksWon }) {
  return (
    <div className="card bidding-tricks-table">
      <h3>Bidding & Tricks History</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            {/* First header row: player names spanning 2 columns each */}
            <tr>
              <th rowSpan="2">Round</th>
              {playerNames.map((name, idx) => (
                <th key={idx} colSpan="2" className="player-header">
                  {name}
                </th>
              ))}
            </tr>
            {/* Second header row: Bid and Tricks sub-headers for each player */}
            <tr>
              {playerNames.map((_, idx) => (
                <React.Fragment key={idx}>
                  <th className="sub-header">Bid</th>
                  <th className="sub-header">Tricks</th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Display only completed rounds */}
            {Array.from({ length: currentRound }).map((_, roundIdx) => (
              <tr key={roundIdx}>
                <td className="round-cell">
                  <strong>{roundIdx + 1}</strong>
                </td>
                {/* For each player, show bid and tricks side by side */}
                {playerNames.map((_, playerIdx) => (
                  <React.Fragment key={playerIdx}>
                    <td className="bid-cell">{bids[playerIdx][roundIdx]}</td>
                    <td className="tricks-cell">
                      {tricksWon[playerIdx][roundIdx]}
                    </td>
                  </React.Fragment>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BiddingTricksTable;
