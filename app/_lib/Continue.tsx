"use client";

import Link from "next/link";
import { lessons } from "./lessons";
import { useProgress } from "./progress";

export default function Continue() {
  const done = useProgress();
  const count = lessons.filter((l) => done.includes(l.slug)).length;
  if (count === 0) return null;

  const next = lessons.find((l) => !done.includes(l.slug));
  return (
    <p className="continue">
      <span className="pill">
        {count}/{lessons.length} completed
      </span>
      {next ? <Link href={`/${next.slug}`}>Continue: {next.title} →</Link> : "All lessons done. Nice work!"}
    </p>
  );
}
