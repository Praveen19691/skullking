import BiddingForm from "../components/BiddingForm";
import TricksForm from "../components/TricksForm";
import RoundScores from "../components/RoundScores";
import PointTable from "../components/PointTable";
import BiddingTable from "../components/BiddingTable";
import TricksTable from "../components/TricksTable";

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
  onBiddingSubmit,
  onTricksChange,
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
      id: "bidding",
      label: "Bidding History",
      content: (
        <BiddingTable
          playerNames={playerNames}
          currentRound={currentRound}
          bids={bids}
        />
      ),
    },
    {
      id: "tricks",
      label: "Tricks Won",
      content: (
        <TricksTable
          playerNames={playerNames}
          currentRound={currentRound}
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
