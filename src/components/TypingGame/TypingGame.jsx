import React, { useState, useEffect } from "react";
import "./TypingGame.css";
import TypingArea from "../TypingArea/TypingArea";

const TypingGame = () => {
  const paragraphs = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan",
    "nisi vitae augue bibendum, sit amet bibendum purus tincidunt. Sed",
    "aliquam, purus sit amet tristique tincidunt, mauris ligula",
    "ullamcorper urna, nec ultricies augue velit at nisl. Sed",
    "accumsan nisi vitae augue bibendum, sit amet bibendum purus",
    "tincidunt. Sed aliquam, purus sit amet tristique tincidunt,",
  ];

  const [typingText, setTypingText] = useState("");
  const [inputFieldValue, setInputFieldValue] = useState("");
  const maxTime = 60;
  const [timeLeft, setTimeLeft] = useState(maxTime);
  const [charIndex, setCharIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [WPM, setWPM] = useState(0);
  const [CPM, setCPM] = useState(0);
};

export default TypingGame;
