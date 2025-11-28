import { useState, useEffect } from "react";

/**
 * Custom hook to manage all game state for Skull King
 * Handles player names, bids, tricks won, scores, and game flow state
 * Persists state to localStorage to survive page refreshes
 *
 * @param {number} playerCount - Number of players in the game
 * @param {number} totalRounds - Total number of rounds in the game
 * @returns {object} Game state and setter functions
 */
export function useGameState(playerCount, totalRounds) {
  const STORAGE_KEY = "skullKingGameState";

  // Helper to load state from localStorage
  const loadState = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Verify the saved state matches current game config
        if (
          parsed.playerCount === playerCount &&
          parsed.totalRounds === totalRounds
        ) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading game state:", error);
    }
    return null;
  };

  const savedState = loadState();

  // Player names array
  const [playerNames, setPlayerNames] = useState(
    savedState?.playerNames || Array(playerCount).fill("")
  );

  // Flag to track if player names have been submitted
  const [submitted, setSubmitted] = useState(savedState?.submitted || false);

  // Current round number (1-indexed)
  const [currentRound, setCurrentRound] = useState(
    savedState?.currentRound || 1
  );

  // 2D array: bids[playerIndex][roundIndex] stores each player's bid for each round
  const [bids, setBids] = useState(
    savedState?.bids ||
      Array(playerCount)
        .fill()
        .map(() => Array(totalRounds).fill(0))
  );

  // 2D array: tricksWon[playerIndex][roundIndex] stores tricks won by each player per round
  const [tricksWon, setTricksWon] = useState(
    savedState?.tricksWon ||
      Array(playerCount)
        .fill()
        .map(() => Array(totalRounds).fill(0))
  );

  // 2D array: scores[playerIndex][roundIndex] stores calculated scores for each player per round
  const [scores, setScores] = useState(
    savedState?.scores ||
      Array(playerCount)
        .fill()
        .map(() => Array(totalRounds).fill(0))
  );

  // Round flow flags
  const [biddingDone, setBiddingDone] = useState(
    savedState?.biddingDone || false
  );
  const [scoreDone, setScoreDone] = useState(savedState?.scoreDone || false);
  const [gameFinished, setGameFinished] = useState(
    savedState?.gameFinished || false
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      playerCount,
      totalRounds,
      playerNames,
      submitted,
      currentRound,
      bids,
      tricksWon,
      scores,
      biddingDone,
      scoreDone,
      gameFinished,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error("Error saving game state:", error);
    }
  }, [
    playerCount,
    totalRounds,
    playerNames,
    submitted,
    currentRound,
    bids,
    tricksWon,
    scores,
    biddingDone,
    scoreDone,
    gameFinished,
  ]);

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
