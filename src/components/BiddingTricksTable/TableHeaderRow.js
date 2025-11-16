import React from "react";

/**
 * TableHeaderRow Component
 *
 * Renders the two-tier header rows for the bidding/tricks table.
 * First row: Player names spanning 3 columns each
 * Second row: Bid/Tricks/Score subheaders under each player
 *
 * This component separates the complex header structure from the main table
 * logic, improving maintainability and readability.
 *
 * @param {Array} playerNames - Array of player name strings
 * @returns {JSX.Element} Two <tr> elements forming the table header
 */
function TableHeaderRow({ playerNames }) {
  return (
    <>
      {/* First Header Row: Player Names */}
      <tr>
        {/* Round column header (spans both header rows) */}
        <th rowSpan="2">Round</th>

        {/* Create a header cell for each player, spanning 3 columns (Bid/Tricks/Score) */}
        {playerNames.map((name, idx) => {
          // Calculate player color class (0-9, cycling for 10+ players)
          const playerColorClass = `player-${idx % 10}`;

          return (
            <th
              key={idx}
              colSpan="3" // Spans across Bid, Tricks, and Score columns
              className={`player-header ${playerColorClass}`}
            >
              {name}
            </th>
          );
        })}
      </tr>

      {/* Second Header Row: Bid/Tricks/Score Labels */}
      <tr>
        {/* For each player, create three subheader cells */}
        {playerNames.map((_, idx) => {
          // Calculate player color class for consistent styling
          const playerColorClass = `player-${idx % 10}`;

          return (
            <React.Fragment key={idx}>
              {/* Bid subheader */}
              <th className={`sub-header ${playerColorClass}`}>Bid</th>

              {/* Tricks subheader */}
              <th className={`sub-header ${playerColorClass}`}>Tricks</th>

              {/* Score subheader */}
              <th className={`sub-header ${playerColorClass}`}>Score</th>
            </React.Fragment>
          );
        })}
      </tr>
    </>
  );
}

export default TableHeaderRow;
