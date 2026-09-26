// ─── 03. DYNAMIC ROUTES ─────────────────────────────────────────────────────
// Square brackets turn a folder into a variable:
//
//   app/03-dynamic-routes/[slug]/page.tsx   ->  /03-dynamic-routes/dune, /…/neuromancer
//   app/shop/[...parts]/page.tsx            ->  /shop/a, /shop/a/b/c   (catch-all)
//   app/docs/[[...parts]]/page.tsx          ->  also matches /docs     (optional catch-all)
//
// Query strings (?name=Ada) are not part of the route; read them via `searchParams`.

import Link from "next/link";
import { Suspense } from "react";
import Source from "../_lib/Source";
import { books } from "./data";

export const metadata = { title: "03. Dynamic Routes" };

// Both `params` and `searchParams` are Promises (since Next.js 15): await them.
// `PageProps<"/route">` is a generated global type, fully typed for your route.
export default function Page({ searchParams }: PageProps<"/03-dynamic-routes">) {
  return (
    <>
      <h1>03. Dynamic Routes</h1>

      <div className="demo">
        <ul>
          {books.map((b) => (
            <li key={b.slug}>
              <Link href={`/03-dynamic-routes/${b.slug}`}>{b.title}</Link>
            </li>
          ))}
          <li>
            <Link href="/03-dynamic-routes/nope">A book that doesn&apos;t exist</Link>
          </li>
        </ul>

        <p>
          Search params: <Link href="?name=Ada">?name=Ada</Link> ·{" "}
          <Link href="?name=Linus">?name=Linus</Link> ·{" "}
          <Link href="/03-dynamic-routes">clear</Link>
        </p>

        {/* searchParams only exist at request time, so the part that reads them
            must sit inside <Suspense>. Everything else is prerendered. */}
        <Suspense fallback={<p>Hello, …</p>}>
          <Greeting searchParams={searchParams} />
        </Suspense>
      </div>

      <Source
        files={[
          "app/03-dynamic-routes/page.tsx",
          "app/03-dynamic-routes/[slug]/page.tsx",
        ]}
      />
    </>
  );
}

async function Greeting({
  searchParams,
}: Pick<PageProps<"/03-dynamic-routes">, "searchParams">) {
  const { name } = await searchParams; // string | string[] | undefined
  return <p>Hello, {typeof name === "string" ? name : "stranger"}!</p>;
}
