import { Suspense } from "react";
import Figure from "../_lib/Figure";
import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";
import { getMessages } from "../_lib/db";
import MessageCount from "./MessageCount";
import Posts from "./Posts";
import Timing from "./Timing";

export const metadata = { title: "05. Data Fetching" };

export default function Page() {
  const messagesPromise = getMessages();

  return (
    <>
      <h1>05. Data Fetching</h1>
      <p>
        No <code>useEffect</code>, no loading flags, no separate API. A Server Component can be{" "}
        <code>async</code> and simply await its data. The demos read from a fake database in{" "}
        <code>app/_lib/db.ts</code> that adds an artificial delay, like real I/O.
      </p>

      <h2>Async Server Components</h2>
      <p>
        Mark the component <code>async</code>, await a database query, a <code>fetch</code>, or a
        file read, then return JSX. The query runs on the server, so credentials never reach the
        browser.
      </p>
      <div className="demo">
        <Suspense fallback={<p>Loading posts… (800ms)</p>}>
          <Posts />
        </Suspense>
      </div>
      <Source file="app/05-data-fetching/Posts.tsx" />

      <h2>Streaming with Suspense</h2>
      <p>
        Slow data should not block the whole page. Wrap the slow component in{" "}
        <code>&lt;Suspense&gt;</code>: Next.js sends the rest of the page right away with the{" "}
        <strong>fallback</strong> in its place, then <strong>streams</strong> the real content in
        when it is ready. Reload this page to watch the posts arrive after the heading.
      </p>
      <Source
        title="Usage in page.tsx"
        code={`<Suspense fallback={<p>Loading posts… (800ms)</p>}>
  <Posts />
</Suspense>`}
      />
      <Figure
        src="streaming.png"
        alt="A table is set instantly with one empty plate, and the dish arrives later to fill it"
        caption="The shell arrives first. Each Suspense boundary fills in when its data is ready."
      />

      <h2>Sequential vs parallel</h2>
      <p>
        Awaiting one request after another creates a <strong>waterfall</strong>: the second request
        only starts when the first finishes. When requests do not depend on each other, start them
        together with <code>Promise.all</code>. The total time becomes the slowest request instead
        of the sum.
      </p>
      <div className="demo">
        <Suspense fallback={<p>Measuring… (about 2 seconds)</p>}>
          <Timing />
        </Suspense>
      </div>
      <Source file="app/05-data-fetching/Timing.tsx" />
      <p>
        <code>connection()</code> tells Next.js to wait for a real request, so the timing is
        measured fresh on every reload instead of once at build time (more in lesson 08).
      </p>

      <h2>Passing a promise to the client</h2>
      <p>
        A Server Component can start a request without awaiting it and pass the{" "}
        <strong>Promise</strong> to a Client Component as a prop. The client unwraps it with
        React&apos;s <code>use()</code>, which suspends until the data arrives. The request starts
        early on the server, but the value is used in interactive UI.
      </p>
      <div className="demo">
        <Suspense fallback={<p>Counting messages…</p>}>
          <MessageCount messagesPromise={messagesPromise} />
        </Suspense>
      </div>
      <Source file="app/05-data-fetching/MessageCount.tsx" />
      <Source
        title="Usage in page.tsx"
        code={`const messagesPromise = getMessages();

<Suspense fallback={<p>Counting messages…</p>}>
  <MessageCount messagesPromise={messagesPromise} />
</Suspense>`}
      />

      <div className="prod">
        <p>
          Keep data access in one server-only module (a small data layer) instead of querying the
          database from every component. Fetch data in the component that needs it, avoid waterfalls
          with <code>Promise.all</code>, and remember that <code>fetch</code> is not cached unless
          you opt in with <code>&quot;use cache&quot;</code> (lesson 08).
        </p>
      </div>

      <Quiz
        questions={[
          {
            q: "What does wrapping a slow component in `<Suspense>` do?",
            options: [
              "Caches its data for later requests",
              "Sends the rest of the page first, then streams the component in",
              "Moves the component to the browser",
            ],
            answer: 1,
            explanation: "The fallback shows in its place until the real content is ready.",
          },
          {
            q: "Two independent requests are awaited one after another. How do you speed it up?",
            options: [
              "Start them together with `Promise.all`",
              "Move them into `useEffect`",
              "Add `\"use client\"` to the component",
            ],
            answer: 0,
            explanation: "The total time becomes the slowest request instead of the sum.",
          },
          {
            q: "How does a Client Component read a Promise passed from the server?",
            options: [
              "With `await` in the component body",
              "With `useEffect` and state",
              "With React's `use()`",
            ],
            answer: 2,
            explanation: "`use()` suspends until the data arrives.",
          },
        ]}
      />
    </>
  );
}
