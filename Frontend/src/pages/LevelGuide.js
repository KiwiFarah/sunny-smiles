import React from "react";
import Shape from "./Shape";

const level1Shapes = [
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
    type: "rectangle",
    color: "#3d85c6",
    size: "small",
    x: 250,
    y: 250,
    width: 60,
    height: 30,
  },
  {
    id: 5, // Adjust id as necessary, I'm using 5 assuming you'll add after the existing shapes
    type: "triangle",
    color: "#FFA726", // You can change the color
    size: "small",
    x: 350,
    y: 350,
    width: 50,
    height: 50,
  },
];

const level2Shapes = [
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
    type: "rectangle",
    color: "#3d85c6",
    size: "small",
    x: 250,
    y: 250,
    width: 60,
    height: 30,
  },
  {
    id: 3, // Adjust id as necessary, I'm using 5 assuming you'll add after the existing shapes
    type: "triangle",
    color: "#FFA726", // You can change the color
    size: "small",
    x: 350,
    y: 350,
    width: 50,
    height: 50,
  },
  {
    id: 7,
    type: "pentagon",
    color: "#A8C9A5",
    size: "small",
    width: 60,
    height: 60,
  },
];

const level3Shapes = [
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
    type: "rectangle",
    color: "#3d85c6",
    size: "small",
    x: 250,
    y: 250,
    width: 60,
    height: 30,
  },
  {
    id: 3, // Adjust id as necessary, I'm using 5 assuming you'll add after the existing shapes
    type: "triangle",
    color: "#FFA726", // You can change the color
    size: "small",
    x: 350,
    y: 350,
    width: 50,
    height: 50,
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
    id: 9,
    type: "hexagon",
    color: "#8f73e6",
    size: "small",
    width: 60,
    height: 52,
  },
];
const level4Shapes = [
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
    type: "rectangle",
    color: "#3d85c6",
    size: "small",
    x: 250,
    y: 250,
    width: 60,
    height: 30,
  },
  {
    id: 3, // Adjust id as necessary, I'm using 5 assuming you'll add after the existing shapes
    type: "triangle",
    color: "#FFA726", // You can change the color
    size: "small",
    x: 350,
    y: 350,
    width: 50,
    height: 50,
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
    id: 9,
    type: "hexagon",
    color: "#8f73e6",
    size: "small",
    width: 60,
    height: 52,
  },
  {
    id: 11,
    type: "octagon",
    color: "#E7AD99",
    size: "small",
    width: 60,
    height: 60,
  },
];
const level5Shapes = [
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
    type: "rectangle",
    color: "#3d85c6",
    size: "small",
    x: 250,
    y: 250,
    width: 60,
    height: 30,
  },
  {
    id: 3, // Adjust id as necessary, I'm using 5 assuming you'll add after the existing shapes
    type: "triangle",
    color: "#FFA726", // You can change the color
    size: "small",
    x: 350,
    y: 350,
    width: 50,
    height: 50,
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
    id: 9,
    type: "hexagon",
    color: "#8f73e6",
    size: "small",
    width: 60,
    height: 52,
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
    id: 14,
    type: "nonagon",
    color: "#B1A1F7",
    size: "small",
    width: 60,
    height: 60,
  },
];
const level6Shapes = [
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
    type: "rectangle",
    color: "#3d85c6",
    size: "small",
    x: 250,
    y: 250,
    width: 60,
    height: 30,
  },
  {
    id: 3, // Adjust id as necessary, I'm using 5 assuming you'll add after the existing shapes
    type: "triangle",
    color: "#FFA726", // You can change the color
    size: "small",
    x: 350,
    y: 350,
    width: 50,
    height: 50,
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
    id: 9,
    type: "hexagon",
    color: "#8f73e6",
    size: "small",
    width: 60,
    height: 52,
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
    id: 14,
    type: "nonagon",
    color: "#B1A1F7",
    size: "small",
    width: 60,
    height: 60,
  },
  {
    id: 16,
    type: "star",
    color: "#E1E15A",
    size: "small",
    width: 60,
    height: 60,
  },
];
const level7Shapes = [
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
    type: "rectangle",
    color: "#3d85c6",
    size: "small",
    x: 250,
    y: 250,
    width: 60,
    height: 30,
  },
  {
    id: 3, // Adjust id as necessary, I'm using 5 assuming you'll add after the existing shapes
    type: "triangle",
    color: "#FFA726", // You can change the color
    size: "small",
    x: 350,
    y: 350,
    width: 50,
    height: 50,
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
    id: 9,
    type: "hexagon",
    color: "#8f73e6",
    size: "small",
    width: 60,
    height: 52,
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
    id: 14,
    type: "nonagon",
    color: "#B1A1F7",
    size: "small",
    width: 60,
    height: 60,
  },
  {
    id: 16,
    type: "star",
    color: "#E1E15A",
    size: "small",
    width: 60,
    height: 60,
  },
  {
    id: 18,
    type: "ellipse",
    color: "#088F8F",
    size: "small",
    width: 40,
    height: 60,
  },
];

function LevelGuide({ level, className }) {
  let shapesForLevel;

  switch (level) {
    case 1:
      shapesForLevel = level1Shapes;
      break;
    case 2:
      shapesForLevel = level2Shapes;
      break;
    case 3:
      shapesForLevel = level3Shapes;
      break;
    case 4:
      shapesForLevel = level4Shapes;
      break;
    case 5:
      shapesForLevel = level5Shapes;
      break;
    case 6:
      shapesForLevel = level6Shapes;
      break;
    case 7:
      shapesForLevel = level7Shapes;
      break;
    default:
      shapesForLevel = [];
  }

  return (
    <div className={`levelGuide ${className}`}>
      <h3>Let's learn about</h3>
      <ul>
        {shapesForLevel.map((shape, index) => (
          <li key={index}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Shape type={shape.type} color={shape.color} dimensions={shape} />
              <span style={{ marginLeft: "10px" }}>
                {shape.type.charAt(0).toUpperCase() + shape.type.slice(1)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LevelGuide;
