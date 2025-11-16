import React from "react";

/**
 * PlayerDataCells Component
 *
 * Renders three table cells (Bid, Tricks, Score) for a single player in one round.
 * This component encapsulates the logic for displaying player data and applying
 * the appropriate styling based on player index and bid correctness.
 *
 * Color Coding:
 * - Each player gets a unique color (0-9, cycling for more players)
 * - Bid and Tricks cells use subtle background tint
 * - Score cell shows if the bid was correct (bid === tricks)
 *
 * @param {number} playerIdx - The player's index (0-based) in the players array
 * @param {number} roundIdx - The round's index (0-based) in the rounds array
 * @param {Array} bids - 2D array containing all bids [playerIndex][roundIndex]
 * @param {Array} tricksWon - 2D array containing tricks won [playerIndex][roundIndex]
 * @param {Array} scores - 2D array containing calculated scores [playerIndex][roundIndex]
 * @returns {JSX.Element} Three <td> elements showing bid, tricks, and score
 */
function PlayerDataCells({ playerIdx, roundIdx, bids, tricksWon, scores }) {
  // Extract the specific values for this player in this round
  const bid = bids[playerIdx][roundIdx];
  const tricks = tricksWon[playerIdx][roundIdx];
  const score = scores[playerIdx][roundIdx];

  // Determine if player achieved their bid (correct prediction)
  const isCorrect = bid === tricks;

  // Calculate color class (cycles through 10 player colors)
  const playerColorClass = `player-${playerIdx % 10}`;

  /**
   * Format score for display
   * - Positive scores show with '+' prefix (e.g., +60)
   * - Zero and negative scores show as-is (e.g., 0, -20)
   */
  const formattedScore = score > 0 ? `+${score}` : score;

  return (
    <React.Fragment>
      {/* Bid Cell: Shows what the player predicted */}
      <td className={`bid-cell ${playerColorClass}`}>{bid}</td>

      {/* Tricks Cell: Shows how many tricks the player actually won */}
      <td className={`tricks-cell ${playerColorClass}`}>{tricks}</td>

      {/* Score Cell: Shows points earned/lost with conditional styling */}
      <td
        className={`score-cell ${playerColorClass} ${
          isCorrect ? "correct" : "incorrect"
        }`}
      >
        {formattedScore}
      </td>
    </React.Fragment>
  );
}

export default PlayerDataCells;
