import { useState } from "react";

/**
 * Custom hook to manage all game state for Skull King
 * Handles player names, bids, tricks won, scores, and game flow state
 *
 * @param {number} playerCount - Number of players in the game
 * @param {number} totalRounds - Total number of rounds in the game
 * @returns {object} Game state and setter functions
 */
export function useGameState(playerCount, totalRounds) {
  // Player names array
  const [playerNames, setPlayerNames] = useState(Array(playerCount).fill(""));

  // Flag to track if player names have been submitted
  const [submitted, setSubmitted] = useState(false);

  // Current round number (1-indexed)
  const [currentRound, setCurrentRound] = useState(1);

  // 2D array: bids[playerIndex][roundIndex] stores each player's bid for each round
  const [bids, setBids] = useState(
    Array(playerCount)
      .fill()
      .map(() => Array(totalRounds).fill(0))
  );

  // 2D array: tricksWon[playerIndex][roundIndex] stores tricks won by each player per round
  const [tricksWon, setTricksWon] = useState(
    Array(playerCount)
      .fill()
      .map(() => Array(totalRounds).fill(0))
  );

  // 2D array: scores[playerIndex][roundIndex] stores calculated scores for each player per round
  const [scores, setScores] = useState(
    Array(playerCount)
      .fill()
      .map(() => Array(totalRounds).fill(0))
  );

  // Round flow flags
  const [biddingDone, setBiddingDone] = useState(false); // True after bids are submitted
  const [scoreDone, setScoreDone] = useState(false); // True after scores are calculated
  const [gameFinished, setGameFinished] = useState(false); // True when all rounds are complete

  return {
    playerNames,
    setPlayerNames,
    submitted,
    setSubmitted,
    currentRound,
    setCurrentRound,
    bids,
    setBids,
    tricksWon,
    setTricksWon,
    scores,
    setScores,
    biddingDone,
    setBiddingDone,
    scoreDone,
    setScoreDone,
    gameFinished,
    setGameFinished,
  };
}
