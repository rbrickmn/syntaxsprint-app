import React from "react";
import "./AppContainer.css";

// Component imports
import SyntaxSprint from "../SyntaxSprint/SyntaxSprint";

const AppContainer = () => {
  return (
    <>
      <div className="window-container">
        <SyntaxSprint />
      </div>
    </>
  );
};

export default AppContainer;
