import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import GameOne from "./pages/GameOne"
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/gameone" element={<GameOne/>} />
                </Routes>       
            </div>
        </Router>
    );
}

export default App;
