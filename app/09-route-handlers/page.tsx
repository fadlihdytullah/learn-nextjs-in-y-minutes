import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";
import Caller from "./Caller";

export const metadata = { title: "09. Route Handlers" };

export default function Page() {
  return (
    <>
      <h1>09. Route Handlers</h1>
      <p>
        A <strong>Route Handler</strong> is your own HTTP endpoint, living in the same app as your
        pages. Use it for webhooks, public APIs, mobile app backends, or file downloads.
      </p>

      <h2>route.ts instead of page.tsx</h2>
      <p>
        Put a <code>route.ts</code> file in a folder and that URL answers with data instead of a
        page. Export one function per HTTP method: <code>GET</code>, <code>POST</code>,{" "}
        <code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>, <code>HEAD</code>, or{" "}
        <code>OPTIONS</code>. Any other method gets a <code>405</code>.
      </p>
      <p>
        Handlers use the standard Web <code>Request</code> and <code>Response</code> APIs.{" "}
        <code>Response.json()</code> turns an object into a JSON response.
      </p>
      <div className="demo">
        <p>
          Open it directly:{" "}
          <a href="/09-route-handlers/api/hello?name=Grace">
            /09-route-handlers/api/hello?name=Grace
          </a>
        </p>
      </div>
      <Source file="app/09-route-handlers/api/hello/route.ts" />
      <div className="tip">
        <p>
          A folder can hold a <code>page.tsx</code> or a <code>route.ts</code>, never both. That is
          why this endpoint lives in its own <code>api/hello/</code> folder.
        </p>
      </div>

      <h2>Reading the request</h2>
      <ul>
        <li>
          <strong>Search params</strong>: <code>request.nextUrl.searchParams</code>.{" "}
          <code>NextRequest</code> is a <code>Request</code> with extra helpers like{" "}
          <code>nextUrl</code> and <code>cookies</code>.
        </li>
        <li>
          <strong>JSON body</strong>: <code>await request.json()</code>.
        </li>
        <li>
          <strong>Status codes</strong>: pass <code>{"{ status: 201 }"}</code> as the second
          argument. <code>NextResponse.json()</code> works the same and adds helpers for cookies.
        </li>
      </ul>
      <p>Any client can call the endpoint. Here a Client Component uses plain <code>fetch</code>:</p>
      <div className="demo">
        <Caller />
      </div>
      <Source file="app/09-route-handlers/Caller.tsx" />

      <h2>Caching GET handlers</h2>
      <p>
        With Cache Components, a <code>GET</code> handler follows the same rules as a page. If it
        reads nothing request-specific, it is prerendered at build time. Reading the request (search
        params, headers, body) makes it run on every request. Other methods are never cached.
      </p>
      <p>
        To cache slow data inside a dynamic handler, move it into a helper marked{" "}
        <code>&quot;use cache&quot;</code> (lesson 08). The directive cannot go in the handler body
        itself.
      </p>
      <Source
        title="app/api/products/route.ts"
        lang="ts"
        code={`import { cacheLife } from "next/cache";

export async function GET() {
  return Response.json(await getProducts());
}

async function getProducts() {
  "use cache";
  cacheLife("hours");
  return db.query("SELECT * FROM products");
}`}
      />

      <h2>Route Handler or Server Action?</h2>
      <table>
        <thead>
          <tr>
            <th>You need to…</th>
            <th>Use</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Show data in your own pages</td>
            <td>Fetch it in a Server Component (lesson 05)</td>
          </tr>
          <tr>
            <td>Change data from your own forms and buttons</td>
            <td>A Server Action (lesson 07)</td>
          </tr>
          <tr>
            <td>Serve other clients: webhooks, mobile apps, third parties</td>
            <td>A Route Handler</td>
          </tr>
        </tbody>
      </table>

      <div className="prod">
        <p>
          Treat every Route Handler as a public API: validate the body, check authentication, and
          return clear status codes. Dynamic segments work here too, typed with the global{" "}
          <code>RouteContext</code> helper:
        </p>
        <Source
          title="app/api/users/[id]/route.ts"
          lang="ts"
          code={`export async function GET(request: Request, ctx: RouteContext<"/api/users/[id]">) {
  const { id } = await ctx.params;
  return Response.json({ id });
}`}
        />
      </div>

      <Quiz
        questions={[
          {
            q: "How do you make a `route.ts` answer POST requests?",
            options: [
              "Export a function named `POST`",
              "Add `method: \"POST\"` to the config",
              "Handle every method in a default export",
            ],
            answer: 0,
            explanation: "Export one function per HTTP method. Any other method gets a `405`.",
          },
          {
            q: "Can one folder hold both a `page.tsx` and a `route.ts`?",
            options: [
              "Yes, the page wins",
              "No, never both",
              "Yes, but only for GET",
            ],
            answer: 1,
            explanation: "That is why the demo endpoint lives in its own `api/hello/` folder.",
          },
          {
            q: "When should you use a Route Handler instead of a Server Action?",
            options: [
              "To change data from your own forms",
              "To show data in your own pages",
              "To serve webhooks, mobile apps, or third parties",
            ],
            answer: 2,
            explanation: "Your own forms and buttons are better served by Server Actions.",
          },
        ]}
      />
    </>
  );
}
