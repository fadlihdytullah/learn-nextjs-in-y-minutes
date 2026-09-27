import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Source from "../_lib/Source";

export const metadata: Metadata = {
  title: "11. Metadata",
  description: "How Next.js builds <title>, <meta> and social previews.",
  openGraph: { type: "article" },
};

export default function Page() {
  return (
    <>
      <h1>11. Metadata</h1>
      <p>
        <strong>Metadata</strong> is what goes in the page&apos;s <code>{"<head>"}</code>: the tab
        title, the description search engines show, and the preview card social apps display. In
        Next.js you describe it, and the framework writes the tags.
      </p>

      <h2>Static metadata</h2>
      <p>
        Export a <code>metadata</code> object from any <code>page.tsx</code> or{" "}
        <code>layout.tsx</code>. Child segments merge with their parents and override matching
        fields. This page exports:
      </p>
      <Source
        title="app/11-metadata/page.tsx"
        code={`export const metadata: Metadata = {
  title: "11. Metadata",
  description: "How Next.js builds <title>, <meta> and social previews.",
  openGraph: { type: "article" },
};`}
      />
      <div className="demo">
        <p>Look at the browser tab, or open View Source and find the tags in the head.</p>
      </div>

      <h2>Title templates</h2>
      <p>
        The tab does not say just &quot;11. Metadata&quot;. The root layout defines a{" "}
        <strong>template</strong>, and <code>%s</code> is replaced by each page&apos;s own title.
        Pages without a title get the <code>default</code>.
      </p>
      <Source
        title="app/layout.tsx"
        code={`export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Learn Next.js in Y Minutes",
    template: "%s | Learn Next.js in Y Minutes",
  },
};`}
      />

      <h2>Metadata from data</h2>
      <p>
        When the title depends on the URL or a database, export an async{" "}
        <code>generateMetadata</code> function instead. It receives the same <code>params</code> as
        the page.
      </p>
      <div className="demo">
        <p>
          Open <Link href="/11-metadata/topics/routing">/topics/routing</Link> or{" "}
          <Link href="/11-metadata/topics/caching">/topics/caching</Link> and watch the tab title.
        </p>
      </div>
      <Source file="app/11-metadata/topics/[topic]/page.tsx" />

      <h2>Generated social images</h2>
      <p>
        A file named <code>opengraph-image.tsx</code> renders JSX to a PNG. Next.js links it as{" "}
        <code>og:image</code> for its segment and every segment below it. Social apps need absolute
        URLs, which is why the root layout sets <code>metadataBase</code>.
      </p>
      <div className="demo">
        <Image
          src="/11-metadata/opengraph-image"
          alt="Generated OG image"
          width={600}
          height={315}
          unoptimized
        />
      </div>
      <Source file="app/11-metadata/opengraph-image.tsx" />

      <h2>Other metadata files</h2>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Produces</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>favicon.ico</code>, <code>icon.png</code></td>
            <td>Browser tab icon</td>
          </tr>
          <tr>
            <td><code>opengraph-image.png</code> or <code>.tsx</code></td>
            <td>Social preview image</td>
          </tr>
          <tr>
            <td><code>app/sitemap.ts</code></td>
            <td><code>/sitemap.xml</code> for search engines</td>
          </tr>
          <tr>
            <td><code>app/robots.ts</code></td>
            <td><code>/robots.txt</code></td>
          </tr>
        </tbody>
      </table>

      <div className="prod">
        <p>
          Give every public page a unique title and description. When{" "}
          <code>generateMetadata</code> and the page need the same record, wrap the query in
          React&apos;s <code>cache()</code> so it runs once per request. Set <code>SITE_URL</code>{" "}
          on deploy, or preview cards will point at localhost.
        </p>
      </div>
    </>
  );
}
