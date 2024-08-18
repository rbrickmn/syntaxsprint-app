import React from "react";
import "./SettingsPanel.css";

const SettingsPanel = ({ onClose, onResetScores }) => {
  return (
    <div className="settings-overlay">
      <div className="settings-container">
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="close-button" onClick={onClose} title="Close">
            &times;
          </button>
        </div>
        <div className="settings-content">
          <h3>Game</h3>
          <button
            className="reset-scores-button"
            onClick={onResetScores} // Call resetScores function on click
            title="Reset scores"
          >
            Reset scores
          </button>

          <h3>Personalization</h3>

          <p className="coming-soon">More coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
