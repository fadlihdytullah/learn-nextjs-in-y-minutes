// ─── 07. SERVER ACTIONS ─────────────────────────────────────────────────────
// Mutations without writing an API: an async function marked "use server" can be
// called from a form (or an onClick) in the browser and runs on the server.
//
//   page (server) ──renders──▶ <GuestbookForm> (client)
//        ▲                            │ submit
//        │ refresh()                  ▼
//        └──────────────── postMessage() in actions.ts (server)
//
// After mutating, tell Next.js what to re-render:
//   refresh()           re-render the current page
//   revalidatePath(p)   invalidate everything cached for a path
//   updateTag(t)        invalidate cached data by tag (lesson 08)
//   redirect(url)       send the user elsewhere

import { Suspense } from "react";
import Source from "../_lib/Source";
import { getMessages } from "../_lib/db";
import GuestbookForm from "./GuestbookForm";

export const metadata = { title: "07. Server Actions" };

export default function Page() {
  return (
    <>
      <h1>07. Server Actions</h1>

      <div className="demo">
        <GuestbookForm />
        <Suspense fallback={<p>Loading messages…</p>}>
          <Messages />
        </Suspense>
      </div>

      <Source
        files={[
          "app/07-server-actions/page.tsx",
          "app/07-server-actions/GuestbookForm.tsx",
          "app/07-server-actions/actions.ts",
        ]}
      />
    </>
  );
}

async function Messages() {
  const messages = await getMessages();
  return (
    <ul>
      {messages.map((m) => (
        <li key={m.id}>
          <strong>{m.name}</strong>: {m.text}
        </li>
      ))}
    </ul>
  );
}
