import React from "react";

function Shape({ type, color, dimensions }) {
  switch (type) {
    case "circle":
      return (
        <svg width={dimensions.r * 2} height={dimensions.r * 2}>
          <circle
            cx={dimensions.r}
            cy={dimensions.r}
            r={dimensions.r}
            fill={color}
          />
        </svg>
      );
    case "rectangle":
      return (
        <svg width={dimensions.width} height={dimensions.height}>
          <rect
            width={dimensions.width}
            height={dimensions.height}
            fill={color}
          />
        </svg>
      );
    case "triangle":
      const [A, B, C] = dimensions.vertices;
      return (
        <svg width={B.x - A.x} height={A.y - C.y}>
          <polygon
            points={`${A.x},${A.y} ${B.x},${B.y} ${C.x},${C.y}`}
            fill={color}
          />
        </svg>
      );
    case "pentagon":
      // For simplicity, I'll create a symmetrical pentagon using its width and height
      const w = dimensions.width;
      const h = dimensions.height;
      const points = [
        { x: w / 2, y: 0 },
        { x: w, y: h * 0.3 },
        { x: w * 0.75, y: h },
        { x: w * 0.25, y: h },
        { x: 0, y: h * 0.3 },
      ]
        .map((p) => `${p.x},${p.y}`)
        .join(" ");

      return (
        <svg width={w} height={h}>
          <polygon points={points} fill={color} />
        </svg>
      );
    case "octagon":
      const ow = dimensions.width;
      const oh = dimensions.height;
      const octPoints = [
        { x: ow * 0.2, y: 0 },
        { x: ow * 0.8, y: 0 },
        { x: ow, y: oh * 0.2 },
        { x: ow, y: oh * 0.8 },
        { x: ow * 0.8, y: oh },
        { x: ow * 0.2, y: oh },
        { x: 0, y: oh * 0.8 },
        { x: 0, y: oh * 0.2 },
      ]
        .map((p) => `${p.x},${p.y}`)
        .join(" ");

      return (
        <svg width={ow} height={oh}>
          <polygon points={octPoints} fill={color} />
        </svg>
      );
      case "heptagon":
      const heptw = dimensions.width;
      const hepth = dimensions.height;
      const heptPoints = Array.from({ length: 7 }).map((_, i) => {
        const angle = (Math.PI / 3.5) * i;
        const x = heptw / 2 + (heptw / 2) * Math.cos(angle);
        const y = hepth / 2 + (hepth / 2) * Math.sin(angle);
        return `${x},${y}`;
      }).join(" ");
      
      return (
        <svg width={hw} height={hh}>
          <polygon points={heptPoints} fill={color} />
        </svg>
      );

      case "nonagon":
        const nw = dimensions.width;
        const nh = dimensions.height;
        const nonaPoints = Array.from({ length: 9 }).map((_, i) => {
            const angle = (2 * Math.PI / 9) * i;  // Fix angle for nonagon
            const x = nw / 2 + (nw / 2) * Math.cos(angle);
            const y = nh / 2 + (nh / 2) * Math.sin(angle);
            return `${x},${y}`;
        }).join(" ");
    
        return (
            <svg width={nw} height={nh}>
                <polygon points={nonaPoints} fill={color} />
            </svg>
        );
    
    case "decagon":
      const dw = dimensions.width;
      const dh = dimensions.height;
      const decaPoints = Array.from({ length: 10 }).map((_, i) => {
        const angle = (Math.PI / 5) * i;
        const x = dw / 2 + (dw / 2) * Math.cos(angle);
        const y = dh / 2 + (dh / 2) * Math.sin(angle);
        return `${x},${y}`;
      }).join(" ");

      return (
        <svg width={dw} height={dh}>
          <polygon points={decaPoints} fill={color} />
        </svg>
      );

    case "hendecagon":
      const hew = dimensions.width;
      const heh = dimensions.height;
      const hendePoints = Array.from({ length: 11 }).map((_, i) => {
        const angle = (Math.PI / 5.5) * i;
        const x = hew / 2 + (hew / 2) * Math.cos(angle);
        const y = heh / 2 + (heh / 2) * Math.sin(angle);
        return `${x},${y}`;
      }).join(" ");

      return (
        <svg width={hew} height={heh}>
          <polygon points={hendePoints} fill={color} />
        </svg>
      );

    case "dodecagon":
      const dodw = dimensions.width;
      const dodh = dimensions.height;
      const dodecPoints = Array.from({ length: 12 }).map((_, i) => {
        const angle = (Math.PI / 6) * i;
        const x = dodw / 2 + (dodw / 2) * Math.cos(angle);
        const y = dodh / 2 + (dodh / 2) * Math.sin(angle);
        return `${x},${y}`;
      }).join(" ");

      return (
        <svg width={dodw} height={dodh}>
          <polygon points={dodecPoints} fill={color} />
        </svg>
      );

    case "star":
      const sw = dimensions.width;
      const sh = dimensions.height;
      const starPoints = [
        { x: sw * 0.5, y: 0 },
        { x: sw * 0.6, y: sh * 0.35 },
        { x: sw, y: sh * 0.35 },
        { x: sw * 0.7, y: sh * 0.6 },
        { x: sw * 0.8, y: sh },
        { x: sw * 0.5, y: sh * 0.75 },
        { x: sw * 0.2, y: sh },
        { x: sw * 0.3, y: sh * 0.6 },
        { x: 0, y: sh * 0.35 },
        { x: sw * 0.4, y: sh * 0.35 }
      ].map(p => `${p.x},${p.y}`).join(" ");

      return (
        <svg width={sw} height={sh}>
          <polygon points={starPoints} fill={color} />
        </svg>
      );

    case "ellipse":
      return (
        <svg width={dimensions.width * 2} height={dimensions.height}>
          <ellipse cx={dimensions.width} cy={dimensions.height / 2} rx={dimensions.width} ry={dimensions.height / 2} fill={color} />
        </svg>
      );
    case "hexagon":
      // Similarly, creating a symmetrical hexagon
      const hw = dimensions.width;
      const hh = dimensions.height;
      const hexPoints = [
        { x: hw * 0.25, y: 0 },
        { x: hw * 0.75, y: 0 },
        { x: hw, y: hh / 2 },
        { x: hw * 0.75, y: hh },
        { x: hw * 0.25, y: hh },
        { x: 0, y: hh / 2 },
      ]
        .map((p) => `${p.x},${p.y}`)
        .join(" ");

      return (
        <svg width={hw} height={hh}>
          <polygon points={hexPoints} fill={color} />
        </svg>
      );
    default:
      return null;
  }
}

export default Shape;
