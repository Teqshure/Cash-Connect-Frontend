"use client";

const data = [
  { day: "Mon", value: 35, secondary: 90 },
  { day: "Tue", value: 80, secondary: 60 },
  { day: "Wed", value: 65, secondary: 75 },
  { day: "Thu", value: 115, secondary: 100 },
  { day: "Fri", value: 80, secondary: 70 },
  { day: "Sat", value: 100, secondary: 80 },
  { day: "Sun", value: 95, secondary: 75 },
];

const MAX = 120;
const gridLines = [120, 90, 60, 30, 0];

// SVG canvas dimensions
const WIDTH = 560;
const HEIGHT = 240;
const PAD_LEFT = 32; // space for y-axis labels
const PAD_RIGHT = 8;
const PAD_TOP = 10;
const PAD_BOT = 32; // space for x-axis labels

const chartW = WIDTH - PAD_LEFT - PAD_RIGHT;
const chartH = HEIGHT - PAD_TOP - PAD_BOT;

const barGroupW = chartW / data.length;
const BAR_W = Math.min(barGroupW * 0.35, 18); // bar width, capped

function toY(val: number) {
  return PAD_TOP + chartH - (val / MAX) * chartH;
}
function barH(val: number) {
  return (val / MAX) * chartH;
}

export default function ActivityChart() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Horizontal grid lines + Y labels */}
      {gridLines.map((val) => {
        const y = toY(val);
        return (
          <g key={val}>
            <text
              x={PAD_LEFT - 6}
              y={y + 4}
              textAnchor="end"
              fontSize={10}
              fill="#CBD5E1"
              fontWeight="600"
            >
              {val}
            </text>
            <line
              x1={PAD_LEFT}
              y1={y}
              x2={WIDTH - PAD_RIGHT}
              y2={y}
              stroke="#F1F5F9"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
          </g>
        );
      })}

      {/* Bars */}
      {data.map((item, i) => {
        const cx = PAD_LEFT + barGroupW * i + barGroupW / 2;
        const secH = barH(item.secondary);
        const priH = barH(item.value);

        return (
          <g key={item.day}>
            {/* Secondary (gray) bar */}
            <rect
              x={cx - BAR_W / 2}
              y={toY(item.secondary)}
              width={BAR_W}
              height={secH}
              rx={BAR_W / 2}
              fill="#E2E8F0"
            />
            {/* Primary (green) bar */}
            <rect
              x={cx - BAR_W / 2}
              y={toY(item.value)}
              width={BAR_W}
              height={priH}
              rx={BAR_W / 2}
              fill="#00B86B"
            />
            {/* X-axis label */}
            <text
              x={cx}
              y={HEIGHT - 6}
              textAnchor="middle"
              fontSize={11}
              fill="#94A3B8"
              fontWeight="600"
            >
              {item.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
