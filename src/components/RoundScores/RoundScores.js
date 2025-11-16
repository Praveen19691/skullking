import React from "react";
import ScoreDisplayTable from "../ScoreDisplayTable/ScoreDisplayTable";
import "./RoundScores.scss";

/**
 * Displays calculated scores for the current round
 * Shows each player's score and a button to proceed
 *
 * @param {Array} playerNames - Player names for table headers
 * @param {number} currentRound - Current round number
 * @param {Array} scores - 2D array of scores [playerIndex][roundIndex]
 * @param {number} totalRounds - Total number of rounds in the game
 * @param {function} onNextRound - Handler to advance to next round or show winner
 */
function RoundScores({
  playerNames,
  currentRound,
  scores,
  totalRounds,
  onNextRound,
}) {
  // Extract current round scores for display
  const currentScores = scores.map((arr) => arr[currentRound - 1]);

  return (
    <div className="card round-scores">
      <h3>Round {currentRound} - Scores</h3>
      <div className="table-wrapper">
        {/* Reusable score display table */}
        <ScoreDisplayTable playerNames={playerNames} values={currentScores} />
      </div>
      {/* Dynamic button text based on whether this is the last round */}
      <button type="button" className="next-round-btn" onClick={onNextRound}>
        {currentRound < totalRounds ? "Next Round" : "Show Winner"}
      </button>
    </div>
  );
}

export default RoundScores;
