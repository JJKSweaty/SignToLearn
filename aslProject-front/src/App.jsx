import React, { useRef } from "react";
import Navbar from "./Navbar";
import Home from "./Home";

function App() {
  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-600 min-h-screen flex flex-col">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
