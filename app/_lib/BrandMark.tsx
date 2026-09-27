const rows = [
  "#######",
  "#.....#",
  "#.....#",
  "#ooooo#",
  "#ooooo#",
  ".#ooo#.",
  "..#o#..",
  "...#...",
];

function path(ch: string) {
  let d = "";
  rows.forEach((row, y) =>
    [...row].forEach((c, x) => {
      if (c === ch) d += `M${x} ${y}h1v1h-1z`;
    }),
  );
  return d;
}

export default function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 7 8" aria-hidden shapeRendering="crispEdges">
      <path d={path("#")} fill="var(--fg)" />
      <path d={path("o")} fill="var(--fg-subtle)" />
    </svg>
  );
}
