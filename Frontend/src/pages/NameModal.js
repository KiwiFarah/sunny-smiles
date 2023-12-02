import React, { useState } from 'react';
import './NameModal.css';
import logo from '../assets/logo.png';  
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';


function NameModal({ onClose }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const handleStartGame = () => {
    if (name.trim()) {
        if (typeof onClose === 'function') {
            onClose(name);
        } else {
            console.error('onClose is not a function:', onClose);
        }
        navigate('/'); 
    } else {
        alert('Please enter your name.');
    }
};

NameModal.propTypes = {
    onClose: PropTypes.func.isRequired
};
NameModal.defaultProps = {
    onClose: () => {}
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={logo} alt="SunnySmiles Logo" className="logo" />
        <h1>Welcome to SunnySmiles!</h1>
        <p>What should we call you?</p>
        <div>
          <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
          />
          <button onClick={handleStartGame}>Start Game →</button>
        </div>
      </div>
    </div>
  );
}

export default NameModal;
