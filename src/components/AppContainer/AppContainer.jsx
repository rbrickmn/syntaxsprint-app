import React from "react";
import "./AppContainer.css";

// Component imports
import SyntaxSprint from "../SyntaxSprint/SyntaxSprint";
import Header from "../Header/Header";

const AppContainer = () => {
  return (
    <>
      <div className="window-container">
        <Header />
        <div className="game-wrapper">
          <SyntaxSprint />
        </div>
      </div>
    </>
  );
};

export default AppContainer;
