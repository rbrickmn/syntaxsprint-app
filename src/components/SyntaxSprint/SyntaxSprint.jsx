import { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "./SyntaxSprint.css";  // External CSS

const SyntaxSprint = () => {
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [mistakes, setMistakes] = useState(0);

  const code = `What we don't know for sure is whether or not a pig of the coast is assumed to be a hardback pilot.`;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  useEffect(() => {
    if (startTime && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, timeLeft]);

  useEffect(() => {
    // Handle key press events globally
    const handleKeyPress = (e) => {
      const char = e.key;
      
      // Ignore special keys (e.g., Backspace, Tab, Shift, etc.)
      if (char.length === 1) {
        // Start the timer on first input
        if (currentIndex === 0 && !startTime) {
          setStartTime(Date.now());
        }

        // If the next character matches the current one in the code
        if (char === code[currentIndex]) {
          setInput((prevInput) => prevInput + char);
          setCurrentIndex(currentIndex + 1);
        } else {
          setMistakes(mistakes + 1); // Increment mistakes count
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [currentIndex, code, startTime, mistakes]);

  const handleTryAgain = () => {
    setInput("");
    setCurrentIndex(0);
    setStartTime(null);
    setWpm(0);
    setTimeLeft(60);
    setMistakes(0);
  };

  return (
    <div className="container">
      {/* Display code block */}
      <div className="text-block">
        {code.split("").map((char, idx) => (
          <span
            key={idx}
            style={{
              color: idx < currentIndex ? "green" : idx === currentIndex ? "black" : "grey",
              textDecoration: idx < currentIndex && input[idx] !== char ? "underline" : "none",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      <div className="stats-section">
        <div className="stat-box">
          <div>Time Left</div>
          <div className="stat-number">{timeLeft}s</div>
        </div>
        <div className="stat-box">
          <div>Mistakes</div>
          <div className="stat-number">{mistakes}</div>
        </div>
        <div className="stat-box">
          <div>WPM</div>
          <div className="stat-number">{wpm}</div>
        </div>
        <div className="stat-box">
          <div>CPM</div>
          <div className="stat-number">{wpm * 5}</div>
        </div>
        <button className="try-again-button" onClick={handleTryAgain}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default SyntaxSprint;
