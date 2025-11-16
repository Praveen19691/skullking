import BiddingForm from "../components/BiddingForm";
import TricksForm from "../components/TricksForm";
import RoundScores from "../components/RoundScores";
import PointTable from "../components/PointTable";
import BiddingTable from "../components/BiddingTable";
import TricksTable from "../components/TricksTable";

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
