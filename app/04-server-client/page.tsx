import Figure from "../_lib/Figure";
import Source from "../_lib/Source";
import LikeButton from "./LikeButton";
import Platform from "./Platform";
import Reveal from "./Reveal";
import ServerNote from "./ServerNote";

export const metadata = { title: "04. Server vs Client" };

export default function Page() {
  return (
    <>
      <h1>04. Server vs Client</h1>
      <p>
        Every component runs in one of two places: on the server, or in the browser. Choosing
        well means less JavaScript to download and a faster page.
      </p>

      <h2>Server Components by default</h2>
      <p>
        In the App Router, every component is a <strong>Server Component</strong> unless you say
        otherwise. It runs only on the server, so it can read files, query a database, or use
        secrets. The browser receives the finished HTML and none of the component&apos;s code.
      </p>
      <div className="demo">
        <Platform />
      </div>
      <Source file="app/04-server-client/Platform.tsx" />
      <Figure
        src="server-vs-client.png"
        alt="A kitchen prepares a finished meal on the server side; the diner only gets an interactive salt shaker"
        caption="The server cooks everything it can. Only the interactive parts are sent to the browser."
      />

      <h2>&quot;use client&quot; for interactivity</h2>
      <p>
        Server Components cannot use state, effects, event handlers, or browser APIs. When you need
        them, put <code>&quot;use client&quot;</code> at the top of the file. That makes it a{" "}
        <strong>Client Component</strong>: it is still prerendered to HTML, then its JavaScript is
        sent to the browser to make it interactive.
      </p>
      <div className="demo">
        <LikeButton initialLikes={41} />
      </div>
      <Source file="app/04-server-client/LikeButton.tsx" />
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Server Component</th>
            <th>Client Component</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Database, files, secrets</td>
            <td>Yes</td>
            <td>No</td>
          </tr>
          <tr>
            <td>useState, onClick, useEffect</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>window, localStorage</td>
            <td>No</td>
            <td>Yes</td>
          </tr>
          <tr>
            <td>JavaScript sent to the browser</td>
            <td>None</td>
            <td>The component and its imports</td>
          </tr>
        </tbody>
      </table>

      <h2>The boundary</h2>
      <p>
        <code>&quot;use client&quot;</code> marks a <strong>boundary</strong>: that file and
        everything it imports become client code. So keep it at the leaves of your tree, on the
        button or input that needs it, not on a whole page.
      </p>
      <p>
        A Server Component passes data to a Client Component through props, like{" "}
        <code>initialLikes=&#123;41&#125;</code> above. Props cross the network, so they must be{" "}
        <strong>serializable</strong>: strings, numbers, booleans, plain objects, arrays, Dates, and
        Promises work. Functions and class instances do not.
      </p>

      <h2>Server content inside a Client Component</h2>
      <p>
        A Client Component cannot import a Server Component, but it can receive one as{" "}
        <code>children</code>. The server renders the child; the client only decides whether to show
        it. Click Reveal: the note was rendered on the server.
      </p>
      <div className="demo">
        <Reveal>
          <ServerNote />
        </Reveal>
      </div>
      <Source file="app/04-server-client/Reveal.tsx" />
      <Source
        title="Usage in page.tsx"
        code={`<Reveal>
  <ServerNote />
</Reveal>`}
      />
      <div className="tip">
        <p>
          Add <code>import &quot;server-only&quot;</code> at the top of a module that holds secrets
          or database code. The build then fails if a Client Component ever imports it.
        </p>
      </div>

      <div className="prod">
        <p>
          Only environment variables prefixed with <code>NEXT_PUBLIC_</code> are available in Client
          Components; everything else stays on the server. Keep API keys unprefixed, read them in
          Server Components or Server Actions, and guard those modules with{" "}
          <code>server-only</code>.
        </p>
      </div>
    </>
  );
}
