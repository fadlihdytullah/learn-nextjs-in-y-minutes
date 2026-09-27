import Source from "../_lib/Source";
import FontDemo from "./FontDemo";
import Photo from "./Photo";

export const metadata = { title: "12. Image & Font" };

export default function Page() {
  return (
    <>
      <h1>12. Image & Font</h1>
      <p>
        Images and fonts are the heaviest things on most pages. Next.js ships two components that
        make them fast by default: <code>next/image</code> and <code>next/font</code>.
      </p>

      <h2>Why {"<Image>"}</h2>
      <p>
        <code>{"<Image>"}</code> is an <code>{"<img>"}</code> with the performance work done for you:
      </p>
      <ul>
        <li>
          <strong>Resizing</strong>: each device downloads a size that fits its screen.
        </li>
        <li>
          <strong>Modern formats</strong>: WebP or AVIF when the browser supports them.
        </li>
        <li>
          <strong>Lazy loading</strong>: images below the fold load only when scrolled near.
        </li>
        <li>
          <strong>No layout shift</strong>: space is reserved before the image arrives.
        </li>
      </ul>

      <h2>Local images</h2>
      <p>
        Import the file directly. Next.js reads its width, height, and a tiny blurred preview at
        build time, so <code>placeholder=&quot;blur&quot;</code> needs nothing else.{" "}
        <code>sizes</code> tells the browser how wide the image will be, so it can pick the right
        file.
      </p>
      <div className="demo">
        <Photo />
      </div>
      <Source file="app/12-image-font/Photo.tsx" />
      <div className="tip">
        <p>
          Throttle your network in DevTools and reload to see the blur placeholder. For the main
          image above the fold, add <code>loading=&quot;eager&quot;</code> or{" "}
          <code>preload</code>. The old <code>priority</code> prop is deprecated in Next.js 16.
        </p>
      </div>

      <h2>Remote images</h2>
      <p>
        Images from another domain need two things: the domain on an allow-list in{" "}
        <code>next.config.ts</code>, and explicit <code>width</code> and <code>height</code> (or{" "}
        <code>fill</code> inside a positioned parent), because Next.js cannot read the file at
        build time.
      </p>
      <Source
        title="next.config.ts"
        lang="ts"
        code={`const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://images.example.com/**")],
  },
};`}
      />
      <Source
        title="Usage"
        code={`<Image src="https://images.example.com/cat.jpg" alt="Cat" width={400} height={300} />`}
      />

      <h2>Fonts with next/font</h2>
      <p>
        <code>next/font</code> downloads the font at build time and serves it from your own domain.
        The browser never calls Google, and the text does not jump when the font loads. Call the
        loader at module scope. <strong>Variable fonts</strong> like Lora need no{" "}
        <code>weight</code>.
      </p>
      <div className="demo">
        <FontDemo />
      </div>
      <Source file="app/12-image-font/FontDemo.tsx" />

      <h2>Fonts for the whole site</h2>
      <p>
        To use a font everywhere, load it in the root layout and expose it as a CSS variable with
        the <code>variable</code> option. This project does exactly that with Inter and Geist Mono,
        then uses <code>var(--font-sans)</code> and <code>var(--font-mono)</code> in its CSS.
      </p>
      <Source
        title="app/layout.tsx"
        code={`const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

<html className={\`\${inter.variable} \${geistMono.variable}\`}>`}
      />

      <div className="prod">
        <p>
          Always write a real <code>alt</code> text, and set <code>sizes</code> on any image that is
          not a fixed width, or phones download the desktop file. Limit yourself to one or two font
          families: each one is extra bytes on every page.
        </p>
      </div>
    </>
  );
}
