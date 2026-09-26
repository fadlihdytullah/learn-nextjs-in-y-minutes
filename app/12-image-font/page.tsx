// ─── 12. IMAGE & FONT ───────────────────────────────────────────────────────
// <Image> (next/image) = <img> + automatic resizing, modern formats (WebP/AVIF),
// lazy loading, and reserved space so the layout doesn't jump.
//
// next/font downloads fonts at BUILD time and self-hosts them: no request to
// Google from the browser, no layout shift while the font loads.

import Image from "next/image";
import { Lora } from "next/font/google";
import Source from "../_lib/Source";
import waves from "./waves.png"; // Static import: width, height and blur placeholder come for free.

export const metadata = { title: "12. Image & Font" };

// Call font loaders at module scope. Variable fonts need no `weight`.
const lora = Lora({ subsets: ["latin"] });

export default function Page() {
  return (
    <>
      <h1>12. Image & Font</h1>

      <div className="demo">
        <h2 className={lora.className}>This heading uses Lora, self-hosted by next/font.</h2>

        <Image
          src={waves}
          alt="Blue generated waves"
          placeholder="blur" // Blurry preview while loading (throttle your network to see it).
          sizes="(max-width: 700px) 100vw, 800px" // Lets the browser pick the right size.
          style={{ width: "100%", height: "auto" }}
        />
      </div>

      <Source files={["app/12-image-font/page.tsx"]} />
    </>
  );
}

// Remote images need an allow-list in next.config.ts:
//   images: { remotePatterns: [new URL("https://images.example.com/**")] }
// and explicit width/height (or `fill` inside a positioned parent):
//   <Image src="https://images.example.com/cat.jpg" alt="Cat" width={400} height={300} />
//
// This project's root layout already uses next/font: Inter and Geist Mono.
