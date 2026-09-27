import Link from "next/link";
import Continue from "./_lib/Continue";
import { lessons } from "./_lib/lessons";
import PixelTitle from "./_lib/PixelTitle";

export default function Home() {
  return (
    <>
      <p className="announce">
        <span className="pill">New</span> Updated for Next.js 16: Cache Components and proxy.ts
      </p>

      <PixelTitle lines={["learn next.js", "in y minutes"]} label="Learn Next.js in Y minutes" />
      <p className="lead">
        Twelve short lessons. Each one explains an idea in a few sentences, runs a
        live demo right on the page, and shows the code behind it. Every demo is a
        real route you can open in your editor and change.
      </p>

      <ul className="checks">
        <li>Live demos</li>
        <li>App Router</li>
        <li>TypeScript</li>
      </ul>

      <Continue />

      <ol className="steps">
        {lessons.map((l, i) => (
          <li key={l.slug}>
            <span className="step-num">{i + 1}</span>
            <Link href={`/${l.slug}`}>{l.title}</Link>
            <p>{l.blurb}</p>
          </li>
        ))}
      </ol>
    </>
  );
}
