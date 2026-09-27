import { Suspense } from "react";
import Figure from "../_lib/Figure";
import Source from "../_lib/Source";
import CachedClock from "./CachedClock";
import LiveClock from "./LiveClock";
import LuckyNumber from "./LuckyNumber";
import { invalidateClock } from "./actions";

export const metadata = { title: "08. Caching" };

export default function Page() {
  return (
    <>
      <h1>08. Caching</h1>
      <p>
        Caching means doing work once and reusing the result. Next.js 16 makes it explicit with{" "}
        <strong>Cache Components</strong>: you decide what is cached, right where the work happens.
      </p>

      <h2>Three rules</h2>
      <ol>
        <li>Nothing is cached unless you say so.</li>
        <li>
          Say so with <code>&quot;use cache&quot;</code> on a component or function.
        </li>
        <li>
          Uncached async work must sit inside <code>{"<Suspense>"}</code>, so it can stream in at
          request time.
        </li>
      </ol>
      <Figure
        src="caching.png"
        alt="A cook fills containers once and hands them out, while one dish is cooked to order"
        caption="Cached work is done once and reused. Dynamic work is done for every request."
      />
      <p>The model is switched on with one flag:</p>
      <Source file="next.config.ts" />

      <h2>&quot;use cache&quot;</h2>
      <p>
        Add <code>&quot;use cache&quot;</code> as the first line of an async component. It renders
        once and the result is reused for everyone until it expires. <code>cacheLife</code> sets how
        long. Reload the page: the time does not change.
      </p>
      <div className="demo">
        <CachedClock />
      </div>
      <Source file="app/08-caching/CachedClock.tsx" />
      <table>
        <thead>
          <tr>
            <th>Preset</th>
            <th>Refreshes after</th>
            <th>Good for</th>
          </tr>
        </thead>
        <tbody>
          <tr><td><code>seconds</code></td><td>1 second</td><td>Live scores, prices</td></tr>
          <tr><td><code>minutes</code></td><td>1 minute</td><td>Feeds, news</td></tr>
          <tr><td><code>hours</code></td><td>1 hour</td><td>Content updated a few times a day</td></tr>
          <tr><td><code>days</code></td><td>1 day</td><td>Blog posts</td></tr>
          <tr><td><code>weeks</code></td><td>1 week</td><td>Rarely edited pages</td></tr>
          <tr><td><code>max</code></td><td>30 days</td><td>Content that almost never changes</td></tr>
        </tbody>
      </table>

      <h2>Dynamic work streams in</h2>
      <p>
        Some work must happen on every request. <code>await connection()</code> says &quot;wait for a
        real request&quot;. Reading <code>cookies()</code>, <code>headers()</code>, or{" "}
        <code>searchParams</code> does the same. Wrap that component in <code>{"<Suspense>"}</code>.
      </p>
      <div className="demo">
        <Suspense fallback={<p>Live time: …</p>}>
          <LiveClock />
        </Suspense>
      </div>
      <Source file="app/08-caching/LiveClock.tsx" />

      <h2>The static shell</h2>
      <p>
        At build time, Next.js prerenders a <strong>static shell</strong>: plain markup, cached
        parts, and the Suspense fallbacks. The shell is sent instantly and the dynamic holes stream
        in afterwards. This is called <strong>Partial Prerendering</strong>. This page is exactly
        that: everything is in the shell except the live time.
      </p>

      <h2>Caching data</h2>
      <p>
        <code>&quot;use cache&quot;</code> also works on plain async functions, such as a database
        query. Any component can call the function and gets the cached result.
      </p>
      <div className="demo">
        <LuckyNumber />
      </div>
      <Source file="app/08-caching/data.ts" />

      <h2>Invalidate with tags</h2>
      <p>
        <code>cacheTag</code> labels cached entries. Calling <code>updateTag</code> from a Server
        Action expires every entry with that label at once, and the page re-renders with fresh
        values in the same round trip. Both the clock and the lucky number use the tag{" "}
        <code>&quot;clock&quot;</code>.
      </p>
      <div className="demo">
        <CachedClock />
        <LuckyNumber />
        <form action={invalidateClock}>
          <button>updateTag(&quot;clock&quot;)</button>
        </form>
      </div>
      <Source file="app/08-caching/actions.ts" />
      <div className="tip">
        <p>
          <code>updateTag</code> only works in Server Actions. From a Route Handler, such as a CMS
          webhook, use <code>revalidateTag(tag, &quot;max&quot;)</code>: it serves the old value while
          a fresh one is generated in the background.
        </p>
      </div>

      <div className="prod">
        <p>
          Cache at the data layer and tag by entity, for example <code>cacheTag(&quot;product-42&quot;)</code>.
          Never cache anything user-specific in a shared <code>&quot;use cache&quot;</code> scope, or
          one user&apos;s data can be served to another.
        </p>
      </div>
    </>
  );
}
