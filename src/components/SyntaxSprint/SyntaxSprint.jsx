import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "./SyntaxSprint.css";

const SyntaxSprint = () => {
  const codeBlocks = [
    `for (let i = 0; i < 10; i++) {\nconsole.log(i);\n};`,
    `const greet = (name) => {\nreturn \`Hello, \${name}!\`;\n};`,
    `let counter = 0;\nwhile (counter < 5) {\nconsole.log(counter);\ncounter++;\n};`,
    `const syntaxSprint = () => {\nconsole.log("Get typing!");\n};`,
    `if (condition) {\nconsole.log("Condition met!");\n} else {\nconsole.log("Condition not met.");\n};`,
  ];

  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [mistakes, setMistakes] = useState(0);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [gameStatus, setGameStatus] = useState("playing");
  const [completionTime, setCompletionTime] = useState(null);
  const [code, setCode] = useState(codeBlocks[0]); // Initially set to the first block

  const tryAgainButtonRef = useRef(null);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  useEffect(() => {
    if (startTime && timeLeft > 0 && gameStatus === "playing") {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }

    if (timeLeft === 0 && gameStatus === "playing") {
      setGameStatus("lose");
      setLosses((prevLosses) => prevLosses + 1);
    }
  }, [startTime, timeLeft, gameStatus]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      const char = e.key;

      if (gameStatus !== "playing") return;

      if (!startTime && char.length === 1) {
        setStartTime(Date.now());
      }

      if (char === "Enter") {
        if (code[currentIndex] === "\n") {
          setInput((prev) => prev + "\n");
          setCurrentIndex((prev) => prev + 1);
        } else {
          setMistakes((prevMistakes) => prevMistakes + 1);
        }
        return;
      }

      if (char.length === 1) {
        if (char === code[currentIndex]) {
          setInput((prevInput) => prevInput + char);
          setCurrentIndex((prevIndex) => prevIndex + 1);

          if (currentIndex + 1 === code.length) {
            setGameStatus("win");
            setWins((prevWins) => prevWins + 1);
            const timeTaken = (Date.now() - startTime) / 1000;
            setCompletionTime(timeTaken);
          }
        } else {
          setMistakes((prevMistakes) => prevMistakes + 1);
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [currentIndex, code, startTime, gameStatus]);

  useEffect(() => {
    if (startTime && currentIndex > 0 && gameStatus === "playing") {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const wordsTyped = currentIndex / 5;
      const calculatedWpm = Math.floor(wordsTyped / timeElapsed);

      if (calculatedWpm >= 0) {
        setWpm(calculatedWpm);
      } else {
        setWpm(0);
      }
    }
  }, [currentIndex, startTime, gameStatus]);

  const handleTryAgain = () => {
    setInput("");
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setTimeLeft(30);
    setMistakes(0);
    setCompletionTime(null);
    setGameStatus("playing");

    // Randomize the code block
    const randomCode =
      codeBlocks[Math.floor(Math.random() * codeBlocks.length)];
    setCode(randomCode);

    tryAgainButtonRef.current.blur();
  };

  return (
    <div className="container">
      <div className="text-block">
        {gameStatus === "playing" ||
        gameStatus === "win" ||
        gameStatus === "lose" ? (
          <>
            {gameStatus === "playing" &&
              code.split("").map((char, idx) => {
                let color = "grey"; // Default color for untyped characters
                let currentClass = ""; // Default for current character class

                if (idx < currentIndex) {
                  color = input[idx] === char ? "green" : "red"; // Green for correct, red for incorrect
                } else if (idx === currentIndex) {
                  color = "black"; // Current letter in black
                  currentClass = "current-char"; // Apply the underline for the current character
                }

                return (
                  <span key={idx} className={currentClass} style={{ color }}>
                    {char === "\n" ? <br /> : char}
                  </span>
                );
              })}
            {gameStatus === "win" && (
              <span>
                Good job! You won!
                <br />
                Time taken: {completionTime.toFixed(2)} seconds
              </span>
            )}
            {gameStatus === "lose" && <span>Time's up. Try again!</span>}
          </>
        ) : null}
      </div>

      <div className="stats-section">
        <div className="stat-box">
          <div>Time Left</div>
          <div className="stat-number">{timeLeft}s</div>
        </div>
        <div className="stat-box">
          <div>WPM</div>
          <div className="stat-number">{wpm}</div>
        </div>
        <div className="stat-box">
          <div>Mistakes</div>
          <div className="stat-number">{mistakes}</div>
        </div>
        <div className="stat-box">
          <div>Wins</div>
          <div className="stat-number">{wins}</div>
        </div>
        <div className="stat-box">
          <div>Losses</div>
          <div className="stat-number">{losses}</div>
        </div>
      </div>

      <button
        className="try-again-button"
        onClick={handleTryAgain}
        ref={tryAgainButtonRef}
      >
        {gameStatus === "win" ? "Play Again" : "Try Again"}
      </button>
    </div>
  );
};

export default SyntaxSprint;
