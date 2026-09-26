// ─── 04. SERVER vs CLIENT COMPONENTS ────────────────────────────────────────
// Every component is a SERVER Component by default. It:
//   + runs only on the server (can touch files, DBs, secrets)
//   + sends HTML, zero JS for itself
//   - cannot use state, effects, event handlers, or browser APIs
//
// Add "use client" at the top of a file to make it a CLIENT Component. It:
//   + is interactive (useState, onClick, window, …)
//   - is shipped to the browser as JS (it's still prerendered to HTML first)
//
// "use client" marks a boundary: that file AND everything it imports become
// client code. So keep it at the leaves (buttons, inputs), not at the top.

import os from "node:os";
import Source from "../_lib/Source";
import LikeButton from "./LikeButton";
import Reveal from "./Reveal";

export const metadata = { title: "04. Server vs Client" };

export default function Page() {
  // Server-only code: this never reaches the browser.
  const platform = `${os.type()} ${os.arch()}`;

  return (
    <>
      <h1>04. Server vs Client</h1>

      <div className="demo">
        <p>Server Component says: rendered on <code>{platform}</code>.</p>

        {/* Server -> Client: pass data as props. Props must be serializable
            (strings, numbers, plain objects, Dates, Promises…, not functions). */}
        <LikeButton initialLikes={41} />

        {/* A Client Component can wrap Server Components passed as `children`.
            ServerNote still renders on the server; Reveal only toggles it. */}
        <Reveal>
          <ServerNote />
        </Reveal>
      </div>

      <Source
        files={[
          "app/04-server-client/page.tsx",
          "app/04-server-client/LikeButton.tsx",
          "app/04-server-client/Reveal.tsx",
        ]}
      />
    </>
  );
}

function ServerNote() {
  return <p>I am server-rendered content inside a client wrapper.</p>;
}

// Tip: `import "server-only"` (npm package) at the top of a module makes the
// build fail if a Client Component ever imports it. Great for secrets.
