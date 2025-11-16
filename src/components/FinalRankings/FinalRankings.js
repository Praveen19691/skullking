import React from "react";
import MedalBadge from "../MedalBadge/MedalBadge";
import "./FinalRankings.scss";

/**
 * Final rankings display shown at game end
 * Shows all players sorted by score with medals for top 3
 * Highlights the winner(s) with trophy emoji
 *
 * @param {Array} playerNames - Array of all player names
 * @param {Array} totalScores - Array of final cumulative scores per player
 * @param {Array} denseRanks - Array of dense ranks (tied players get same rank)
 * @param {Array} winners - Array of winner name(s) (can be multiple if tied)
 */
function FinalRankings({ playerNames, totalScores, denseRanks, winners }) {
  // Combine player data and sort by score (highest first)
  const sortedPlayers = playerNames
    .map((name, idx) => ({
      name,
      score: totalScores[idx],
      rank: denseRanks[idx],
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="card final-rankings">
      <h3>Final Rankings</h3>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Score</th>
              <th>Medal</th>
            </tr>
          </thead>
          <tbody>
            {/* Display each player's final standing */}
            {sortedPlayers.map((player) => {
              // Check if this player is a winner
              const isWinner = winners.includes(player.name);

              return (
                <tr key={player.name} className={isWinner ? "winner-row" : ""}>
                  <td>{player.rank}</td>
                  <td>
                    {player.name}
                    {/* Add crown emoji next to winner name */}
                    {isWinner && (
                      <span className="crown" role="img" aria-label="crown">
                        👑
                      </span>
                    )}
                  </td>
                  <td>{player.score}</td>
                  <td>
                    {/* Show medal for top 3 ranks */}
                    <MedalBadge rank={player.rank} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Winner announcement with trophy and special effects */}
      <div className="winner-highlight">
        <span className="confetti left" role="img" aria-label="confetti">
          🎉
        </span>
        <span className="trophy bounce" role="img" aria-label="trophy">
          🏆
        </span>
        <span className="winner-text">
          {/* Handle singular vs plural winner text */}
          <span className="label">Winner{winners.length > 1 ? "s" : ""}:</span>
          <span className="winner-names">{winners.join(", ")}</span>
        </span>
        <span className="trophy bounce" role="img" aria-label="trophy">
          🏆
        </span>
        <span className="confetti right" role="img" aria-label="confetti">
          🎉
        </span>
      </div>
    </div>
  );
}

export default FinalRankings;
