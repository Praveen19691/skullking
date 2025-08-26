import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayerForm from "./PlayerForm";
import GamePage from "./GamePage";
import "./App.scss";

// Simple NotFound component
function NotFound() {
  return (
    <div className="card">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<PlayerForm />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
