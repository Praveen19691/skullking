import React from "react";
import "./MedalBadge.scss";

/**
 * Medal style configurations for top 3 ranks
 * Each rank has custom gradient background, text color, and emoji
 */
const MEDAL_STYLES = {
  1: {
    background: "linear-gradient(90deg, #FFD700 0%, #fdec4eff 100%)", // Gold
    color: "#B8860B",
    emoji: "🥇",
  },
  2: {
    background: "linear-gradient(90deg, #b8b8b8ff 0%, #F5F5F5 100%)", // Silver
    color: "#6e6e6e",
    emoji: "🥈",
  },
  3: {
    background: "linear-gradient(90deg, #634221ff 0%, #b1611cff 100%)", // Bronze
    color: "#97480fff",
    emoji: "🥉",
  },
};

/**
 * Medal badge component for displaying rank medals
 * Shows gold/silver/bronze for ranks 1-3, nothing for rank 4+
 *
 * @param {number} rank - Player's rank (1-based)
 * @returns {JSX.Element|null} Medal badge or null if rank > 3
 */
function MedalBadge({ rank }) {
  // Only show medals for top 3 ranks
  if (rank > 3) return null;

  const style = MEDAL_STYLES[rank];

  return (
    <span
      className="medal-badge"
      style={{
        background: style.background,
        color: style.color,
      }}
    >
      {style.emoji}
    </span>
  );
}

export default MedalBadge;
