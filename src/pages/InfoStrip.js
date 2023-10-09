import React, { useState, useEffect } from 'react';
import './InfoStrip.css';

function InfoStrip({ startTime, correctMatches, incorrectAttempts }) {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);
        
        return () => clearInterval(interval);
    }, [startTime]);

    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    return (
        <div className="infoStrip">
            <h3>Game Info</h3>
            <p><strong>Time elapsed:</strong> {minutes}m {seconds}s</p>
            <p><strong>Correct:</strong> {correctMatches}</p>
            <p><strong>Incorrect:</strong> {incorrectAttempts}</p>
        </div>
    );
}

export default InfoStrip;
