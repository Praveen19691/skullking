import React from "react";
import PlayerInputTable from "../PlayerInputTable/PlayerInputTable";
import "./TricksForm.scss";

/**
 * Tricks won form component for the current round
 * Allows each player to enter tricks they won (0 to round number)
 * Validates that total tricks equals the round number
 * Submit button is disabled until all tricks are entered
 *
 * @param {Array} playerNames - Player names for table headers
 * @param {number} currentRound - Current round number
 * @param {Array} tricksWon - 2D array of tricks won [playerIndex][roundIndex]
 * @param {Array} tricksInputErrors - Boolean array indicating input errors per player
 * @param {string} tricksError - Error message if total tricks don't match round
 * @param {function} onTricksChange - Handler for tricks changes (playerIdx, value)
 * @param {function} onTricksFocus - Handler for input focus to clear field
 * @param {function} onSubmit - Form submission handler
 */
function TricksForm({
  playerNames,
  currentRound,
  tricksWon,
  tricksInputErrors,
  tricksError,
  onTricksChange,
  onTricksFocus,
  onSubmit,
}) {
  // Check if all tricks are filled in (not empty string)
  const allTricksFilled = tricksWon.every(
    (arr) => arr[currentRound - 1] !== ""
  );

  return (
    <div className="card tricks-form">
      <h3>Round {currentRound} - Tricks Won</h3>
      <div className="table-wrapper">
        <form onSubmit={onSubmit}>
          {/* Reusable input table for all player tricks */}
          <PlayerInputTable
            playerNames={playerNames}
            currentRound={currentRound}
            values={tricksWon}
            errors={tricksInputErrors}
            onChange={onTricksChange}
            onFocus={onTricksFocus}
            errorMessage="Enter a valid number"
            hintText="Tricks Won"
            maxValue={currentRound}
          />
          {/* Display error if total tricks don't equal round number */}
          {tricksError && <div className="error-message">{tricksError}</div>}
          <button
            type="submit"
            className="submit-btn"
            disabled={!allTricksFilled}
          >
            Calculate Scores
          </button>
        </form>
      </div>
    </div>
  );
}

export default TricksForm;
