"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/02-layouts", label: "Overview" },
  { href: "/02-layouts/settings", label: "Settings" },
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        <Link
          key={tab.href}
          href={tab.href}
          aria-current={pathname === tab.href ? "page" : undefined}
        >
          {tab.label}
        </Link>
      ))}
    </nav>
  );
}
