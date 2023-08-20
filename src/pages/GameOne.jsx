import React, { useState } from "react";
import "./Game.css";

function GameOne() {
  const [hoveredTarget, setHoveredTarget] = useState(null);
  const [gameActive, setGameActive] = useState(true);
  const [shapes, setShapes] = useState([
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
      targetR: 60, // Bigger radius for target
    },
    // ... More shapes can be added
  ]);

  const handleDragStart = (event, shapeId) => {
    console.log("Dragging started for shape:", shapeId); // Add this line
    event.dataTransfer.setData("shapeId", shapeId);
  };

  const handleDrop = (event, targetShapeId) => {
    event.preventDefault();
  
    const shapeId = parseInt(event.dataTransfer.getData("shapeId"));
    const draggableShape = shapes.find((s) => s.id === shapeId);
    const targetShape = shapes.find((s) => s.id === targetShapeId);
  
    if (!draggableShape || !targetShape) return;
  
    const targetCenterX = targetShape.targetX;
    const targetCenterY = targetShape.targetY;
    const draggableCenterX = draggableShape.cx;
    const draggableCenterY = draggableShape.cy;
    
    const distance = Math.sqrt(
      (draggableCenterX - targetCenterX) ** 2 + (draggableCenterY - targetCenterY) ** 2
    );
  
    setHoveredTarget(null);
  
    if (
      draggableShape.type === targetShape.type &&
      draggableShape.size !== targetShape.size
    ) {
      const dropX = event.clientX - event.target.getBoundingClientRect().left;
      const dropY = event.clientY - event.target.getBoundingClientRect().top;
  
      const dropDistance = Math.sqrt(
        (dropX - targetShape.targetX) ** 2 + (dropY - targetShape.targetY) ** 2
      );
      if (
        draggableShape.size !== "small" ||
        shapes.find((s) => s.id === targetShapeId).size !== "large"
      ) {
        return;
      }
  
      if (dropDistance < targetShape.targetR) {
        console.log("Shape dropped on target");
        const updatedShapes = shapes.filter(
          (s) => s.id !== shapeId && s.id !== targetShapeId
        );
        setShapes(updatedShapes);
      }
    }
  };
  

  const allowDrop = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <div className="gameControls">
        <button onClick={() => setGameActive(false)}>Pause</button>
        <button onClick={() => setGameActive(true)}>Resume</button>
        <button onClick={() => window.location.reload()}>Restart</button>
      </div>
      <div className="gameCanvas" onDragOver={allowDrop}>
        {shapes.map((shape) => (
          <React.Fragment key={shape.id}>
            {shape.size === "small" ? (
              <div
                draggable={gameActive}
                onDragStart={(event) => handleDragStart(event, shape.id)}
                style={{
                  position: "absolute",
                  top: shape.cy - shape.r,
                  left: shape.cx - shape.r,
                  width: shape.r * 2,
                  height: shape.r * 2,
                }}
              >
                <svg
                  className="gameShape"
                  width={shape.r * 2}
                  height={shape.r * 2}
                >
                  <circle
                    cx={shape.r}
                    cy={shape.r}
                    r={shape.r}
                    fill={shape.color}
                  />
                </svg>
              </div>
            ) : (
              <svg
                className="gameShape"
                width={shape.targetR * 2}
                height={shape.targetR * 2}
                style={{
                  position: "absolute",
                  top: shape.targetY - shape.targetR,
                  left: shape.targetX - shape.targetR,
                }}
                onDragEnter={() => setHoveredTarget(shape.id)}
                onDragLeave={() => setHoveredTarget(null)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => handleDrop(event, shape.id)}
              >
                <circle
                  cx={shape.targetR}
                  cy={shape.targetR}
                  r={
                    shape.id === hoveredTarget
                      ? shape.targetR + 5
                      : shape.targetR
                  }
                  fill={shape.id === hoveredTarget ? "#D485CF" : shape.color}
                  stroke="#000"
                  strokeDasharray="5,5"
                />
              </svg>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="scoreboard">
      Shapes Left: {shapes.filter((shape) => shape.size === "small").length}
    </div>
  </div>
  );
}

export default GameOne;
