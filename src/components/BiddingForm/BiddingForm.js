import React from "react";
import GameInput from "../GameInput";
import "./BiddingForm.scss";

function BiddingForm({
  playerNames,
  currentRound,
  bids,
  bidInputErrors,
  onBidChange,
  onSubmit,
}) {
  return (
    <div className="card bidding-form">
      <h3>Round {currentRound} Bidding</h3>
      <div className="table-wrapper">
        <form onSubmit={onSubmit}>
          <table>
            <thead>
              <tr>
                {playerNames.map((name, idx) => (
                  <th key={idx}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {playerNames.map((_, idx) => (
                  <td key={idx}>
                    <GameInput
                      value={bids[idx][currentRound - 1]}
                      onChange={(e) => onBidChange(idx, e.target.value)}
                      hasError={bidInputErrors[idx]}
                      errorMessage="Enter a valid number"
                      hintText={`Bidding (max ${currentRound})`}
                      maxValue={currentRound}
                    />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
          <button type="submit" className="submit-btn">
            Submit Bids
          </button>
        </form>
      </div>
    </div>
  );
}

export default BiddingForm;
