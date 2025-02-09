import React, { useState, useEffect } from "react";
import Flashcard from "./Flashcard";
import signtoLearnPng from "./assets/Signtolearn.png";
import LiveHandSignTracker from "./LiveHandSignTracker";
import { io } from "socket.io-client";


import A_SIGN from "./assets/A_SIGN.png";
import B_SIGN from "./assets/B_SIGN.png";
import C_SIGN from "./assets/C_SIGN.png";
import D_SIGN from "./assets/D_SIGN.png";


const words = ["ABA", "BAD", "CAB", "DAD"];



const aslImages = {
  A: A_SIGN,
  B: B_SIGN,
  C: C_SIGN,
  D: D_SIGN
};

//WO
const getRandomWord = () => words[Math.floor(Math.random() * words.length)];


//Words To Spell
const Home = () => {
  const [currentWord, setCurrentWord] = useState(getRandomWord());
  const [progress, setProgress] = useState(new Array(currentWord.length).fill(false));
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [predictedLetter, setPredictedLetter] = useState("");


  const [socket] = useState(() => io("http://127.0.0.1:5000", { transports: ["websocket"] }));

  useEffect(() => {
    socket.on("video_stream", (data) => {
      if (data.letter) {
        const letter = data.letter.toUpperCase();
        console.log("🔍 Received Letter:", letter);
        setPredictedLetter(letter);
      }
    });

    return () => {
      socket.off("video_stream"); // Ensure event listener is removed
    };
  }, [socket]);

  useEffect(() => {
    if (!predictedLetter) return;

    console.log("🔄 Checking Letter:", predictedLetter);
    const letters = currentWord.split("");

    if (predictedLetter === letters[currentLetterIndex] && !progress[currentLetterIndex]) {
      setProgress((prevProgress) => {
        const newProgress = [...prevProgress];
        newProgress[currentLetterIndex] = true;
        console.log(`✅ Letter ${letters[currentLetterIndex]} Matched!`);

        setTimeout(() => {
          if (currentLetterIndex + 1 < letters.length) {
            setCurrentLetterIndex(currentLetterIndex + 1);
          } else {
            console.log("🎉 Word Completed! Switching to new word...");
            const nextWord = getRandomWord();
            setCurrentWord(nextWord);
            setProgress(new Array(nextWord.length).fill(false));
            setCurrentLetterIndex(0);
          }
        }, 500);

        return newProgress;
      });
    }
  }, [predictedLetter]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-700 p-8">
      <h1 className="text-5xl font-bold text-white drop-shadow-lg">Sign the Word!</h1>
      <img src={signtoLearnPng} alt="Sign to Learn Logo" className="h-32 w-auto mt-4 shadow-lg rounded-lg" />

      <h2 className="text-4xl font-semibold text-white">Current Word:</h2>
      <div className="text-6xl font-bold p-4 flex space-x-4 text-white bg-gray-800 rounded-lg transition duration-300">
        {currentWord.split("").map((letter, index) => (
          <span key={index} className={`transition duration-300 ${progress[index] ? "text-green-500" : "text-white"}`}>
            {letter}
          </span>
        ))}
      </div>

      <div className="flex flex-row items-center justify-center space-x-8 w-full max-w-4xl">
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Sign Detector</h2>
          <div className="w-full max-w-md h-[300px] bg-white rounded-lg shadow-xl overflow-hidden border-4 border-white p-1">
            <LiveHandSignTracker />
          </div>
        </div>

        {/* ✅ Flashcard now shows ASL image for only the current letter */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-white mb-2">Flashcard</h2>
          <Flashcard hint="Click for Help" imageSrc={aslImages[currentWord[currentLetterIndex]] || "textures/default_sign.png"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
