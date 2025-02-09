import React, { useState } from "react";

const Flashcard = ({ hint, imageSrc }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-64 h-64 cursor-pointer perspective"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full text-center flex items-center justify-center 
        rounded-lg shadow-lg transition-transform duration-500 transform 
        ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front Side - Click for Help */}
        {!isFlipped ? (
          <div className="absolute w-full h-full flex items-center justify-center bg-white text-black rounded-lg">
            <p className="text-lg font-semibold">Click for Help</p>
          </div>
        ) : (
          /* Back Side - Show ASL Image */
          <div className="absolute w-full h-full flex items-center justify-center bg-white rounded-lg rotate-y-180">
            <img src={imageSrc} alt="ASL Sign" className="h-48 mx-auto object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
