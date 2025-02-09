import React, { useState, useEffect } from "react";
import WordDisplay from "./WordDisplay";
import Flashcard from "./Flashcard";
import signtoLearnPng from "./assets/Signtolearn.png";
import Webcam from "react-webcam";
import CameraFeed from "./LiveHandSignTracker";
import LiveHandSignTracker from "./LiveHandSignTracker";

const words = [
  "apple", "bat", "car", "dog", "echo", "frog", "gift", "help", "iron", "jump",
  "kick", "lime", "mug", "nut", "open", "park", "quit", "rest", "song", "trip"
];

const hints = words.map((word) => `Sign the word '${word}' correctly.`);

const getRandomIndex = (length) => Math.floor(Math.random() * length);

const Home = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(getRandomIndex(words.length));
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setIsCorrect(false);
  }, [currentWordIndex]);

  const handleWordClick = () => {
    setIsCorrect(!isCorrect);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 p-8">
      <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg animate__animated animate__fadeIn">
        Sign the Word Out!
      </h1>

      <img
        src={signtoLearnPng}
        alt="Sign to Learn Logo"
        className="h-48 w-auto mb-6 shadow-lg rounded-xl animate__animated animate__bounceIn animate__delay-1s"
      />

      <div
        className={`text-6xl font-bold cursor-pointer ${
          isCorrect ? "text-green-500" : "text-white"
        } transition duration-300 mb-6 drop-shadow-lg hover:scale-110 animate__animated animate__fadeInUp`}
        onClick={handleWordClick}
      >
        {words[currentWordIndex]}
      </div>

      {/* Webcam Feed */}
      <div className="relative w-full max-w-sm lg:w-[400px] h-[300px] bg-gray-800 rounded-lg shadow-xl transform hover:scale-105 transition-all duration-500 mb-8 lg:mb-0">
        <LiveHandSignTracker/>
      </div>

      {/* Flashcards */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 w-full max-w-4xl mb-8">
        <div className="flex flex-col items-center w-full lg:w-[400px]">
          <Flashcard
            hint={hints[currentWordIndex]}
            answer={`This is the ASL sign for '${words[currentWordIndex]}'`}
          />
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => setCurrentWordIndex(getRandomIndex(words.length))}
          className="px-8 py-3 bg-blue-700 text-white text-lg rounded-xl font-semibold hover:bg-blue-800 hover:scale-105 transition duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Next Word
        </button>
      </div>
    </div>
  );
};

export default Home;
