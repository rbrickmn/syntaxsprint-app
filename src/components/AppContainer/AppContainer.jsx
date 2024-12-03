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
        <footer>
          <button className="made-by">
            Made by{" "}
            <a
              href="https://www.github.com/rbrickmn"
              target="_blank"
              className="footer-link"
            >
              Riley
            </a>
          </button>
        </footer>
      </div>
    </>
  );
};

export default AppContainer;
