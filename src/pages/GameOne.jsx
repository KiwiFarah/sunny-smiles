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
      targetR: 60,
    },
  ]);

  const handleDragStart = (event, shapeId) => {
    console.log("Dragging started for shape:", shapeId);
    event.dataTransfer.setData("shapeId", shapeId);
  };

  const handleDrop = (event, targetShapeId) => {
    event.preventDefault();
    console.log("Drop event detected on shape:", targetShapeId);

    const shapeId = parseInt(event.dataTransfer.getData("shapeId"));
    const draggableShape = shapes.find((s) => s.id === shapeId);
    const targetShape = shapes.find((s) => s.id === targetShapeId);

    if (!draggableShape || !targetShape) return;

    if (
      draggableShape.type === targetShape.type &&
      draggableShape.size === "small" &&
      targetShape.size === "large"
    ) {
      console.log("Shape dropped on target");
      const updatedShapes = shapes.filter((s) => ![shapeId, targetShapeId].includes(s.id));
      setShapes(updatedShapes);
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
