// ─── 10. PROXY ──────────────────────────────────────────────────────────────
// Good for: redirects based on the request, A/B test rewrites, headers,
// quick "is there a session cookie?" checks.
// Not for: slow data fetching or real authorization (check auth where the data is).
// Static redirects? Use `redirects()` in next.config.ts instead.

import Link from "next/link";
import { headers } from "next/headers";
import { Suspense } from "react";
import Source from "../_lib/Source";

export const metadata = { title: "10. Proxy" };

export default function Page() {
  return (
    <>
      <h1>10. Proxy</h1>

      <div className="demo">
        <Suspense fallback={<p>Reading headers…</p>}>
          <Greeting />
        </Suspense>
        <ul>
          <li>
            <Link href="/10-proxy/old">/10-proxy/old</Link> → redirected to /10-proxy/new
          </li>
          <li>
            <Link href="/10-proxy/masked">/10-proxy/masked</Link> → shows /10-proxy/new,
            URL stays
          </li>
        </ul>
      </div>

      <Source files={["proxy.ts", "app/10-proxy/page.tsx"]} />
    </>
  );
}

// headers() is request-time data, hence the <Suspense> around it.
async function Greeting() {
  const greeting = (await headers()).get("x-greeting");
  return <p>Header set by proxy: <strong>{greeting ?? "(none)"}</strong></p>;
}
