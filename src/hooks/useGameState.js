import { useState } from "react";

export function useGameState(playerCount, totalRounds) {
  const [playerNames, setPlayerNames] = useState(Array(playerCount).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [currentRound, setCurrentRound] = useState(1);
  const [bids, setBids] = useState(
    Array(playerCount)
      .fill()
      .map(() => Array(totalRounds).fill(0))
  );
  const [tricksWon, setTricksWon] = useState(
    Array(playerCount)
      .fill()
      .map(() => Array(totalRounds).fill(0))
  );
  const [scores, setScores] = useState(
    Array(playerCount)
      .fill()
      .map(() => Array(totalRounds).fill(0))
  );
  const [biddingDone, setBiddingDone] = useState(false);
  const [scoreDone, setScoreDone] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

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
