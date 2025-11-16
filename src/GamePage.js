import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useGameState } from "./hooks/useGameState";
import { useValidation } from "./hooks/useValidation";
import { useGameTabs } from "./hooks/useGameTabs";
import {
  calculateBaseScore,
  getDenseRanks,
  isValidNumber,
} from "./utils/scoring";
import PlayerNameForm from "./components/PlayerNameForm";
import FinalRankings from "./components/FinalRankings";
import FinalPointTable from "./components/FinalPointTable";
import Tabs from "./components/Tabs";

/**
 * Main game page component that orchestrates the entire Skull King game
 * Manages game flow: player names -> bidding -> tricks -> scoring -> next round
 */
function GamePage() {
  // Get player count and round count from navigation state
  const location = useLocation();
  const playerCount = location.state?.playerCount || 2;
  const TOTAL_ROUNDS = Math.max(
    2,
    Math.min(10, location.state?.roundCount || 2)
  );

  // Initialize custom hooks for game state and validation
  const gameState = useGameState(playerCount, TOTAL_ROUNDS);
  const validation = useValidation(playerCount);

  // Destructure game state for easier access
  const {
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
  } = gameState;

  // Destructure validation state
  const {
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
  } = validation;

  // Track which tab is currently active
  const [activeTab, setActiveTab] = useState("game");

  /**
   * Handle player name input change with validation
   * Validates name length (minimum 3 characters)
   */
  const handleNameChange = (index, value) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);

    const updatedInvalids = [...invalidNames];
    updatedInvalids[index] = value.trim().length < 3;
    setInvalidNames(updatedInvalids);

    setError("");
  };

  /**
   * Submit player names after validation
   * Checks for unique names and minimum length requirements
   */
  const handleSubmitNames = (e) => {
    e.preventDefault();
    const trimmedNames = playerNames.map((n) => n.trim());
    const nameSet = new Set(trimmedNames);
    if (nameSet.size !== trimmedNames.length) {
      setError("Player names must be unique.");
      return;
    }
    if (trimmedNames.some((n) => n.length < 3)) {
      setError("Each player name must be at least 3 characters.");
      return;
    }
    setSubmitted(true);
  };

  /**
   * Handle bid input change for a player
   * Validates numeric input and constrains value between 0 and current round number
   */
  const handleBidChange = (playerIdx, value) => {
    let val = value;
    let error = !isValidNumber(val);

    if (!error && val !== "") {
      val = Math.max(0, Math.min(currentRound, Number(val)));
    }

    const updatedBids = bids.map((arr, idx) =>
      idx === playerIdx
        ? arr.map((v, rIdx) => (rIdx === currentRound - 1 ? val : v))
        : arr
    );
    setBids(updatedBids);

    const updatedErrors = [...bidInputErrors];
    updatedErrors[playerIdx] = error;
    setBidInputErrors(updatedErrors);
  };

  /**
   * Submit all bids for the current round
   * Transitions to tricks input phase
   */
  const handleBiddingSubmit = (e) => {
    e.preventDefault();
    if (bidInputErrors.some(Boolean)) return;
    setBiddingDone(true);
  };

  /**
   * Handle tricks won input change for a player
   * Validates numeric input and constrains value between 0 and current round number
   */
  const handleTricksWonChange = (playerIdx, value) => {
    let val = value;
    let error = !isValidNumber(val);

    if (!error && val !== "") {
      val = Math.max(0, Math.min(currentRound, Number(val)));
    }

    const updatedTricks = tricksWon.map((arr, idx) =>
      idx === playerIdx
        ? arr.map((v, rIdx) => (rIdx === currentRound - 1 ? val : v))
        : arr
    );
    setTricksWon(updatedTricks);

    const updatedErrors = [...tricksInputErrors];
    updatedErrors[playerIdx] = error;
    setTricksInputErrors(updatedErrors);
  };

  /**
   * Calculate and submit scores for the current round
   * Validates that total tricks won equals the round number
   * Uses calculateBaseScore utility to compute points
   */
  const handleScoreSubmit = (e) => {
    e.preventDefault();
    if (tricksInputErrors.some(Boolean)) return;
    const totalTricks = tricksWon.reduce(
      (sum, arr) => sum + Number(arr[currentRound - 1]),
      0
    );
    if (totalTricks !== currentRound) {
      setTricksError(
        `Total tricks won must be exactly ${currentRound} in round ${currentRound}.`
      );
      return;
    }
    setTricksError("");
    const updatedScores = scores.map((arr, idx) =>
      arr.map((v, rIdx) =>
        rIdx === currentRound - 1
          ? calculateBaseScore(
              bids[idx][currentRound - 1],
              tricksWon[idx][currentRound - 1],
              currentRound
            )
          : v
      )
    );
    setScores(updatedScores);
    setScoreDone(true);
  };

  /**
   * Advance to the next round or finish the game
   * Resets round-specific state for the new round
   */
  const handleNextRound = () => {
    if (currentRound < TOTAL_ROUNDS) {
      setCurrentRound(currentRound + 1);
      setBiddingDone(false);
      setScoreDone(false);
      setTricksError("");
    } else {
      setGameFinished(true);
    }
  };

  // Calculate cumulative scores for each player across all rounds
  const totalScores = scores.map((arr) =>
    arr.reduce((sum, v) => sum + Number(v), 0)
  );

  // Determine winners and rankings
  const maxScore = Math.max(...totalScores);
  const winners = playerNames.filter((_, idx) => totalScores[idx] === maxScore);
  const denseRanks = getDenseRanks(totalScores); // Calculate dense ranking (tied players get same rank) // Calculate dense ranking (tied players get same rank)

  // Generate tab configuration using custom hook
  const tabs = useGameTabs({
    playerNames,
    currentRound,
    totalRounds: TOTAL_ROUNDS,
    bids,
    tricksWon,
    scores,
    totalScores,
    bidInputErrors,
    tricksInputErrors,
    tricksError,
    biddingDone,
    scoreDone,
    onBidChange: handleBidChange,
    onBiddingSubmit: handleBiddingSubmit,
    onTricksChange: handleTricksWonChange,
    onScoreSubmit: handleScoreSubmit,
    onNextRound: handleNextRound,
  });

  return (
    <div className="GamePage">
      <div className="header-title">Skull King Scoreboard</div>
      {submitted && !gameFinished && (
        <div className="round-indicator">
          Round {currentRound} of {TOTAL_ROUNDS}
        </div>
      )}
      {!submitted ? (
        <PlayerNameForm
          playerNames={playerNames}
          invalidNames={invalidNames}
          error={error}
          onNameChange={handleNameChange}
          onSubmit={handleSubmitNames}
        />
      ) : gameFinished ? (
        <>
          <FinalRankings
            playerNames={playerNames}
            totalScores={totalScores}
            denseRanks={denseRanks}
            winners={winners}
          />
          <FinalPointTable
            playerNames={playerNames}
            scores={scores}
            totalScores={totalScores}
            totalRounds={TOTAL_ROUNDS}
          />
        </>
      ) : (
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

export default GamePage;
