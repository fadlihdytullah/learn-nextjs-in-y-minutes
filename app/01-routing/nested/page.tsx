// Nested folder = nested URL. No config, no router file.
//   app/01-routing/nested/page.tsx -> /01-routing/nested

import Link from "next/link";

export default function NestedPage() {
  return (
    <>
      <h1>01. Routing / nested</h1>
      <div className="demo">
        <p>You are on <code>/01-routing/nested</code>.</p>
        <Link href="/01-routing">← Back to /01-routing</Link>
      </div>
    </>
  );
}
