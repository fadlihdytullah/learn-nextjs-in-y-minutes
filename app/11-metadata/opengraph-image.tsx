import { ImageResponse } from "next/og";

// Social preview image, rendered from JSX to PNG (at build time, since nothing here is dynamic).
export const alt = "Learn Next.js in Y Minutes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0a0a, #1e3a8a)",
          color: "white",
        }}
      >
        <div style={{ fontSize: 40, opacity: 0.7 }}>Lesson 11</div>
        <div style={{ fontSize: 88, fontWeight: 700 }}>Learn Next.js in Y Minutes</div>
      </div>
    ),
    size,
  );
}
