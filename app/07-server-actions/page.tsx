import { Suspense } from "react";
import Source from "../_lib/Source";
import GuestbookForm from "./GuestbookForm";
import Messages from "./Messages";
import QuickPost from "./QuickPost";

export const metadata = { title: "07. Server Actions" };

export default function Page() {
  return (
    <>
      <h1>07. Server Actions</h1>
      <p>
        Reading data is half of an app. The other half is changing it. A{" "}
        <strong>Server Action</strong> is an async function that runs on the server but can be
        called straight from a form in the browser. No API route, no <code>fetch</code>.
      </p>

      <h2>Mark a function with &quot;use server&quot;</h2>
      <p>
        Put <code>&quot;use server&quot;</code> at the top of a file and every exported function in it
        becomes a Server Action. Under the hood, calling one sends a POST request to your server.
      </p>
      <p>
        That also means anyone can call it. Treat every action like a public API endpoint: validate
        the input and check who is asking.
      </p>
      <Source file="app/07-server-actions/actions.ts" />

      <h2>Call it from a form</h2>
      <p>
        Pass the action to <code>{"<form action>"}</code>. The form data arrives as a{" "}
        <code>FormData</code> object. This form is a Server Component, so it ships no JavaScript and
        works even before the page&apos;s JS has loaded. That is <strong>progressive enhancement</strong>.
      </p>
      <div className="demo">
        <QuickPost />
        <Suspense fallback={<p>Loading messages…</p>}>
          <Messages />
        </Suspense>
      </div>
      <Source file="app/07-server-actions/QuickPost.tsx" />

      <h2>Show the change</h2>
      <p>
        After a mutation, tell Next.js what to re-render. It happens in the same round trip as the
        action, so the user sees the result immediately.
      </p>
      <table>
        <thead>
          <tr>
            <th>Call</th>
            <th>Effect</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>refresh()</code></td>
            <td>Re-render the current page (used here)</td>
          </tr>
          <tr>
            <td><code>revalidatePath(path)</code></td>
            <td>Invalidate everything cached for a URL</td>
          </tr>
          <tr>
            <td><code>updateTag(tag)</code></td>
            <td>Expire cached data by tag (lesson 08)</td>
          </tr>
          <tr>
            <td><code>redirect(url)</code></td>
            <td>Send the user to another page</td>
          </tr>
        </tbody>
      </table>
      <Source file="app/07-server-actions/Messages.tsx" />

      <h2>Pending state and errors</h2>
      <p>
        For a better experience, wrap the action in React&apos;s <code>useActionState</code> inside a
        Client Component. It gives you the value the action last returned (here, a validation error)
        and a <code>pending</code> flag while it runs. Try posting with an empty name.
      </p>
      <div className="demo">
        <GuestbookForm />
      </div>
      <Source file="app/07-server-actions/GuestbookForm.tsx" />
      <div className="tip">
        <p>
          Return expected errors like invalid input as values. Only throw for real failures, which
          the nearest <code>error.tsx</code> will catch (lesson 06).
        </p>
      </div>

      <div className="prod">
        <p>
          Validate input with a schema library such as Zod, check the session inside every action
          (not just in the UI), and redirect after a successful create so a page reload does not
          submit the form twice.
        </p>
      </div>
    </>
  );
}
