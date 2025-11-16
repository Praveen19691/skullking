import React from "react";
import "./MedalBadge.scss";

const MEDAL_STYLES = {
  1: {
    background: "linear-gradient(90deg, #FFD700 0%, #fdec4eff 100%)",
    color: "#B8860B",
    emoji: "🥇",
  },
  2: {
    background: "linear-gradient(90deg, #b8b8b8ff 0%, #F5F5F5 100%)",
    color: "#6e6e6e",
    emoji: "🥈",
  },
  3: {
    background: "linear-gradient(90deg, #634221ff 0%, #b1611cff 100%)",
    color: "#97480fff",
    emoji: "🥉",
  },
};

function MedalBadge({ rank }) {
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
