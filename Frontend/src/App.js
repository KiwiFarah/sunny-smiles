import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import GameLevel1 from "./pages/GameLevel1"
import GameLevel2 from "./pages/GameLevel2";
import GameLevel3 from "./pages/GameLevel3";
import GameLevel4 from "./pages/GameLevel4";
import GameLevel5 from "./pages/GameLevel5";
import GameLevel6 from "./pages/GameLevel6";
import GameLevel7 from "./pages/GameLevel7";
import NameModal from "./pages/NameModal";
import { useState, useEffect } from "react";

import './App.css';

function App() {
    const [username, setUsername] = useState(null);
    return (
        <Router>
            <div className="App">
                <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/level-one" element={<GameLevel1 username={username} onUsernameSet={setUsername} />} />
                {!username && <Route path="/" element={<NameModal onNameConfirmation={setUsername} />} />}
                <Route path="/level-two" element={<GameLevel2/>} />
                <Route path="/level-three" element={<GameLevel3/>} />
                <Route path="/level-four" element={<GameLevel4/>} />
                <Route path="/level-five" element={<GameLevel5/>} />
                <Route path="/level-six" element={<GameLevel6/>} />
                <Route path="/level-seven" element={<GameLevel7/>} />
              


                </Routes>       
            </div>
        </Router>
    );
}

export default App;