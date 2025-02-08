import { useState } from "react";
import signtoLearnPng from './assets/Signtolearn.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center">
            <img src={signtoLearnPng} alt="Sign to Learn Logo" className="h-10 w-auto mr-3" />
            <span className="text-white text-2xl font-bold">Sign to Learn</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-300 transition">Home</a>
            <a href="#" className="text-white hover:text-gray-300 transition">About</a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <a href="#" className="block text-white px-4 py-2">Home</a>
          <a href="#" className="block text-white px-4 py-2">Lessons</a>
          <a href="#" className="block text-white px-4 py-2">Practice</a>
          <a href="#" className="block text-white px-4 py-2">About</a>
          <a href="#" className="block text-blue-600 bg-white px-4 py-2 text-center rounded-lg mx-4 my-2">Sign In</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
