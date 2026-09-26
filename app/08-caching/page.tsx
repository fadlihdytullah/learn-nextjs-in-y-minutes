// ─── 08. CACHING (Cache Components) ─────────────────────────────────────────
// Enabled by `cacheComponents: true` in next.config.ts. The rules are simple:
//
//   1. Nothing is cached unless you say so.
//   2. Say so with "use cache" on a function or component.
//   3. Uncached async work must sit inside <Suspense> (it streams at request time).
//
// At build time Next.js prerenders a STATIC SHELL: static markup + cached parts
// + Suspense fallbacks. That shell is served instantly; the holes stream in.
// This is called Partial Prerendering.
//
// Data-level caching works the same way:
//   export async function getProducts() {
//     "use cache";
//     cacheLife("hours");
//     cacheTag("products");
//     return db.query("SELECT * FROM products");
//   }

import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { Suspense } from "react";
import Source from "../_lib/Source";
import { invalidateClock } from "./actions";

export const metadata = { title: "08. Caching" };

const time = () => new Date().toLocaleTimeString("en-GB");

export default function Page() {
  return (
    <>
      <h1>08. Caching</h1>

      <div className="demo">
        <p>Reload the page a few times and compare:</p>
        <CachedClock />
        <Suspense fallback={<p>Live time: …</p>}>
          <LiveClock />
        </Suspense>
        <form action={invalidateClock}>
          <button>updateTag(&quot;clock&quot;)</button>
        </form>
      </div>

      <Source
        files={["app/08-caching/page.tsx", "app/08-caching/actions.ts", "next.config.ts"]}
      />
    </>
  );
}

// Cached: rendered once, reused for everyone until it expires or is invalidated.
async function CachedClock() {
  "use cache";
  cacheLife("hours"); // Presets: seconds, minutes, hours, days, weeks, max. Or { stale, revalidate, expire }.
  cacheTag("clock"); // A label we can invalidate on demand.
  return <p>Cached time: <strong>{time()}</strong> (sticks around)</p>;
}

// Dynamic: `connection()` says "wait for a real request", so this renders fresh
// every time. Reading cookies(), headers(), or searchParams has the same effect.
async function LiveClock() {
  await connection();
  return <p>Live time: <strong>{time()}</strong> (changes on every reload)</p>;
}
