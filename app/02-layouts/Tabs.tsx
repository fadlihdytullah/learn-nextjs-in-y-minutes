"use client"; // Hooks like usePathname only work in Client Components (lesson 04).

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/02-layouts", label: "Overview" },
  { href: "/02-layouts/settings", label: "Settings" },
];

export default function Tabs() {
  const pathname = usePathname(); // Current URL path, e.g. "/02-layouts/settings".

  return (
    <nav className="tabs">
      {tabs.map((tab) => (
        // <Link> = <a> + client-side navigation (no full reload) + prefetching
        // of the target route when the link scrolls into view.
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

// Navigating from code instead of a link:
//   const router = useRouter();       // from "next/navigation"
//   router.push("/02-layouts/settings");
//   router.back();
