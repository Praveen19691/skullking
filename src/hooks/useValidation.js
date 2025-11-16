import { useState } from "react";

export function useValidation(playerCount) {
  const [error, setError] = useState("");
  const [invalidNames, setInvalidNames] = useState(
    Array(playerCount).fill(false)
  );
  const [bidInputErrors, setBidInputErrors] = useState(
    Array(playerCount).fill(false)
  );
  const [tricksInputErrors, setTricksInputErrors] = useState(
    Array(playerCount).fill(false)
  );
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
