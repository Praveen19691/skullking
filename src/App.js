import React from "react";
import { Routes, Route } from "react-router-dom";
import PlayerForm from "./PlayerForm";
import GamePage from "./GamePage";
import "./App.scss";

/**
 * 404 Not Found component for invalid routes
 */
function NotFound() {
  return (
    <div className="card">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

/**
 * Root App component with routing configuration
 * Routes:
 * - / : Player setup form
 * - /game : Main game page
 * - * : 404 page
 */
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
