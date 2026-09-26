// ─── 11. METADATA ───────────────────────────────────────────────────────────
// Export `metadata` from any page or layout; Next.js builds the <head> for you.
// Nested segments merge with (and override) their parents.

import type { Metadata } from "next";
import Source from "../_lib/Source";

export const metadata: Metadata = {
  title: "11. Metadata", // Root layout's template turns this into "11. Metadata | Learn Next.js in Y Minutes"
  description: "How Next.js builds <title>, <meta> and social previews.",
  openGraph: { type: "article" },
};

// Metadata that depends on data? Export a function instead:
//   export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
//     const post = await getPost((await params).slug);
//     return { title: post.title };
//   }
//
// File conventions do the rest (put them in any segment):
//   favicon.ico, icon.png            browser tab icon
//   opengraph-image.(png|tsx)        social preview image (see below)
//   app/sitemap.ts, app/robots.ts    generated sitemap.xml / robots.txt

export default function Page() {
  return (
    <>
      <h1>11. Metadata</h1>

      <div className="demo">
        <p>Look at the browser tab title, or View Source → &lt;head&gt;.</p>
        <p>
          This preview is generated from JSX by <code>opengraph-image.tsx</code> and
          linked as <code>og:image</code> automatically:
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element -- showing the raw generated file */}
        <img src="/11-metadata/opengraph-image" alt="Generated OG image" width={600} height={315} />
      </div>

      <Source files={["app/11-metadata/page.tsx", "app/11-metadata/opengraph-image.tsx"]} />
    </>
  );
}
