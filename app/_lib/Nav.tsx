"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { lessons } from "./lessons";
import { useProgress } from "./progress";

export default function Nav() {
  const pathname = usePathname();
  const done = useProgress();

  useEffect(() => {
    document
      .querySelector('.nav [aria-current="page"]')
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);

  return (
    <nav className="nav" aria-label="Lessons">
      <ol>
        {lessons.map((l, i) => (
          <li key={l.slug}>
            {l.section !== lessons[i - 1]?.section && <p className="nav-label">{l.section}</p>}
            <Link
              href={`/${l.slug}`}
              aria-current={pathname.startsWith(`/${l.slug}`) ? "page" : undefined}
            >
              <span className="nav-num">{String(i + 1).padStart(2, "0")}</span>
              {l.title}
              {done.includes(l.slug) && (
                <span className="nav-done" aria-label="completed">
                  ✓
                </span>
              )}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
