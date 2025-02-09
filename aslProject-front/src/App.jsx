import React, { useRef } from 'react';
import Navbar from "./Navbar";
import About from "./About";
import Home from "./Home"
import Flashcard from './Flashcard';
import WordDisplay from './WordDisplay';
import LiveHandSignTracker from './LiveHandSignTracker';




function App() {
    const aboutRef = useRef(null);

    const onAboutClick = () => {
        aboutRef.current?.scrollIntoView({ behavior: 'smooth' });  
    };

    return (
        <div className='bg-gradient-to-b from-blue-900 to-blue-600 min-h-screen flex flex-col'>
          <Navbar onAboutClick={onAboutClick} />

           {/* <Home/>  */}

          
            <div ref={aboutRef}>
                {/* <About/> */}
            <LiveHandSignTracker/>

            </div>
            </div>
        
    );
}

export default App;
