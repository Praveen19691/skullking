import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function PlayerForm() {
  const [playerCount, setPlayerCount] = useState(2);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/game", { state: { playerCount } });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Player Count (2-8):
        <input
          type="number"
          min={2}
          max={8}
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
          required
        />
      </label>
      <button type="submit">Start Game</button>
    </form>
  );
}

export default PlayerForm;
