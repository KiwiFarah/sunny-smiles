import React, { useState } from "react";
import "./Game.css";
import Shape from "./Shape";

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 700;

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
  const buffer = 10;  // margin or buffer from the edge
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

function GameLevel1() {
  const [gameActive, setGameActive] = useState(true);
  const initialShapes = [
    {
      id: 1,
      type: "circle",
      color: "#D49CDA",
      size: "small",
      cx: 150,
      cy: 150,
      r: 30,
    },
    {
      id: 2,
      type: "circle",
      color: "#D49CDA",
      size: "large",
      targetX: 600,
      targetY: 300,
      targetR: 60,
    },
    {
      id: 3,
      type: "rectangle",
      color: "#9BC4D4",
      size: "small",
      x: 250,
      y: 250,
      width: 60,
      height: 30,
    },

    {
      id: 4,
      type: "rectangle",
      color: "#9BC4D4",
      size: "large",
      targetX: 700,
      targetY: 350,
      targetWidth: 120,
      targetHeight: 60,
    },
    {
      id: 5,
      type: "triangle",
      color: "#D9A48E",
      size: "small",
      vertices: [
        { x: 50, y: 400 },
        { x: 110, y: 400 },
        { x: 80, y: 330 },
      ],
    },
    {
      id: 6,
      type: "triangle",
      color: "#D9A48E",
      size: "large",
      targetVertices: [
        { x: 700, y: 600 },
        { x: 790, y: 600 },
        { x: 745, y: 500 },
      ],
    },
  ];
  let placedShapes = [];
  let randomizedShapes = initialShapes.map(shape => {
    if (shape.size === "small") {
      const shapeWidth = shape.width || shape.r * 2;
      const shapeHeight = shape.height || shape.r * 2;
      const randomPos = randomizePosition(shapeWidth, shapeHeight, placedShapes);
      placedShapes.push({
        x: randomPos.x,
        y: randomPos.y,
        width: shapeWidth,
        height: shapeHeight
      });
      shape.cx = randomPos.x;
      shape.cy = randomPos.y;
    }
    return shape;
  });


  const [shapes, setShapes] = useState(randomizedShapes);


  const handleDragStart = (event, shapeId) => {
    event.dataTransfer.setData("shapeId", shapeId);
  };

  const handleDrop = (event, targetShapeId) => {
    event.preventDefault();
    const shapeId = parseInt(event.dataTransfer.getData("shapeId"));
    const draggableShape = shapes.find((s) => s.id === shapeId);
    const targetShape = shapes.find((s) => s.id === targetShapeId);
  
    if (!draggableShape || !targetShape) return;
  
    if (draggableShape.type === targetShape.type && draggableShape.size !== targetShape.size) {
      const updatedShapes = shapes.filter((s) => ![shapeId, targetShapeId].includes(s.id));
      setShapes(updatedShapes);
    }
  };

  const [positions, setPositions] = useState({});
  const handleDragEnd = (event, shapeId) => {
    const { clientX, clientY } = event;
    const shape = shapes.find(s => s.id === shapeId);
    const offsetX = shape.type === "circle" ? (shape.size === "small" ? shape.r : shape.targetR) : (shape.size === "small" ? shape.width / 2 : shape.targetWidth / 2);
    const offsetY = shape.type === "circle" ? (shape.size === "small" ? shape.r : shape.targetR) : (shape.size === "small" ? shape.height / 2 : shape.targetHeight / 2);
    setPositions(prev => ({
      ...prev,
      [shapeId]: { x: clientX - offsetX, y: clientY - offsetY }
    }));
  };

  const updatePosition = (shape, position) => {
    const x = position.x || (shape.type === "circle" ? (shape.size === "small" ? shape.cx - shape.r : shape.targetX - shape.targetR) : (shape.size === "small" ? shape.x : shape.targetX));
    const y = position.y || (shape.type === "circle" ? (shape.size === "small" ? shape.cy - shape.r : shape.targetY - shape.targetR) : (shape.size === "small" ? shape.y : shape.targetY));
    return { x, y };
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
          const pos = updatePosition(shape, position);
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
                top: pos.y,
                left: pos.x,
                width: shape.type === "circle" ? (shape.size === "small" ? shape.r * 2 : shape.targetR * 2) : (shape.size === "small" ? shape.width : shape.targetWidth),
                height: shape.type === "circle" ? (shape.size === "small" ? shape.r * 2 : shape.targetR * 2) : (shape.size === "small" ? shape.height : shape.targetHeight),
              }}
            >
              <Shape
                type={shape.type}
                color={shape.color}
                dimensions={
                  shape.size === "small" ? shape
                  : shape.type === "circle" ? { r: shape.targetR }
                  : shape.type === "triangle" ? { vertices: shape.targetVertices }
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

export default GameLevel1;
