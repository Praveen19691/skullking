import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayerForm from "./PlayerForm";
import GamePage from "./GamePage";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<PlayerForm />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
