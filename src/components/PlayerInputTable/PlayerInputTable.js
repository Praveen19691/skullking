import React from "react";
import GameInput from "../GameInput/GameInput";
import "./PlayerInputTable.scss";

/**
 * Reusable table component for player input forms (bids/tricks)
 * Displays a single-row table with GameInput components for each player
 *
 * @param {Array} playerNames - Array of player names for column headers
 * @param {number} currentRound - Current round number
 * @param {Array} values - 2D array of current input values [playerIndex][roundIndex]
 * @param {Array} errors - Array of boolean error flags for each player
 * @param {function} onChange - Handler for input changes (playerIdx, value)
 * @param {function} onFocus - Handler for input focus (playerIdx)
 * @param {string} errorMessage - Error message to display for invalid inputs
 * @param {string} hintText - Hint text template (can include {round} placeholder)
 * @param {number} maxValue - Maximum allowed input value
 */
function PlayerInputTable({
  playerNames,
  currentRound,
  values,
  errors,
  onChange,
  onFocus,
  errorMessage,
  hintText,
  maxValue,
}) {
  // Replace {round} placeholder in hint text with current round number
  const getHintText = () => {
    return hintText.replace("{round}", currentRound);
  };

  return (
    <table className="player-input-table">
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
                value={values[idx][currentRound - 1]}
                onChange={(e) => onChange(idx, e.target.value)}
                onFocus={() => onFocus(idx)}
                hasError={errors[idx]}
                errorMessage={errorMessage}
                hintText={getHintText()}
                maxValue={maxValue}
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export default PlayerInputTable;
