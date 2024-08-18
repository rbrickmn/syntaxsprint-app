import React from "react";
import "./AppContainer.css";

// Component imports
import SyntaxSprint from "../SyntaxSprint/SyntaxSprint";

const AppContainer = () => {
  return (
    <>
      <div className="window-container">
        <div className="game-wrapper">
          <SyntaxSprint />
        </div>
      </div>
    </>
  );
};

export default AppContainer;
