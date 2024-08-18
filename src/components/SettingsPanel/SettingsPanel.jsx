import React from "react";
import "./SettingsPanel.css";

const SettingsPanel = ({ onClose, onResetScores }) => {
  return (
    <div className="settings-overlay">
      <div className="settings-container">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="settings-content">
          <h3>Game</h3>
          <button
            className="reset-scores-button"
            onClick={onResetScores} // Call resetScores function on click
          >
            Reset scores
          </button>
          <p>More coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
