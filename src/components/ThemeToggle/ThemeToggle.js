import React from "react";
import "./ThemeToggle.scss";

/**
 * Theme toggle button component for switching between dark and light modes
 */
function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <button
      className="theme-toggle"
      onClick={onToggle}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      type="button"
    >
      <div className="toggle-icon">
        {isDarkMode ? (
          // Moon icon for dark mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        ) : (
          // Sun icon for light mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="24"
            height="24"
          >
            <path d="M12,17a5,5,0,1,1,5-5A5,5,0,0,1,12,17ZM12,9a3,3,0,1,0,3,3A3,3,0,0,0,12,9Z" />
            <path d="M12,6.17a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V5.17A1,1,0,0,0,12,6.17ZM3,11H5.17a1,1,0,1,0,0-2H3a1,1,0,0,0,0,2ZM21,11a1,1,0,0,0,0-2H18.83a1,1,0,1,0,0,2ZM12,17.83a1,1,0,0,0-1,1V21a1,1,0,0,0,2,0V18.83A1,1,0,0,0,12,17.83ZM6.76,7.76a1,1,0,0,0,.71-.29A1,1,0,0,0,7.47,6L6.05,4.64A1,1,0,0,0,4.64,6.05L6,7.47A1,1,0,0,0,6.76,7.76ZM7.47,18a1,1,0,1,0-1.42-1.42L4.64,17.95a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29ZM17.24,7.76a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l1.41-1.42a1,1,0,1,0-1.41-1.41L17.24,6.34A1,1,0,0,0,17.24,7.76Zm1.42,8.82a1,1,0,0,0-1.42,1.42l1.42,1.41a1,1,0,0,0,.71.29,1,1,0,0,0,.7-.29,1,1,0,0,0,0-1.41Z" />
          </svg>
        )}
      </div>
      <span className="toggle-label">{isDarkMode ? "Dark" : "Light"}</span>
    </button>
  );
}

export default ThemeToggle;
