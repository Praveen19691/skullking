import React from "react";
import MedalBadge from "../MedalBadge";
import "./FinalRankings.scss";

function FinalRankings({ playerNames, totalScores, denseRanks, winners }) {
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
            {sortedPlayers.map((player) => (
              <tr key={player.name}>
                <td>{player.rank}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
                <td>
                  <MedalBadge rank={player.rank} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="winner-highlight">
        <span className="trophy" role="img" aria-label="trophy">
          🏆
        </span>
        <span className="winner-text">
          Winner{winners.length > 1 ? "s" : ""}:{" "}
          <span className="winner-names">{winners.join(", ")}</span>
        </span>
      </div>
    </div>
  );
}

export default FinalRankings;
