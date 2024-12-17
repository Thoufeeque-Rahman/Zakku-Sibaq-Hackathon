import React, { useState, useEffect } from 'react';
import './SplashScreen.css'; // Import the CSS file

const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000); // Change to desired duration

    return () => clearTimeout(timer);
  }, []); 

  return (
    <div style={{ height: '100vh', backgroundColor: '#309A84', justifyItems: 'center', alignContent: 'center', borderRadius: '0px' }} className="splash-screen pt-5 vw-xs-100 vh-100">
      <h1 className={`text-center text-white fw-bold ${isVisible ? 'slide-in' : 'slide-out'}`} style={{fontSize: "62px"}}>Zakku.</h1>
    </div>
  );
};

export default SplashScreen;