"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { lessons } from "./lessons";

export default function Nav() {
  const pathname = usePathname();

  // On mobile the nav is a horizontal strip: keep the active lesson in view.
  useEffect(() => {
    document
      .querySelector('.nav [aria-current="page"]')
      ?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }, [pathname]);

  return (
    <nav className="nav" aria-label="Lessons">
      <p className="nav-label">Lessons</p>
      <ol>
        {lessons.map((l, i) => (
          <li key={l.slug}>
            <Link
              href={`/${l.slug}`}
              aria-current={pathname.startsWith(`/${l.slug}`) ? "page" : undefined}
            >
              <span className="nav-num">{String(i + 1).padStart(2, "0")}</span>
              {l.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
