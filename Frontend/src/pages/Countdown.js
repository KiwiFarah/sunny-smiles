
import React, { useState, useEffect } from 'react';
import './Countdown.css';  

function Countdown({ onCountdownEnd }) {
  const [count, setCount] = useState(4);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => setCount(count - 1), 1000);
    } else {
      
      if (!isFading) {
        setIsFading(true);
        setTimeout(onCountdownEnd, 500);  
      }
    }
  }, [count, onCountdownEnd, isFading]);

  const renderMessage = () => {
    switch(count) {
      case 4:
        return "Match the shapes";
      case 3:
      case 2:
      case 1:
        return count.toString();
      default:
        return "Start!";
    }
  };

  return (
    <div className={`countdown ${isFading ? 'fade-out' : ''}`}>
      {renderMessage()}
    </div>
  );
}


export default Countdown;
