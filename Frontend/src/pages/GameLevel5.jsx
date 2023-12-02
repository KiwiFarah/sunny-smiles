import React, { useState, useEffect, useRef } from "react";
import "./Game.css";
import Shape from "./Shape";
import Modal from "./Modal";
import InfoStrip from "./InfoStrip";
import LevelGuide from "./LevelGuide";
import Countdown from "./Countdown";
import { addUserData, getPrediction } from '../utils/api'


const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 700;

function doesOverlap(newShape, existingShapes) {
  for (let shape of existingShapes) {
      
      if (newShape.type === "circle" && shape.type === "circle") {
          const dx = newShape.cx - shape.cx;
          const dy = newShape.cy - shape.cy;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < newShape.r + shape.r) {
              return true;
          }
      }
      
      else {
          const newShapeX2 = newShape.x + (newShape.type === "circle" ? newShape.r * 2 : newShape.width);
          const newShapeY2 = newShape.y + (newShape.type === "circle" ? newShape.r * 2 : newShape.height);
          const shapeX2 = shape.x + (shape.type === "circle" ? shape.r * 2 : shape.width);
          const shapeY2 = shape.y + (shape.type === "circle" ? shape.r * 2 : shape.height);

          if (newShape.x < shapeX2 && newShapeX2 > shape.x && newShape.y < shapeY2 && newShapeY2 > shape.y) {
              return true;
          }
      }
  }
  return false;
}

function randomizePosition(shapeWidth, shapeHeight, existingShapes) {
  let shape = {};
  const buffer = 10;
  let tries = 0;
  const maxTries = 100;

  do {
      shape.x = buffer + Math.random() * (CANVAS_WIDTH - shapeWidth - 2 * buffer);
      shape.y = buffer + Math.random() * (CANVAS_HEIGHT - shapeHeight - 2 * buffer);
      shape.width = shapeWidth;
      shape.height = shapeHeight;

      
      if (shape.type === "circle") {
          shape.cx = shape.x + shape.r;
          shape.cy = shape.y + shape.r;
      }

      tries++;
      if (tries > maxTries) {
          console.error("Unable to place shape without overlap after multiple tries.");
          return null; 
      }
  } while (doesOverlap(shape, existingShapes));

  return { x: shape.x, y: shape.y };
}


