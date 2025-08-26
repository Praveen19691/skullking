import React, { useState } from "react";
import { useLocation } from "react-router-dom";

// Scoring function
function calculateBaseScore(bid, tricksWon, round) {
  bid = Number(bid);
  tricksWon = Number(tricksWon);
  round = Number(round);

  if (bid === 0) {
    // Zero bid
    if (tricksWon === 0) {
      return round * 10;
    } else {
      return round * -10;
    }
  } else {
    // Non-zero bid
    if (bid === tricksWon) {
      return bid * 20;
    } else {
      return Math.abs(bid - tricksWon) * -10;
    }
  }
}

const TOTAL_ROUNDS = 10;

function GamePage() {
  const location = useLocation();
  const playerCount = location.state?.playerCount || 2;

  const [playerNames, setPlayerNames] = useState(Array(playerCount).fill(""));
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [currentRound, setCurrentRound] = useState(1);

  // Each round: bids[player][round], tricksWon[player][round], scores[player][round]
  const [bids, setBids] = useState(
    Array(playerCount)
      .fill(0)
      .map(() => Array(TOTAL_ROUNDS).fill("")) // Initialize bids for all players and rounds
  );
  const [tricksWon, setTricksWon] = useState(
    Array(playerCount)
      .fill(0)
      .map(() => Array(TOTAL_ROUNDS).fill("")) // Initialize tricksWon for all players and rounds
  );
  const [scores, setScores] = useState(
    Array(playerCount)
      .fill(0)
      .map(() => Array(TOTAL_ROUNDS).fill(0)) // Initialize scores for all players and rounds
  );
  const [biddingDone, setBiddingDone] = useState(false);
  const [scoreDone, setScoreDone] = useState(false);
  const [tricksError, setTricksError] = useState(""); // Add error state for tricks

  // For winner display
  const [gameFinished, setGameFinished] = useState(false);

  const handleNameChange = (index, value) => {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);
    setError(""); // Clear error on change
  };

  const handleSubmitNames = (e) => {
    e.preventDefault();
    const trimmedNames = playerNames.map((n) => n.trim());
    const nameSet = new Set(trimmedNames);
    if (nameSet.size !== trimmedNames.length) {
      setError("Player names must be unique.");
      return;
    }
    setSubmitted(true);
  };

  const handleBidChange = (playerIdx, value) => {
    const val =
      value === "" ? "" : Math.max(0, Math.min(currentRound, Number(value)));
    const updatedBids = bids.map((arr, idx) =>
      idx === playerIdx
        ? arr.map((v, rIdx) => (rIdx === currentRound - 1 ? val : v))
        : arr
    );
    setBids(updatedBids);
  };

  const handleBiddingSubmit = (e) => {
    e.preventDefault();
    setBiddingDone(true);
  };

  const handleTricksWonChange = (playerIdx, value) => {
    const val =
      value === "" ? "" : Math.max(0, Math.min(currentRound, Number(value)));
    const updatedTricks = tricksWon.map((arr, idx) =>
      idx === playerIdx
        ? arr.map((v, rIdx) => (rIdx === currentRound - 1 ? val : v))
        : arr
    );
    setTricksWon(updatedTricks);
  };

  const handleScoreSubmit = (e) => {
    e.preventDefault();
    // Validate total tricks for this round
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
    // Calculate scores for this round
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

  // Calculate total scores
  const totalScores = scores.map((arr) =>
    arr.reduce((sum, v) => sum + Number(v), 0)
  );

  // Find winner(s)
  const maxScore = Math.max(...totalScores);
  const winners = playerNames.filter((_, idx) => totalScores[idx] === maxScore);

  return (
    <div className="GamePage">
      <div className="header-title">Skull King Scoreboard</div>
      {submitted && !gameFinished && (
        <div className="round-indicator">
          Round {currentRound} of {TOTAL_ROUNDS}
        </div>
      )}
      {!submitted ? (
        <div className="card">
          <h2>Enter Player Names</h2>
          <form onSubmit={handleSubmitNames}>
            {playerNames.map((name, idx) => (
              <div key={idx} style={{ marginBottom: "1rem" }}>
                <label>
                  Player {idx + 1} Name:
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    required
                    style={{ marginLeft: "1rem" }}
                  />
                </label>
              </div>
            ))}
            {error && (
              <div
                style={{
                  color: "#e74c3c",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                }}
              >
                {error}
              </div>
            )}
            <button type="submit">Start Game</button>
          </form>
        </div>
      ) : gameFinished ? (
        <div className="card">
          <h3>Final Scores & Rankings</h3>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Player</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {playerNames
                  .map((name, idx) => ({
                    name,
                    score: totalScores[idx],
                  }))
                  .sort((a, b) => b.score - a.score)
                  .map((player, idx, arr) => {
                    // Handle ties: same score, same rank
                    const prevScore = idx > 0 ? arr[idx - 1].score : null;
                    const rank = prevScore === player.score ? idx : idx + 1;
                    return (
                      <tr key={player.name}>
                        <td>{rank}</td>
                        <td>{player.name}</td>
                        <td>{player.score}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="winner-highlight">
            Winner{winners.length > 1 ? "s" : ""}: {winners.join(", ")}
          </div>
        </div>
      ) : (
        <>
          {!biddingDone ? (
            <div className="card">
              <h3>Round {currentRound} Bidding</h3>
              <div className="table-wrapper">
                <form onSubmit={handleBiddingSubmit}>
                  <table>
                    <thead>
                      <tr>
                        {playerNames.map((name, idx) => (
                          <th key={idx}>{name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {playerNames.map((_, idx) => (
                          <td key={idx}>
                            <input
                              type="number"
                              min={0}
                              max={currentRound}
                              value={bids[idx][currentRound - 1]}
                              onChange={(e) =>
                                handleBidChange(idx, e.target.value)
                              }
                              required
                              style={{
                                width: "60px",
                                padding: "0.3rem",
                                borderRadius: "0.5rem",
                                border: "1px solid #f1c40f",
                                textAlign: "center",
                              }}
                            />
                            <div
                              style={{
                                fontSize: "0.9rem",
                                color: "#f1c40f",
                                marginTop: "0.3rem",
                              }}
                            >
                              Bidding (max {currentRound})
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  <button type="submit" style={{ marginTop: "1rem" }}>
                    Submit Bids
                  </button>
                </form>
              </div>
            </div>
          ) : !scoreDone ? (
            <div className="card">
              <h3>Round {currentRound} - Tricks Won</h3>
              <div className="table-wrapper">
                <form onSubmit={handleScoreSubmit}>
                  <table>
                    <thead>
                      <tr>
                        {playerNames.map((name, idx) => (
                          <th key={idx}>{name}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {playerNames.map((_, idx) => (
                          <td key={idx}>
                            <input
                              type="number"
                              min={0}
                              max={currentRound}
                              value={tricksWon[idx][currentRound - 1]}
                              onChange={(e) =>
                                handleTricksWonChange(idx, e.target.value)
                              }
                              required
                              style={{
                                width: "60px",
                                padding: "0.3rem",
                                borderRadius: "0.5rem",
                                border: "1px solid #f1c40f",
                                textAlign: "center",
                              }}
                            />
                            <div
                              style={{
                                fontSize: "0.9rem",
                                color: "#f1c40f",
                                marginTop: "0.3rem",
                              }}
                            >
                              Tricks Won
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                  {tricksError && (
                    <div className="error-message">{tricksError}</div>
                  )}
                  <button type="submit" style={{ marginTop: "1rem" }}>
                    Calculate Scores
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="card">
              <h3>Round {currentRound} - Scores</h3>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      {playerNames.map((name, idx) => (
                        <th key={idx}>{name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {playerNames.map((_, idx) => (
                        <td key={idx}>{scores[idx][currentRound - 1]}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                style={{ marginTop: "1rem" }}
                onClick={handleNextRound}
              >
                {currentRound < TOTAL_ROUNDS ? "Next Round" : "Show Winner"}
              </button>
            </div>
          )}
          {/* Score Table always visible below */}
          <div className="card">
            <h3 style={{ marginTop: "2rem" }}>Point Table</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Round</th>
                    {playerNames.map((name, idx) => (
                      <th key={idx}>{name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: currentRound }).map((_, roundIdx) => (
                    <tr key={roundIdx}>
                      <td>{roundIdx + 1}</td>
                      {playerNames.map((_, playerIdx) => (
                        <td key={playerIdx}>{scores[playerIdx][roundIdx]}</td>
                      ))}
                    </tr>
                  ))}
                  {/* Totals row */}
                  <tr>
                    <td>
                      <strong>Total</strong>
                    </td>
                    {totalScores.map((score, idx) => (
                      <td key={idx}>
                        <strong>{score}</strong>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default GamePage;
