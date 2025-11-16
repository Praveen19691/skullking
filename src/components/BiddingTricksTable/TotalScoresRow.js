import React from "react";

/**
 * TotalScoresRow Component
 *
 * Renders the bottom row of the table showing cumulative total scores
 * for each player across all completed rounds.
 *
 * This row is visually distinct with:
 * - Thicker top border separating it from round data
 * - Larger font size for emphasis
 * - Each total spans 3 columns (Bid/Tricks/Score)
 * - Player-specific color coding
 *
 * @param {Array} playerNames - Array of player name strings
 * @param {Array} totalScores - Array of cumulative scores for each player
 * @returns {JSX.Element} A table row (<tr>) containing total scores
 */
function TotalScoresRow({ playerNames, totalScores }) {
  return (
    <tr className="total-row">
      {/* Label cell for the total row */}
      <td className="round-cell">
        <strong>Total</strong>
      </td>

      {/* Create a total cell for each player */}
      {playerNames.map((_, playerIdx) => {
        // Calculate player color class (0-9, cycling for 10+ players)
        const playerColorClass = `player-${playerIdx % 10}`;

        // Get this player's cumulative score
        const playerTotal = totalScores[playerIdx];

        return (
          <React.Fragment key={playerIdx}>
            {/* 
              Total score cell:
              - colSpan="3" makes it span all three columns (Bid/Tricks/Score)
              - Bold text emphasizes final totals
              - Player color class applies consistent styling
            */}
            <td className={`total-cell ${playerColorClass}`} colSpan="3">
              <strong>{playerTotal}</strong>
            </td>
          </React.Fragment>
        );
      })}
    </tr>
  );
}

export default TotalScoresRow;
