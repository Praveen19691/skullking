import React from "react";
import PlayerInputTable from "../PlayerInputTable/PlayerInputTable";
import "./BiddingForm.scss";

/**
 * Bidding form component for the current round
 * Allows each player to enter their bid (0 to round number)
 * Submit button is disabled until all bids are entered
 *
 * @param {Array} playerNames - Player names for table headers
 * @param {number} currentRound - Current round number (determines max bid)
 * @param {Array} bids - 2D array of all bids [playerIndex][roundIndex]
 * @param {Array} bidInputErrors - Boolean array indicating input errors per player
 * @param {function} onBidChange - Handler for bid changes (playerIdx, value)
 * @param {function} onBidFocus - Handler for input focus to clear field
 * @param {function} onSubmit - Form submission handler
 */
function BiddingForm({
  playerNames,
  currentRound,
  bids,
  bidInputErrors,
  onBidChange,
  onBidFocus,
  onSubmit,
}) {
  // Check if all bids are filled in (not empty string)
  const allBidsFilled = bids.every((arr) => arr[currentRound - 1] !== "");

  return (
    <div className="card bidding-form">
      <h3>Round {currentRound} Bidding</h3>
      <div className="table-wrapper">
        <form onSubmit={onSubmit}>
          {/* Reusable input table for all player bids */}
          <PlayerInputTable
            playerNames={playerNames}
            currentRound={currentRound}
            values={bids}
            errors={bidInputErrors}
            onChange={onBidChange}
            onFocus={onBidFocus}
            errorMessage="Enter a valid number"
            hintText="Bidding (max {round})"
            maxValue={currentRound}
          />
          <button
            type="submit"
            className="submit-btn"
            disabled={!allBidsFilled}
          >
            Submit Bids
          </button>
        </form>
      </div>
    </div>
  );
}

export default BiddingForm;
