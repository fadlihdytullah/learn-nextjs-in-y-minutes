import Link from "next/link";
import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";
import Posts from "./Posts";

export const metadata = { title: "06. Loading & Errors" };

const layers = [
  { file: "layout.tsx", role: "always stays on screen" },
  { file: "error.tsx", role: "error boundary: catches thrown errors" },
  { file: "loading.tsx", role: "Suspense boundary: shows while waiting" },
  { file: "not-found.tsx", role: "shown when notFound() is called" },
  { file: "page.tsx", role: "your content" },
];

export default function Page({ searchParams }: PageProps<"/06-loading-error">) {
  return (
    <>
      <h1>06. Loading & Errors</h1>
      <p>
        Pages are not always happy. Data can be slow, code can throw, and records can be missing.
        Next.js handles each case with a <strong>special file</strong> placed next to{" "}
        <code>page.tsx</code>, so you never wire up the boundaries yourself.
      </p>

      <h2>How the files nest</h2>
      <p>
        Next.js wraps your page in React boundaries, one per special file. An error or a loading
        state replaces only what sits <em>inside</em> its boundary, so the layout and the sidebar
        keep working.
      </p>
      <figure className="figure">
        <svg viewBox="0 0 760 250" role="img" aria-label="layout wraps error boundary, which wraps loading, which wraps not-found, which wraps page">
          {layers.map((l, i) => {
            const inset = i * 26;
            const isPage = l.file === "page.tsx";
            return (
              <g key={l.file}>
                <rect
                  x={1 + inset}
                  y={1 + inset}
                  width={758 - inset * 2}
                  height={248 - inset * 2}
                  rx="8"
                  fill="none"
                  stroke={isPage ? "var(--accent)" : "currentColor"}
                  strokeWidth="1.2"
                />
                <text x={14 + inset} y={19 + inset} fontSize="13" fill="var(--fg)">
                  {l.file}
                  <tspan fill="currentColor" fontSize="12">{`  ${l.role}`}</tspan>
                </text>
              </g>
            );
          })}
        </svg>
      </figure>
      <p>
        This page reads its data in <code>Posts</code>, which waits 800ms and can be told to fail.
      </p>
      <div className="demo">
        <Posts searchParams={searchParams} />
      </div>
      <Source file="app/06-loading-error/Posts.tsx" />

      <h2>loading.tsx</h2>
      <p>
        While the page is waiting for data, Next.js shows <code>loading.tsx</code> instantly. It is
        the same as wrapping the page in <code>{"<Suspense fallback={<Loading />}>"}</code>. You saw
        it when you opened this lesson.
      </p>
      <div className="demo">
        <Link href="?reload=1">Reload slowly</Link>
      </div>
      <Source file="app/06-loading-error/loading.tsx" />

      <h2>error.tsx</h2>
      <p>
        When rendering throws, <code>error.tsx</code> takes the page&apos;s place. It must be a{" "}
        <strong>Client Component</strong>, because error boundaries run in the browser. It gets the{" "}
        <code>error</code> and a <code>retry()</code> function that renders the segment again.
      </p>
      <div className="demo">
        <Link href="?fail=1">Throw an error</Link>
      </div>
      <Source file="app/06-loading-error/error.tsx" />
      <div className="tip">
        <p>
          In production, server error messages are hidden so internals never leak. Log{" "}
          <code>error.digest</code> instead: it matches the entry in your server logs.
        </p>
      </div>

      <h2>not-found.tsx</h2>
      <p>
        Call <code>notFound()</code> when a record does not exist, and <code>not-found.tsx</code>{" "}
        renders. The status is 404, or 200 if the response had already started streaming, like here
        behind <code>loading.tsx</code>.
      </p>
      <div className="demo">
        <Link href="?missing=1">Call notFound()</Link>
      </div>
      <Source file="app/06-loading-error/not-found.tsx" />

      <h2>Expected vs unexpected</h2>
      <ul>
        <li>
          <strong>Expected</strong> problems (bad form input, missing record): return them as values
          or call <code>notFound()</code>.
        </li>
        <li>
          <strong>Unexpected</strong> problems (bugs, outages): let them throw and let{" "}
          <code>error.tsx</code> catch them.
        </li>
        <li>
          If even the root layout crashes, <code>app/global-error.tsx</code> is the last resort.
        </li>
      </ul>

      <div className="prod">
        <p>
          Report errors to a monitoring service (Sentry, Datadog) from <code>error.tsx</code> or{" "}
          <code>instrumentation.ts</code>, and add a <code>global-error.tsx</code> so a crash in the
          root layout still shows a friendly page instead of a blank screen.
        </p>
      </div>

      <Quiz
        questions={[
          {
            q: "`loading.tsx` works the same as wrapping the page in what?",
            options: [
              "An error boundary",
              "`<Suspense>` with the loading UI as fallback",
              "A second layout",
            ],
            answer: 1,
            explanation: "Next.js shows it instantly while the page waits for data.",
          },
          {
            q: "Why must `error.tsx` be a Client Component?",
            options: [
              "Error boundaries run in the browser",
              "It needs to read cookies",
              "Server Components cannot render text",
            ],
            answer: 0,
            explanation: "It receives the `error` and a `retry()` function that renders the segment again.",
          },
          {
            q: "A record the user asked for does not exist. What should the page do?",
            options: [
              "Throw an error for `error.tsx` to catch",
              "Return an empty page",
              "Call `notFound()`",
            ],
            answer: 2,
            explanation: "A missing record is an expected problem, so `not-found.tsx` renders instead.",
          },
        ]}
      />
    </>
  );
}
