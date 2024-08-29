import { useState, useEffect, useRef } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "./SyntaxSprint.css";
import SettingsPanel from "../SettingsPanel/SettingsPanel";

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
  const [timeLeft, setTimeLeft] = useState(
    localStorage.getItem("timeLimit") || 15
  );
  const [mistakes, setMistakes] = useState(0);
  const [wins, setWins] = useState(
    () => Number(localStorage.getItem("wins")) || 0
  );
  const [losses, setLosses] = useState(
    () => Number(localStorage.getItem("losses")) || 0
  );
  const [gameStatus, setGameStatus] = useState("playing");
  const [completionTime, setCompletionTime] = useState(null);
  const [code, setCode] = useState(codeBlocks[0]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(
    localStorage.getItem("selectedTimeLimit") || "15"
  );

  const tryAgainButtonRef = useRef(null);

  // Function to handle time limit selection
  const handleTimeLimitchange = (time) => {
    setSelectedTimeLimit(time);
    setTimeLeft(time);
    localStorage.setItem("selectedTimeLimit", time);
  };

  // Function to reset wins and losses
  const resetScores = () => {
    let text =
      "Are you sure you want to reset your scores?\nThis cannot be undone!";
    if (confirm(text)) {
      setWins(0);
      setLosses(0);
      localStorage.setItem("wins", 0);
      localStorage.setItem("losses", 0);
    }
  };

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

  // Persist wins and losses to localStorage when they change
  useEffect(() => {
    localStorage.setItem("wins", wins);
  }, [wins]);

  useEffect(() => {
    localStorage.setItem("losses", losses);
  }, [losses]);

  const handleTryAgain = () => {
    setInput("");
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setTimeLeft(localStorage.getItem("timeLimit") || 15);
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

      <div className="button-section">
        <button
          className="try-again-button"
          onClick={handleTryAgain}
          ref={tryAgainButtonRef}
          title="Restart game"
        >
          {gameStatus === "win" ? "Play Again" : "Try Again"}
        </button>
        <button
          className="settings-button"
          onClick={() => setSettingsOpen(true)}
          title="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="28px"
            viewBox="0 -960 960 960"
            width="28px"
            fill="#5f6368"
            className="settings-icon"
          >
            <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
          </svg>
        </button>
      </div>

      {settingsOpen && (
        <SettingsPanel
          onClose={() => setSettingsOpen(false)}
          onResetScores={resetScores} // Pass the resetScores function
          onTimeLimitChange={handleTimeLimitchange}
        />
      )}
    </div>
  );
};

export default SyntaxSprint;
