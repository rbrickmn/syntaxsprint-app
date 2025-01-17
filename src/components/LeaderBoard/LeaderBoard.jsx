import { useState, useEffect } from "react";
import "./leaderBoard.css";

const Leaderboard = ({ score, onRegister, onClose, updateMinLeaderboardScore }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [name, setName] = useState("");
  const [isTopScore, setIsTopScore] = useState(false);

  useEffect(() => {
    // Fetch leaderboard data from the server
    fetch("https://syntaxsprint-backend.vercel.app/getleaderboard")
      .then((response) => response.json())
      .then((data) => {
        setLeaderboard(data);
        // Check if the current score is in the top 10
        if (data.length < 10 || score > data[data.length - 1].score) {
          setIsTopScore(true);
        }
      });
  }, [score]);

  const handleRegister = async () => {
    try {
      // Fetch the current leaderboard data
      const response = await fetch("https://syntaxsprint-backend.vercel.app/getleaderboard");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
  
      // Add the new score to the list
      const updatedLeaderboard = [...data, { name, score }];
  
      // Sort the list in descending order by score
      // Sorting scores is done to determine the exact rank of the newly added score
      updatedLeaderboard.sort((a, b) => b.score - a.score);

      console.log("Updated leaderboard:", updatedLeaderboard);
  
      // Remove the last item if the list exceeds the desired length (e.g., top 10)
      if (updatedLeaderboard.length > 10) {
        updatedLeaderboard.pop();
      }
  
      // Prepare the request data for the POST request
      const requestData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedLeaderboard),
      };
  
      // Send the updated leaderboard to the server
      const postResponse = await fetch("https://syntaxsprint-backend.vercel.app/saveleaderboard", requestData);
      if (!postResponse.ok) {
        throw new Error(`HTTP error! status: ${postResponse.status}`);
      }
      
       // Update the minimum leaderboard score in the parent component
       const minScore = updatedLeaderboard.length < 10 ? 0 : updatedLeaderboard[updatedLeaderboard.length - 1].score;
       updateMinLeaderboardScore(minScore);

  
      // Call the onRegister callback
      onRegister();
    } catch (error) {
      // Log any errors
      console.error("Error:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="leaderboard-backdrop">
      <div className="leaderboard-modal">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Leaderboard</h2>
        <div className="leaderboard-divider"></div>
        <ul className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <li key={index} className="leaderboard-item">
              <span className="leaderboard-rank">{index + 1}</span>
              <span className="leaderboard-name">{entry.name}</span>
              <span className="leaderboard-score">{entry.score}</span>
            </li>
          ))}
        </ul>
        {isTopScore && (
          <div className="register-score">
            <h3>Congratulations! You made it to the top 10!</h3>
            <h2>{`Your score is ${score}`}</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;