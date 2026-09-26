// ─── 06. LOADING & ERRORS ───────────────────────────────────────────────────
// Special files next to page.tsx handle the "not happy" states of a route:
//
//   loading.tsx     shown while the page is loading (wraps page in <Suspense>)
//   error.tsx       shown when rendering throws (wraps page in an error boundary)
//   not-found.tsx   shown when you call notFound()
//
//   app/global-error.tsx   last resort when even the root layout crashes
//
// Expected errors (bad form input, missing record)? Return them as values or
// call notFound(). Throwing is for bugs and outages.

import Link from "next/link";
import { notFound } from "next/navigation";
import Source from "../_lib/Source";
import { getPosts } from "../_lib/db";

export const metadata = { title: "06. Loading & Errors" };

export default async function Page({ searchParams }: PageProps<"/06-loading-error">) {
  const { fail, missing } = await searchParams;
  const posts = await getPosts(); // 800ms: loading.tsx is visible meanwhile.

  if (fail) throw new Error("Boom! Something broke while rendering.");
  if (missing) notFound();

  return (
    <>
      <h1>06. Loading & Errors</h1>

      <div className="demo">
        <p>Loaded {posts.length} posts. Now break things:</p>
        <ul>
          <li><Link href="?fail=1">Throw an error</Link> → error.tsx</li>
          <li><Link href="?missing=1">Call notFound()</Link> → not-found.tsx</li>
          <li><Link href="?reload=1">Reload slowly</Link> → loading.tsx</li>
        </ul>
      </div>

      <Source
        files={[
          "app/06-loading-error/page.tsx",
          "app/06-loading-error/loading.tsx",
          "app/06-loading-error/error.tsx",
          "app/06-loading-error/not-found.tsx",
        ]}
      />
    </>
  );
}
