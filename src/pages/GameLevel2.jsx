import React, { useState } from "react";
import "./Game.css";
import Shape from "./Shape";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 700;
const GRID_SIZE = 6;  // Adjust as needed for granularity.

function getRandomGridPosition(shapeWidth, shapeHeight) {
  const gridCellWidth = CANVAS_WIDTH / GRID_SIZE;
  const gridCellHeight = CANVAS_HEIGHT / GRID_SIZE;

  const randomX = Math.floor(Math.random() * GRID_SIZE);
  const randomY = Math.floor(Math.random() * GRID_SIZE);

  const x = randomX * gridCellWidth + (gridCellWidth - shapeWidth) / 2;
  const y = randomY * gridCellHeight + (gridCellHeight - shapeHeight) / 2;

  return { x, y };
}

function doesOverlap(newShape, existingShapes) {
  for (let shape of existingShapes) {
    if (
      newShape.x < shape.x + shape.width &&
      newShape.x + newShape.width > shape.x &&
      newShape.y < shape.y + shape.height &&
      newShape.y + newShape.height > shape.y
    ) {
      return true;
    }
  }
  return false;
}

function randomizePosition(shapeWidth, shapeHeight, existingShapes) {
  let shape = {};
  let tries = 0;
  const buffer = 10; 
  do {
    shape = {
      x: buffer + Math.random() * (CANVAS_WIDTH - shapeWidth - 2 * buffer),
      y: buffer + Math.random() * (CANVAS_HEIGHT - shapeHeight - 2 * buffer),
      width: shapeWidth,
      height: shapeHeight
    };
    tries++;
  } while (doesOverlap(shape, existingShapes) && tries < 100);

  return { x: shape.x, y: shape.y };
}

function GameLevel2() {
  const [gameActive, setGameActive] = useState(true);
  
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
        color: "#9BC4D4",
        size: "small",
        width: 60,
        height: 30,
      },
      {
        id: 4,
        type: "rectangle",
        color: "#9BC4D4",
        size: "large",
        targetWidth: 120,
        targetHeight: 60,
      },
      {
        id: 5,
        type: "triangle",
        color: "#D9A48E",
        size: "small",
        vertices: [
          { x: 50, y: 350 },
          { x: 110, y: 350 },
          { x: 80, y: 280 }
        ]
      },
      {
        id: 6,
        type: "triangle",
        color: "#D9A48E",
        size: "large",
        targetVertices: [
          { x: 700, y: 550 },
          { x: 790, y: 550 },
          { x: 745, y: 450 }
        ]
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
        color: "#FAE199",
        size: "small",
        width: 60,
        height: 52,  
      },
      {
        id: 10,
        type: "hexagon",
        color: "#FAE199",
        size: "large",
        targetWidth: 120, 
      },
      {
        id: 11,
        type: "hexagon",
        color: "#FAE199",
        size: "large",
        targetWidth: 120, 
        targetHeight: 104
    }
    
  ];
  let placedShapes = [];
  initialShapes = initialShapes.map(shape => {
    const shapeWidth = shape.width || shape.targetWidth || shape.r * 2 || shape.targetR * 2;
    const shapeHeight = shape.height || shape.targetHeight || shape.r * 2 || shape.targetR * 2;
  
    let randomPos;
    do {
      randomPos = getRandomGridPosition(shapeWidth, shapeHeight);
    } while (doesOverlap({ ...randomPos, width: shapeWidth, height: shapeHeight }, placedShapes));
  
    placedShapes.push({
      x: randomPos.x,
      y: randomPos.y,
      width: shapeWidth,
      height: shapeHeight
    });
    if (shape.size === "small") {
      shape.cx = randomPos.x + shapeWidth / 2;
      shape.cy = randomPos.y + shapeHeight / 2;
      shape.x = randomPos.x;
      shape.y = randomPos.y;
    } else {
      shape.targetX = randomPos.x;
      shape.targetY = randomPos.y;
    }
    return shape;
  });

  const [shapes, setShapes] = useState(initialShapes);

  const handleDragStart = (event, shapeId) => {
    event.dataTransfer.setData("shapeId", shapeId);
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
      const updatedShapes = shapes.filter(
        (s) => ![shapeId, targetShapeId].includes(s.id)
      );
      setShapes(updatedShapes);
    }
  };

  const [positions, setPositions] = useState({});
  const handleDragEnd = (event, shapeId) => {
    const { clientX, clientY } = event;
    setPositions(prev => ({
      ...prev,
      [shapeId]: { x: clientX, y: clientY }
    }));
  };

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="gameControls"></div>
      <div className="gameCanvas" onDragOver={allowDrop}>
        {shapes.map((shape) => {
          const position = positions[shape.id] || {};
          return (
            <div
              key={shape.id}
              draggable={gameActive}
              onDragStart={(event) => handleDragStart(event, shape.id)}
              onDragEnd={(event) => handleDragEnd(event, shape.id)}
              onDrop={(event) => handleDrop(event, shape.id)}
              onDragOver={(event) => event.preventDefault()}
              style={{
                position: "absolute",
                top: position.y || (shape.type === "circle" 
                     ? (shape.size === "small" ? shape.cy - shape.r : shape.targetY - shape.targetR) 
                     : (shape.size === "small" ? shape.y : shape.targetY)),
                left: position.x || (shape.type === "circle" 
                     ? (shape.size === "small" ? shape.cx - shape.r : shape.targetX - shape.targetR) 
                     : (shape.size === "small" ? shape.x : shape.targetX)),
                width: shape.type === "circle" 
                     ? (shape.size === "small" ? shape.r * 2 : shape.targetR * 2) 
                     : (shape.size === "small" ? shape.width : shape.targetWidth),
                height: shape.type === "circle" 
                     ? (shape.size === "small" ? shape.r * 2 : shape.targetR * 2) 
                     : (shape.size === "small" ? shape.height : shape.targetHeight),
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
                    : shape.type === "triangle"
                    ? { vertices: shape.targetVertices }
                    : { width: shape.targetWidth, height: shape.targetHeight }
                }
              />
            </div>
          );
        })}
      </div>
      <div className="scoreboard">
        Shapes Left: {shapes.filter((shape) => shape.size === "small").length}
      </div>
    </div>
  );
}

export default GameLevel2;
