// ─── 05. DATA FETCHING ──────────────────────────────────────────────────────
// No getServerSideProps, no useEffect: Server Components can be `async`.
// Just await your data (DB query, fetch, file read) right in the component.
//
//   async function Posts() {
//     const res = await fetch("https://api.example.com/posts"); // not cached by default
//     const posts = await res.json();
//     ...
//   }
//
// Slow data + <Suspense> = streaming: the page shell is sent immediately, and
// each Suspense boundary fills in as its data arrives.

import { Suspense } from "react";
import Source from "../_lib/Source";
import { getMessages, getPosts } from "../_lib/db";
import MessageCount from "./MessageCount";

export const metadata = { title: "05. Data Fetching" };

export default function Page() {
  // Pattern 2: start the request here, DON'T await it, and hand the Promise to a
  // Client Component. It unwraps it with React's `use()`.
  const messagesPromise = getMessages();

  return (
    <>
      <h1>05. Data Fetching</h1>

      <div className="demo">
        {/* Reload the page: the heading shows instantly, the data streams in. */}
        <Suspense fallback={<p>Loading posts… (800ms)</p>}>
          <Posts />
        </Suspense>

        <Suspense fallback={<p>Counting messages…</p>}>
          <MessageCount messagesPromise={messagesPromise} />
        </Suspense>
      </div>

      <Source
        files={[
          "app/05-data-fetching/page.tsx",
          "app/05-data-fetching/MessageCount.tsx",
          "app/_lib/db.ts",
        ]}
      />
    </>
  );
}

// Pattern 1: an async Server Component awaits its own data.
async function Posts() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.slug}>
          <strong>{p.title}</strong>: {p.body}
        </li>
      ))}
    </ul>
  );
}

// Need several things at once? Don't await one after another (waterfall):
//   const [posts, messages] = await Promise.all([getPosts(), getMessages()]);
