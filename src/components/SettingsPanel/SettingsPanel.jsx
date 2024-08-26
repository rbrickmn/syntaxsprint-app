import React from "react";
import "./SettingsPanel.css";

const SettingsPanel = ({ onClose, onResetScores, onTimeLimitChange }) => {
  // Function to handle timer change
  const handleTimeChange = (e) => {
    const selectedTime = parseInt(e.target.value);
    onTimeLimitChange(selectedTime);
  };

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
          <p className="settings-label">Programming Language:</p>

          <select name="language" id="language" className="choices">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="php">PHP</option>
          </select>

          <p className="settings-label">Time limit:</p>

          <select
            name="time-limit"
            id="time-limit"
            className="choices"
            onChange={handleTimeChange} // Call handleTimeChange function on selection
          >
            <option value="15">15 seconds</option>
            <option value="30">30 seconds</option>
            <option value="60">60 seconds</option>
          </select>

          <button
            className="reset-scores-button"
            onClick={onResetScores} // Call resetScores function on click
            title="Reset scores"
          >
            Reset scores
          </button>

          <h3>Personalization</h3>

          <p className="settings-label">Color theme (Doesn't work yet):</p>
          <select name="theme" id="theme" className="choices">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>

          <p className="coming-soon">More coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
