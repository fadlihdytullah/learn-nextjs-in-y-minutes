import Link from "next/link";
import { Suspense } from "react";
import Quiz from "../_lib/Quiz";
import Source from "../_lib/Source";
import BookList from "./BookList";
import Greeting from "./Greeting";

export const metadata = { title: "03. Dynamic Routes" };

export default function Page({ searchParams }: PageProps<"/03-dynamic-routes">) {
  return (
    <>
      <h1>03. Dynamic Routes</h1>
      <p>
        You cannot create a folder for every blog post or product. A{" "}
        <strong>dynamic segment</strong> is a folder whose name is a variable, so one{" "}
        <code>page.tsx</code> serves many URLs.
      </p>

      <h2>Square brackets make a variable</h2>
      <p>
        Wrap a folder name in square brackets and it matches any value in that part of the URL.
        The value is passed to the page by name.
      </p>
      <table>
        <thead>
          <tr>
            <th>Folder</th>
            <th>Matches</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>[slug]</code></td>
            <td><code>/03-dynamic-routes/dune</code>, <code>/03-dynamic-routes/neuromancer</code></td>
          </tr>
          <tr>
            <td><code>[...parts]</code></td>
            <td>Catch-all: <code>/shop/a</code>, <code>/shop/a/b/c</code></td>
          </tr>
          <tr>
            <td><code>[[...parts]]</code></td>
            <td>Optional catch-all: also matches <code>/docs</code> itself</td>
          </tr>
        </tbody>
      </table>
      <div className="demo">
        <BookList />
      </div>
      <Source file="app/03-dynamic-routes/BookList.tsx" />

      <h2>Reading params</h2>
      <p>
        The page receives <code>params</code> as a <strong>Promise</strong>, so the component is{" "}
        <code>async</code> and awaits it. <code>PageProps&lt;&quot;/route&quot;&gt;</code> is a
        generated global type, so <code>slug</code> is typed as a string with no extra work.
      </p>
      <Source file="app/03-dynamic-routes/[slug]/page.tsx" />
      <p>
        If the slug matches no book, <code>notFound()</code> stops rendering and shows the nearest
        not-found page (lesson 06). Try the last link in the demo.
      </p>

      <h2>Prerendering with generateStaticParams</h2>
      <p>
        <code>generateStaticParams</code> in the file above lists the slugs you know at build time.
        Next.js prerenders those pages as static HTML, so they load instantly. Slugs outside the
        list still work: they render on their first request.
      </p>
      <div className="tip">
        <p>
          With Cache Components enabled, as in this project, <code>generateStaticParams</code> must
          return at least one entry.
        </p>
      </div>

      <h2>Search params</h2>
      <p>
        Query strings like <code>?name=Ada</code> are not part of the route. Read them from the{" "}
        <code>searchParams</code> prop, which is also a Promise. Its values can be a string, an
        array (<code>?tag=a&amp;tag=b</code>), or missing, so check the type.
      </p>
      <div className="demo">
        <p>
          <Link href="?name=Ada">?name=Ada</Link> · <Link href="?name=Linus">?name=Linus</Link> ·{" "}
          <Link href="/03-dynamic-routes">clear</Link>
        </p>
        <Suspense fallback={<p>Hello, …</p>}>
          <Greeting searchParams={searchParams} />
        </Suspense>
      </div>
      <Source file="app/03-dynamic-routes/Greeting.tsx" />
      <p>
        Search params only exist when a real request arrives, so the component that reads them sits
        inside <code>&lt;Suspense&gt;</code>. The rest of the page is still prerendered; only the
        greeting is filled in per request.
      </p>

      <div className="prod">
        <p>
          Treat <code>params</code> and <code>searchParams</code> as user input: anyone can type any
          URL. Validate them (for example with a schema library like Zod) before using them in a
          database query, and call <code>notFound()</code> for anything that does not exist.
        </p>
      </div>

      <Quiz
        questions={[
          {
            q: "How does a page read `params`?",
            options: [
              "As a plain object, synchronously",
              "With the `useRouter()` hook",
              "As a Promise, awaited in an `async` component",
            ],
            answer: 2,
            explanation: "`params` is a Promise, so the page is `async` and awaits it.",
          },
          {
            q: "What does `[[...parts]]` match that `[...parts]` does not?",
            options: [
              "The base route itself, like `/docs`",
              "Only a single segment",
              "The query string",
            ],
            answer: 0,
            explanation: "It is an optional catch-all, so zero segments also match.",
          },
          {
            q: "Why does the component that reads `searchParams` sit inside `<Suspense>`?",
            options: [
              "`searchParams` only works in Client Components",
              "Search params only exist when a real request arrives",
              "`<Suspense>` validates the query string",
            ],
            answer: 1,
            explanation: "The rest of the page is prerendered; only that part is filled in per request.",
          },
        ]}
      />
    </>
  );
}
