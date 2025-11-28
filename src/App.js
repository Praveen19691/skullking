import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import PlayerForm from "./PlayerForm";
import GamePage from "./GamePage";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
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
  // Initialize theme from localStorage or default to dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : true;
  });

  // Apply theme class to body element
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="App">
      <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      <Container fluid className="App-header">
        <Routes>
          <Route path="/" element={<PlayerForm />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
