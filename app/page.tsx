import Link from "next/link";
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
        Twelve short lessons, each a real route: a live demo on top, the commented
        source that renders it below. Read it here, then open the file in your
        editor and tinker.
      </p>

      <ul className="checks">
        <li>Runnable</li>
        <li>App Router</li>
        <li>TypeScript</li>
      </ul>

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
