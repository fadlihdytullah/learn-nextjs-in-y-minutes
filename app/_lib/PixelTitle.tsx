// Pixel wordmark in the "suikodev" style: 6-row grid, 1-cell gap between glyphs.
// Row 0 is the ascender row; x-height letters use rows 1-5.
const glyphs: Record<string, string[]> = {
  a: ["....", "####", "...#", "####", "#..#", "####"],
  e: ["....", "####", "#..#", "####", "#...", "####"],
  i: ["#", ".", "#", "#", "#", "#"],
  j: ["...#", "....", "...#", "...#", "#..#", "####"],
  l: ["#", "#", "#", "#", "#", "#"],
  m: [".....", "#####", "#.#.#", "#.#.#", "#.#.#", "#.#.#"],
  n: ["....", "####", "#..#", "#..#", "#..#", "#..#"],
  r: ["....", "####", "#...", "#...", "#...", "#..."],
  s: ["....", "####", "#...", "####", "...#", "####"],
  t: [".#..", "####", ".#..", ".#..", ".#..", ".###"],
  u: ["....", "#..#", "#..#", "#..#", "#..#", "####"],
  x: ["....", "#..#", "#..#", ".##.", "#..#", "#..#"],
  y: ["....", "#..#", "#..#", "####", "...#", "####"],
  ".": [".", ".", ".", ".", ".", "#"],
  " ": [".", ".", ".", ".", ".", "."],
};

function linePath(text: string, top: number) {
  let d = "";
  let x = 0;
  for (const ch of text) {
    const g = glyphs[ch];
    g.forEach((row, y) =>
      [...row].forEach((c, dx) => {
        if (c === "#") d += `M${x + dx} ${top + y}h1v1h-1z`;
      }),
    );
    x += g[0].length + 1;
  }
  return { d, width: x - 1 };
}

export default function PixelTitle({ lines, label }: { lines: string[]; label: string }) {
  const paths = lines.map((l, i) => linePath(l, i * 8));
  const width = Math.max(...paths.map((p) => p.width));
  const height = lines.length * 8 - 2;
  return (
    <h1 className="pixel-title">
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label}>
        <defs>
          <linearGradient id="pixel-ink" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--fg)" />
            <stop offset="1" stopColor="var(--fg-muted)" />
          </linearGradient>
        </defs>
        <path d={paths.map((p) => p.d).join("")} fill="url(#pixel-ink)" shapeRendering="crispEdges" />
      </svg>
    </h1>
  );
}
