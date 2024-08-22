import React from "react";
import "./AppContainer.css";

// Component imports
import SyntaxSprint from "../SyntaxSprint/SyntaxSprint";
import Header from "../Header/Header";

const AppContainer = () => {
  return (
    <>
      <div className="window-container">
        <div className="game-wrapper">
          <Header />
          <SyntaxSprint />
        </div>
      </div>
    </>
  );
};

export default AppContainer;
