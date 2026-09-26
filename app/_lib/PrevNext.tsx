"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { lessons } from "./lessons";

export default function PrevNext() {
  const pathname = usePathname();
  const i = lessons.findIndex((l) => pathname.startsWith(`/${l.slug}`));
  if (i === -1) return null;

  const prev = lessons[i - 1];
  const next = lessons[i + 1];
  return (
    <nav className="prev-next" aria-label="Lesson pagination">
      {prev ? (
        <Link href={`/${prev.slug}`}>
          <span>← Previous</span>
          {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link href={`/${next.slug}`} className="next">
          <span>Next →</span>
          {next.title}
        </Link>
      )}
    </nav>
  );
}
