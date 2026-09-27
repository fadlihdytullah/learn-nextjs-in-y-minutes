import Link from "next/link";
import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";
import Greeting from "./Greeting";

export const metadata = { title: "01. Routing" };

const rows = [
  { file: "app/page.tsx", url: "/" },
  { file: "app/01-routing/page.tsx", url: "/01-routing" },
  { file: "app/01-routing/nested/page.tsx", url: "/01-routing/nested" },
  { file: "app/01-routing/Greeting.tsx", url: null },
];

export default function RoutingPage() {
  return (
    <>
      <h1>01. Routing</h1>
      <p>
        Next.js has no router config. The <strong>file system is the router</strong>: every route
        lives in the <code>app/</code> folder, and its path on disk becomes its URL.
      </p>

      <h2>Folders become URLs</h2>
      <p>
        Each folder inside <code>app/</code> is one <strong>URL segment</strong>. Nest folders to
        nest URLs. A folder only becomes a public page once it contains a <code>page.tsx</code>.
      </p>
      <figure className="figure">
        <svg viewBox="0 0 760 190" role="img" aria-label="Each page.tsx file maps to a URL; other files get no URL">
          {rows.map((r, i) => {
            const y = 30 + i * 42;
            return (
              <g key={r.file} fontSize="13">
                <text x="0" y={y} fill={r.url ? "var(--fg)" : "currentColor"}>{r.file}</text>
                <path
                  d={`M340 ${y - 4}h180m-8-5 8 5-8 5`}
                  fill="none"
                  stroke={r.url ? "currentColor" : "var(--border-strong)"}
                  strokeDasharray={r.url ? undefined : "4 4"}
                />
                <text x="540" y={y} fill={r.url ? "var(--accent)" : "currentColor"}>
                  {r.url ?? "no URL"}
                </text>
              </g>
            );
          })}
        </svg>
      </figure>

      <h2>A page is a component</h2>
      <p>
        A <code>page.tsx</code> default-exports a React component. That is the whole contract. Use{" "}
        <code>{"<Link>"}</code> to move between pages without a full reload (more in lesson 02).
      </p>
      <div className="demo">
        <p>
          You are on <code>/01-routing</code>.
        </p>
        <p>
          Go deeper: <Link href="/01-routing/nested">/01-routing/nested</Link>
        </p>
      </div>
      <Source file="app/01-routing/nested/page.tsx" />

      <h2>Colocation</h2>
      <p>
        Only <code>page.tsx</code> (and <code>route.ts</code>, lesson 09) is routable. Any other file
        in the folder is private, so components and helpers can live right next to the page that
        uses them.
      </p>
      <div className="demo">
        <Greeting name="Ada" />
      </div>
      <Source file="app/01-routing/Greeting.tsx" />

      <h2>Special folder names</h2>
      <table>
        <thead>
          <tr>
            <th>Folder</th>
            <th>Meaning</th>
            <th>Example</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>_lib</code></td>
            <td>Private: never a route, even with a page.tsx inside</td>
            <td>This project keeps helpers in <code>app/_lib/</code></td>
          </tr>
          <tr>
            <td><code>(marketing)</code></td>
            <td>Route group: organizes files without adding a URL segment</td>
            <td><code>app/(marketing)/about/page.tsx</code> → <code>/about</code></td>
          </tr>
          <tr>
            <td><code>[slug]</code></td>
            <td>Dynamic segment: matches any value</td>
            <td>Lesson 03</td>
          </tr>
        </tbody>
      </table>

      <div className="prod">
        <p>
          Real apps use route groups to split areas that need different layouts, like{" "}
          <code>(marketing)</code> for public pages and <code>(dashboard)</code> for signed-in pages,
          while keeping clean URLs. Keep shared components in a private folder such as{" "}
          <code>app/_components</code> or outside <code>app/</code> entirely.
        </p>
      </div>

      <Quiz
        questions={[
          {
            q: "When does a folder inside `app/` become a public page?",
            options: [
              "As soon as the folder exists",
              "Once it contains a `page.tsx`",
              "Once it is added to a router config",
            ],
            answer: 1,
            explanation: "Folders are URL segments, but only a `page.tsx` makes one public.",
          },
          {
            q: "What happens to a `Greeting.tsx` placed next to `page.tsx`?",
            options: [
              "It stays private and gets no URL",
              "It becomes the route `/01-routing/Greeting`",
              "It causes a build error",
            ],
            answer: 0,
            explanation: "Only `page.tsx` and `route.ts` are routable, so components can live next to the page.",
          },
          {
            q: "What does a folder named `(marketing)` do?",
            options: [
              "Makes every page inside it private",
              "Matches any value in that part of the URL",
              "Groups files without adding a URL segment",
            ],
            answer: 2,
            explanation: "`app/(marketing)/about/page.tsx` is served at `/about`.",
          },
        ]}
      />
    </>
  );
}
