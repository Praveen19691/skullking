import { useState } from "react";

/**
 * Custom hook to manage validation state for forms and inputs
 * Tracks errors for player names, bids, and tricks won
 *
 * @param {number} playerCount - Number of players in the game
 * @returns {object} Validation state and setter functions
 */
export function useValidation(playerCount) {
  // General error message (e.g., for player name validation)
  const [error, setError] = useState("");

  // Array of boolean flags indicating if each player's name is invalid
  const [invalidNames, setInvalidNames] = useState(
    Array(playerCount).fill(false)
  );

  // Array of boolean flags indicating if each player's bid input has an error
  const [bidInputErrors, setBidInputErrors] = useState(
    Array(playerCount).fill(false)
  );

  // Array of boolean flags indicating if each player's tricks input has an error
  const [tricksInputErrors, setTricksInputErrors] = useState(
    Array(playerCount).fill(false)
  );

  // Error message for total tricks validation (must equal round number)
  const [tricksError, setTricksError] = useState("");

  return {
    error,
    setError,
    invalidNames,
    setInvalidNames,
    bidInputErrors,
    setBidInputErrors,
    tricksInputErrors,
    setTricksInputErrors,
    tricksError,
    setTricksError,
  };
}
