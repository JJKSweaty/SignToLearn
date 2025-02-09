import React, { useState } from 'react';

const Flashcard = ({ hint }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-70 h-54 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full text-center flex items-center justify-center 
        rounded-lg shadow-lg transition-transform duration-500 transform 
        ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Show Hint (Front Side) or "Help" (Back Side) */}
        {!isFlipped ? (
          <div className="absolute w-full h-full flex items-center justify-center bg-white rounded-lg">
            <p className="text-lg font-semibold">{hint}</p>
          </div>
        ) : (
          <div className="absolute w-full h-full flex items-center justify-center bg-blue-500 text-white rounded-lg rotate-y-180">
            <p className="text-lg font-semibold">Click for Help!</p> {/* "Help" text on the back side */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
