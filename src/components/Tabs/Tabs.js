import React from "react";
import "./Tabs.scss";

/**
 * Reusable tabs component for organizing content
 * Displays tab headers and conditionally renders active tab content
 *
 * @param {Array} tabs - Array of tab objects with {id, label, content}
 * @param {string} activeTab - ID of currently active tab
 * @param {function} onTabChange - Handler for tab changes (tabId)
 */
function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <div className="tabs-container">
      {/* Tab headers/buttons */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab content panels */}
      <div className="tabs-content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-panel ${activeTab === tab.id ? "active" : ""}`}
          >
            {/* Only render content for active tab for performance */}
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
