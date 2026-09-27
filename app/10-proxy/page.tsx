import Link from "next/link";
import { Suspense } from "react";
import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";
import Greeting from "./Greeting";

export const metadata = { title: "10. Proxy" };

const branches = [
  { y: 8, label: "redirect", note: "browser goes to a new URL" },
  { y: 78, label: "rewrite", note: "other route, same URL" },
  { y: 148, label: "next()", note: "matched route, extra headers" },
];

export default function Page() {
  return (
    <>
      <h1>10. Proxy</h1>
      <p>
        A <strong>proxy</strong> is code that runs before a request reaches your routes. It can
        redirect, rewrite, change headers, or answer directly. Before Next.js 16 this file was
        called <code>middleware.ts</code>.
      </p>

      <h2>One file, before every request</h2>
      <p>
        Create <code>proxy.ts</code> in the project root, next to <code>app/</code>. There is one per
        project. It exports a <code>proxy</code> function that receives the request and decides
        what happens next.
      </p>
      <figure className="figure">
        <svg viewBox="0 0 760 200" role="img" aria-label="A request goes through proxy.ts, which redirects, rewrites, or passes it on to the route">
          <g fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="1" y="78" width="130" height="44" rx="8" />
            <rect x="200" y="78" width="140" height="44" rx="8" stroke="var(--accent)" />
            {branches.map((b) => (
              <rect key={b.label} x="470" y={b.y} width="289" height="44" rx="8" />
            ))}
            <path d="M135 100h59m-8-5 8 5-8 5" />
            {branches.map((b) => (
              <path key={b.label} d={`M344 100L464 ${b.y + 22}`} />
            ))}
          </g>
          <g fill="currentColor" fontSize="13">
            <text x="66" y="104" textAnchor="middle" fill="var(--fg)">browser</text>
            <text x="270" y="104" textAnchor="middle" fill="var(--fg)">proxy.ts</text>
            {branches.map((b) => (
              <text key={b.label} x="486" y={b.y + 27}>
                <tspan fill="var(--fg)">{b.label}</tspan>
                <tspan dx="12" fontSize="12">{b.note}</tspan>
              </text>
            ))}
          </g>
        </svg>
      </figure>
      <Source file="proxy.ts" />

      <h2>Redirect vs rewrite</h2>
      <ul>
        <li>
          <strong>Redirect</strong> tells the browser to go to another URL. The address bar changes.
        </li>
        <li>
          <strong>Rewrite</strong> serves another route but keeps the original URL. The user never
          sees the switch.
        </li>
      </ul>
      <div className="demo">
        <ul>
          <li>
            <Link href="/10-proxy/old">/10-proxy/old</Link> → redirected to /10-proxy/new
          </li>
          <li>
            <Link href="/10-proxy/masked">/10-proxy/masked</Link> → shows /10-proxy/new, URL stays
          </li>
        </ul>
      </div>
      <div className="tip">
        <p>
          Redirects that never change, like an old blog URL, do not need a proxy. Put them in{" "}
          <code>redirects()</code> in <code>next.config.ts</code>.
        </p>
      </div>

      <h2>Passing data to the page</h2>
      <p>
        <code>NextResponse.next()</code> lets the request continue. Pass modified request headers
        and the page can read them with <code>headers()</code>. That is request-time data, so the
        component sits inside <code>{"<Suspense>"}</code> (lesson 05).
      </p>
      <div className="demo">
        <Suspense fallback={<p>Reading headers…</p>}>
          <Greeting />
        </Suspense>
      </div>
      <Source file="app/10-proxy/Greeting.tsx" />

      <h2>Matcher</h2>
      <p>
        The <code>matcher</code> config limits which paths the proxy runs on. Without it, the proxy
        runs on every request, including JavaScript, CSS, and images. Use a string, an array, or a
        pattern that excludes paths:
      </p>
      <Source
        title="proxy.ts"
        lang="ts"
        code={`export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};`}
      />

      <div className="prod">
        <p>
          Keep the proxy fast and small: it runs on every matched request. Good uses are A/B test
          rewrites, locale redirects, and quick &quot;is there a session cookie?&quot; checks. Real
          authorization belongs next to the data, in your pages, Server Actions, and Route Handlers.
        </p>
      </div>

      <Quiz
        questions={[
          {
            q: "What was `proxy.ts` called before Next.js 16?",
            options: [
              "`server.ts`",
              "`middleware.ts`",
              "`handler.ts`",
            ],
            answer: 1,
            explanation: "Same idea, new name: code that runs before a request reaches your routes.",
          },
          {
            q: "How does a rewrite differ from a redirect?",
            options: [
              "A rewrite keeps the original URL; a redirect changes it",
              "A redirect keeps the original URL; a rewrite changes it",
              "A rewrite only works for images",
            ],
            answer: 0,
            explanation: "A redirect tells the browser to go elsewhere, so the address bar changes.",
          },
          {
            q: "What happens if the proxy has no `matcher`?",
            options: [
              "It never runs",
              "It runs only on pages",
              "It runs on every request, including JavaScript, CSS, and images",
            ],
            answer: 2,
            explanation: "The `matcher` limits which paths the proxy runs on.",
          },
        ]}
      />
    </>
  );
}
