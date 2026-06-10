"use client";

// Segments for the pie chart: Crypto 35%, Gift Cards 45%, Global Payouts 20%
const segments = [
  { label: "Crypto", pct: 35, color: "#3B82F6" }, // blue
  { label: "Gift Cards", pct: 45, color: "#F59E0B" }, // amber/gold
  { label: "Global Payouts", pct: 20, color: "#F97316" }, // orange
];

const CX = 50;
const CY = 50;
const R = 40;

// Convert a percentage + running cumulative to an SVG arc path
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function pieSlicePath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const s = polarToCartesian(cx, cy, r, startAngle);
  const e = polarToCartesian(cx, cy, r, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${cx} ${cy}`,
    `L ${s.x} ${s.y}`,
    `A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y}`,
    "Z",
  ].join(" ");
}

// Label point midway through each slice
function labelPos(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const mid = (startAngle + endAngle) / 2;
  const rLabel = r * 0.65; // inset from edge
  return polarToCartesian(cx, cy, rLabel, mid);
}

export default function VolumeChart() {
  let cumulative = 0;

  const slices = segments.map((s) => {
    const startAngle = cumulative * 3.6; // pct → degrees
    cumulative += s.pct;
    const endAngle = cumulative * 3.6;
    return { ...s, startAngle, endAngle };
  });

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <svg viewBox="0 0 100 100" className="w-55 h-55">
        {slices.map((s, i) => {
          const path = pieSlicePath(CX, CY, R, s.startAngle, s.endAngle);
          const lp = labelPos(CX, CY, R, s.startAngle, s.endAngle);
          return (
            <g key={i}>
              <path d={path} fill={s.color} stroke="white" strokeWidth="1" />
              <text
                x={lp.x}
                y={lp.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="4.5"
                fontWeight="700"
                fill="white"
              >
                {s.pct}%
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
