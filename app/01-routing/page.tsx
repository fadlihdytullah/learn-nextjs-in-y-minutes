// ─── 01. ROUTING ────────────────────────────────────────────────────────────
// Next.js uses the file system as the router. Everything lives in `app/`.
//
//   app/page.tsx                  ->  /
//   app/01-routing/page.tsx       ->  /01-routing          (this file)
//   app/01-routing/nested/page.tsx->  /01-routing/nested
//
// Rules of thumb:
// - A FOLDER is a URL segment.
// - A folder only becomes a public route once it contains a `page.tsx`.
// - Other files next to `page.tsx` (components, utils) are NOT routable,
//   so you can colocate them safely.
// - `_folder`  = private folder: never routable. This project keeps its
//                helpers in `app/_lib/`.
// - `(folder)` = route group: organizes files WITHOUT adding a URL segment.
//                `app/(marketing)/about/page.tsx` -> /about

import Link from "next/link"; // Client-side navigation + prefetching. More in lesson 02.
import Source from "../_lib/Source";

export const metadata = { title: "01. Routing" }; // Sets <title>. More in lesson 11.

// A page is just a React component, default-exported from `page.tsx`.
// It's a Server Component by default: it runs on the server, ships no JS.
export default function RoutingPage() {
  return (
    <>
      <h1>01. Routing</h1>

      <div className="demo">
        <p>You are on <code>/01-routing</code>.</p>
        <p>
          Go deeper: <Link href="/01-routing/nested">/01-routing/nested</Link>
        </p>
      </div>

      <Source
        files={["app/01-routing/page.tsx", "app/01-routing/nested/page.tsx"]}
      />
    </>
  );
}