function GameLevel5({username}) {
  const [gameActive, setGameActive] = useState(true);
  const [correctMatches, setCorrectMatches] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [model, setModel] = useState(null);

  const [startTime, setStartTime] = useState(null);

  
  const hasCountdownStarted = useRef(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const handleCountdownEnd = () => {
    const now = Date.now();
    console.log("Countdown ended at:", now);
    setShowCountdown(false);
    setStartTime(now); 
    setGameActive(true);
};

  let initialShapes = [
    {
      id: 1,
      type: "circle",
      color: "#D49CDA",
      size: "small",
      r: 30,
    },
    {
      id: 2,
      type: "circle",
      color: "#D49CDA",
      size: "large",
      targetR: 60,
    },
    {
      id: 3,
      type: "rectangle",
      color: "#3d85c6",
      size: "small",
      width: 60,
      height: 30,
    },
    {
      id: 4,
      type: "rectangle",
      color: "#3d85c6",
      size: "large",
      targetWidth: 120,
      targetHeight: 60,
    },
    {
      id: 5,
      type: "triangle",
      color: "#FFA726",
      size: "small",
      x: 350,
      y: 350,
      width: 60,
      height: 60,
    },
    {
      id: 6,
      type: "triangle",
      color: "#FFA726",
      size: "large",
      targetX: 750,
      targetY: 450,
      targetWidth: 120,
      targetHeight: 120,
    },
    {
      id: 7,
      type: "pentagon",
      color: "#A8C9A5",
      size: "small",
      width: 60,
      height: 60,
    },
    {
      id: 8,
      type: "pentagon",
      color: "#A8C9A5",
      size: "large",
      targetWidth: 120,
      targetHeight: 120,
    },
    {
      id: 9,
      type: "hexagon",
      color: "#8f73e6",
      size: "small",
      width: 60,
      height: 52,
    },
    {
      id: 10,
      type: "hexagon",
      color: "#8f73e6",
      size: "large",
      targetWidth: 120,
      targetHeight: 104,
    },
    {
      id: 11,
      type: "octagon",
      color: "#E7AD99",
      size: "small",
      width: 60,
      height: 60,
    },
    {
      id: 12,
      type: "octagon",
      color: "#E7AD99",
      size: "large",
      targetWidth: 120,
      targetHeight: 120,
    },
    {
      id: 14,
      type: "nonagon",
      color: "#B1A1F7",
      size: "small",
      width: 60,
      height: 60,
    },
    {
      id: 15,
      type: "nonagon",
      color: "#B1A1F7",
      size: "large",
      targetWidth: 120,
      targetHeight: 120,
    },
  ];

  let placedShapes = [];
  let randomizedShapes = initialShapes.map((shape) => {
    const shapeWidth =
      shape.type === "circle" ? shape.r * 2 : shape.width || shape.targetWidth;
    const shapeHeight =
      shape.type === "circle"
        ? shape.r * 2
        : shape.height || shape.targetHeight;

    const randomPos = randomizePosition(shapeWidth, shapeHeight, placedShapes);

    placedShapes.push({
      x: randomPos.x,
      y: randomPos.y,
      width: shapeWidth,
      height: shapeHeight,
    });

    if (shape.type === "circle") {
      shape.cx = randomPos.x + shape.r;
      shape.cy = randomPos.y + shape.r;
    } else {
      shape.x = randomPos.x;
      shape.y = randomPos.y;
    }

    return shape;
  });

  const [shapes, setShapes] = useState(randomizedShapes);
  const [positions, setPositions] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [potentialDropTargets, setPotentialDropTargets] = useState([]);
  const saveLevelData = (username, level, actualTime, predictedTime, correctMatches, incorrectAttempts) => {
    
    const userData = JSON.parse(localStorage.getItem(username)) || {};
  
    
    userData[level] = { 
      actualTime, 
      predictedTime, 
      correctMatches, 
      incorrectAttempts 
    };
  
    
    localStorage.setItem(username, JSON.stringify(userData));
  };
  
  useEffect(() => {
    if (shapes.filter(shape => shape.size === "small").length === 0) {
      const timeTaken = (Date.now() - startTime) / 1000;
      setGameActive(false);
      setShowModal(true);
  
      const userData = {
        username,
        timeTaken,
        correctMatches,
        incorrectAttempts,
        level: 5
      };
  
      
      addUserData(userData)
        .then(response => {
          console.log("Data saved successfully:", response);
  
          
          getPrediction(userData.level + 1)
            .then(predictionResponse => {
              console.log("Prediction for next level:", predictionResponse);
              
              
              saveLevelData(username, 5, timeTaken / 7, predictionResponse, correctMatches, incorrectAttempts);
            })
            .catch(error => console.error("Error getting prediction:", error));
        })
        .catch(error => console.error("Error saving data:", error));
    }
  }, [shapes, startTime, correctMatches, incorrectAttempts, username]);
  
  
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleGenerateReport = () => {
    setShowModal(false);
  };

  const handleDragStart = (event, shapeId) => {
    event.dataTransfer.setData("shapeId", shapeId);
    const draggableShape = shapes.find((s) => s.id === shapeId);

    const validTargets = shapes
      .filter(
        (targetShape) =>
          draggableShape.type === targetShape.type &&
          draggableShape.size !== targetShape.size &&
          draggableShape.id !== targetShape.id
      )
      .map((t) => t.id);

    setPotentialDropTargets(validTargets);
  };

  const handleDragOver = (event, targetShapeId) => {
    event.preventDefault();
    if (potentialDropTargets.includes(targetShapeId)) {
      event.target.style.cursor = "copy";
    } else {
      event.target.style.cursor = "no-drop";
    }
  };

  const handleDrop = (event, targetShapeId) => {
    event.preventDefault();
    const shapeId = parseInt(event.dataTransfer.getData("shapeId"));
    const draggableShape = shapes.find((s) => s.id === shapeId);
    const targetShape = shapes.find((s) => s.id === targetShapeId);

    if (!draggableShape || !targetShape) return;

    if (
      draggableShape.type === targetShape.type &&
      draggableShape.size !== targetShape.size
    ) {
      setCorrectMatches(correctMatches + 1);
      const updatedShapes = shapes.filter(
        (s) => ![shapeId, targetShapeId].includes(s.id)
      );
      setShapes(updatedShapes);

      const { clientX, clientY } = event;
      const offsetX =
        draggableShape.type === "circle"
          ? draggableShape.size === "small"
            ? draggableShape.r
            : draggableShape.targetR
          : draggableShape.size === "small"
          ? draggableShape.width / 2
          : draggableShape.targetWidth / 2;
      const offsetY =
        draggableShape.type === "circle"
          ? draggableShape.size === "small"
            ? draggableShape.r
            : draggableShape.targetR
          : draggableShape.size === "small"
          ? draggableShape.height / 2
          : draggableShape.targetHeight / 2;

      setPositions((prev) => ({
        ...prev,
        [shapeId]: {
          x: clientX - offsetX,
          y: clientY - offsetY,
          dropped: true,
        },
      }));
    } else {
      setIncorrectAttempts(incorrectAttempts + 1);
      setPositions((prev) => ({
        ...prev,
        [shapeId]: { ...prev[shapeId], dropped: false },
      }));
    }
  };

  const handleDragEnd = (event, shapeId) => {
    setPotentialDropTargets([]); 

    const initialX = parseFloat(event.dataTransfer.getData("initialX"));
    const initialY = parseFloat(event.dataTransfer.getData("initialY"));

    const { clientX, clientY } = event;
    const shape = shapes.find((s) => s.id === shapeId);
    const offsetX =
      shape.type === "circle"
        ? shape.size === "small"
          ? shape.r
          : shape.targetR
        : shape.size === "small"
        ? shape.width / 2
        : shape.targetWidth / 2;
    const offsetY =
      shape.type === "circle"
        ? shape.size === "small"
          ? shape.r
          : shape.targetR
        : shape.size === "small"
        ? shape.height / 2
        : shape.targetHeight / 2;

    const validDrop = positions[shapeId] && positions[shapeId].dropped;

    setPositions((prev) => ({
      ...prev,
      [shapeId]: {
        x: validDrop ? clientX - offsetX : initialX,
        y: validDrop ? clientY - offsetY : initialY,
      },
    }));
  };

  const updatePosition = (shape, position) => {
    const x =
      position.x ||
      (shape.type === "circle"
        ? shape.size === "small"
          ? shape.cx - shape.r
          : shape.targetX
          ? shape.targetX - shape.targetR
          : shape.cx - shape.r
        : shape.size === "small"
        ? shape.x
        : shape.targetX || shape.x);
    const y =
      position.y ||
      (shape.type === "circle"
        ? shape.size === "small"
          ? shape.cy - shape.r
          : shape.targetY
          ? shape.targetY - shape.targetR
          : shape.cy - shape.r
        : shape.size === "small"
        ? shape.y
        : shape.targetY || shape.y);
    return { x, y };
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  const generateReport = () => {
    const timeTaken = (Date.now() - startTime) / 1000;
    const prediction = getPrediction(
      model,
      timeTaken,
      correctMatches,
      incorrectAttempts
    );
    return {
      timeTaken,
      correctMatches,
      incorrectAttempts,
      predictedImprovement: prediction,
    };
  };

  return (
    <div>
      {showCountdown && <Countdown onCountdownEnd={handleCountdownEnd} />}
      <div className="gameControls"></div>
      <div className="gameContainer">
        <div className="flexContainer">
          <div className="gameContent">
            <div className="gameCanvas" onDragOver={allowDrop}>
              {shapes.map((shape) => {
                const position = positions[shape.id] || {};
                const pos = updatePosition(shape, position);
                return (
                  <div
                    key={shape.id}
                    draggable={gameActive && shape.size === "small"}
                    onDragStart={(event) => handleDragStart(event, shape.id)}
                    onDragEnd={(event) => handleDragEnd(event, shape.id)}
                    onDrop={(event) => handleDrop(event, shape.id)}
                    onDragOver={handleDragOver}
                    style={{
                      position: "absolute",
                      top: pos.y,
                      left: pos.x,
                      width:
                        shape.type === "circle"
                          ? shape.size === "small"
                            ? shape.r * 2
                            : shape.targetR * 2
                          : shape.size === "small"
                          ? shape.width
                          : shape.targetWidth,
                      height:
                        shape.type === "circle"
                          ? shape.size === "small"
                            ? shape.r * 2
                            : shape.targetR * 2
                          : shape.size === "small"
                          ? shape.height
                          : shape.targetHeight,
                    }}
                  >
                    <Shape
                      type={shape.type}
                      color={shape.color}
                      dimensions={
                        shape.size === "small"
                          ? shape
                          : shape.type === "circle"
                          ? { r: shape.targetR }
                          : {
                              width: shape.targetWidth,
                              height: shape.targetHeight,
                            }
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="scoreboard">
              Shapes Left:{" "}
              {shapes.filter((shape) => shape.size === "small").length}
            </div>
          </div>
        </div>

        {showModal && <div className="backdrop"></div>}
        {showModal && (
          <Modal currentLevel={5} show={showModal}>
            <h2>Congratulations!</h2>
            <p>You did fantastic! Ready for the next level?</p>
            <button onClick={handleGenerateReport}>
              Generate Analysis Report
            </button>
          </Modal>
        )}
        <LevelGuide
          key={showModal ? "faded" : "visible"}
          level={5}
          className={showModal ? "faded" : ""}
        />
        <InfoStrip
          startTime={startTime}
          correctMatches={correctMatches}
          incorrectAttempts={incorrectAttempts}
        />
      </div>
    </div>
  );
}

export default GameLevel5;
