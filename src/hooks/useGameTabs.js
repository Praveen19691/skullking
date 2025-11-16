import BiddingForm from "../components/BiddingForm/BiddingForm";
import TricksForm from "../components/TricksForm/TricksForm";
import RoundScores from "../components/RoundScores/RoundScores";
import PointTable from "../components/PointTable/PointTable";
import BiddingTricksTable from "../components/BiddingTricksTable/BiddingTricksTable";
import FinalRankings from "../components/FinalRankings/FinalRankings";

/**
 * Custom hook to generate tab configuration for the game interface
 * Returns an array of tab objects with id, label, and content
 *
 * @param {object} props - Tab configuration props including game state and handlers
 * @returns {Array} Array of tab configuration objects
 */
export function useGameTabs({
  playerNames,
  currentRound,
  totalRounds,
  bids,
  tricksWon,
  scores,
  totalScores,
  bidInputErrors,
  tricksInputErrors,
  tricksError,
  biddingDone,
  scoreDone,
  gameFinished,
  winners,
  denseRanks,
  onBidChange,
  onBidFocus,
  onBiddingSubmit,
  onTricksChange,
  onTricksFocus,
  onScoreSubmit,
  onNextRound,
}) {
  /**
   * Determines which component to show in the Current Round tab
   * based on the current game flow state (bidding -> tricks -> scores)
   */
  const getCurrentRoundContent = () => {
    if (!biddingDone) {
      return (
        <BiddingForm
          playerNames={playerNames}
          currentRound={currentRound}
          bids={bids}
          bidInputErrors={bidInputErrors}
          onBidChange={onBidChange}
          onBidFocus={onBidFocus}
          onSubmit={onBiddingSubmit}
        />
      );
    }

    if (!scoreDone) {
      return (
        <TricksForm
          playerNames={playerNames}
          currentRound={currentRound}
          tricksWon={tricksWon}
          tricksInputErrors={tricksInputErrors}
          tricksError={tricksError}
          onTricksChange={onTricksChange}
          onTricksFocus={onTricksFocus}
          onSubmit={onScoreSubmit}
        />
      );
    }

    return (
      <RoundScores
        playerNames={playerNames}
        currentRound={currentRound}
        scores={scores}
        totalRounds={totalRounds}
        onNextRound={onNextRound}
      />
    );
  };

  const tabs = [
    {
      id: "game",
      label: "Current Round",
      content: getCurrentRoundContent(),
    },
    {
      id: "history",
      label: "Detailed View",
      content: (
        <BiddingTricksTable
          playerNames={playerNames}
          currentRound={currentRound}
          bids={bids}
          tricksWon={tricksWon}
          scores={scores}
          totalScores={totalScores}
        />
      ),
    },
    {
      id: "scores",
      label: "Score Table",
      content: (
        <PointTable
          playerNames={playerNames}
          currentRound={currentRound}
          scores={scores}
          totalScores={totalScores}
        />
      ),
    },
  ];

  // Add Final Results tab when game is finished
  if (gameFinished) {
    tabs.push({
      id: "results",
      label: "🏆 Final Results",
      content: (
        <FinalRankings
          playerNames={playerNames}
          totalScores={totalScores}
          denseRanks={denseRanks}
          winners={winners}
        />
      ),
    });
  }

  return tabs;
}
