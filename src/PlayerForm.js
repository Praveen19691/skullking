import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Initial setup form for configuring game parameters
 * Allows users to set number of players (2-10) and rounds (2-10)
 * Navigates to game page with selected configuration
 */
function PlayerForm() {
  const [playerCount, setPlayerCount] = useState(2);
  const [roundCount, setRoundCount] = useState(10);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/game", { state: { playerCount, roundCount } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="page-heading">Skull King Setup</h1>
      <label>
        Player Count (2-10):
        <input
          type="number"
          min={2}
          max={10}
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Round Count (2-10):
        <input
          type="number"
          min={2}
          max={10}
          value={roundCount}
          onChange={(e) => setRoundCount(Number(e.target.value))}
          required
        />
      </label>
      <button type="submit">Start Game</button>
    </form>
  );
}

export default PlayerForm;
