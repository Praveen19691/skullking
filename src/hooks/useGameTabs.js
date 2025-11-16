import BiddingForm from "../components/BiddingForm/BiddingForm";
import TricksForm from "../components/TricksForm/TricksForm";
import RoundScores from "../components/RoundScores/RoundScores";
import PointTable from "../components/PointTable/PointTable";
import BiddingTricksTable from "../components/BiddingTricksTable/BiddingTricksTable";

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

  return [
    {
      id: "game",
      label: "Current Round",
      content: getCurrentRoundContent(),
    },
    {
      id: "history",
      label: "Bidding & Tricks History",
      content: (
        <BiddingTricksTable
          playerNames={playerNames}
          currentRound={currentRound}
          bids={bids}
          tricksWon={tricksWon}
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
}
