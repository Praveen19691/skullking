import React from "react";
import "./BiddingTricksTable.scss";
import TableHeaderRow from "./TableHeaderRow";
import PlayerDataCells from "./PlayerDataCells";
import TotalScoresRow from "./TotalScoresRow";

/**
 * BiddingTricksTable Component
 *
 * Displays a comprehensive history of all game data in a single table:
 * - Player bids for each round
 * - Tricks won by each player per round
 * - Scores earned/lost per round
 * - Total cumulative scores at the bottom
 *
 * Table Structure:
 * - Two-tier header: Player names on top, Bid/Tricks/Score columns below
 * - One row per completed round
 * - Bottom row showing totals
 * - Color-coded columns for each player (10 distinct colors)
 *
 * Features:
 * - Only shows completed rounds (currentRound determines visible data)
 * - Each player gets a unique color for their columns
 * - Visual feedback for correct/incorrect bids
 * - Responsive design with horizontal scrolling if needed
 *
 * @param {Array} playerNames - Array of all player names (strings)
 * @param {number} currentRound - Current round number (1-indexed, determines visible rows)
 * @param {Array} bids - 2D array of bids [playerIndex][roundIndex]
 * @param {Array} tricksWon - 2D array of tricks won [playerIndex][roundIndex]
 * @param {Array} scores - 2D array of calculated scores [playerIndex][roundIndex]
 * @param {Array} totalScores - Array of cumulative total scores for each player
 * @returns {JSX.Element} A card containing the complete game history table
 */
function BiddingTricksTable({
  playerNames,
  currentRound,
  bids,
  tricksWon,
  scores,
  totalScores,
}) {
  return (
    <div className="card bidding-tricks-table">
      {/* Table title */}
      <h3>Bidding, Tricks & Scores History</h3>

      {/* Wrapper div enables horizontal scrolling on small screens */}
      <div className="table-wrapper">
        <table>
          {/* Table Header: Player names and column labels */}
          <thead>
            <TableHeaderRow playerNames={playerNames} />
          </thead>

          {/* Table Body: Round data + totals */}
          <tbody>
            {/* 
              Render one row for each completed round
              Array.from creates an array of length currentRound
              We iterate with roundIdx (0-based index)
            */}
            {Array.from({ length: currentRound }).map((_, roundIdx) => (
              <tr key={roundIdx}>
                {/* Round number cell (1-indexed for display) */}
                <td className="round-cell">
                  <strong>{roundIdx + 1}</strong>
                </td>

                {/* 
                  For each player, render their bid, tricks, and score
                  Using PlayerDataCells component to encapsulate cell logic
                */}
                {playerNames.map((_, playerIdx) => (
                  <PlayerDataCells
                    key={playerIdx}
                    playerIdx={playerIdx}
                    roundIdx={roundIdx}
                    bids={bids}
                    tricksWon={tricksWon}
                    scores={scores}
                  />
                ))}
              </tr>
            ))}

            {/* Bottom row showing total scores for all players */}
            <TotalScoresRow
              playerNames={playerNames}
              totalScores={totalScores}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BiddingTricksTable;
