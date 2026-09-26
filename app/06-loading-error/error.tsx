"use client"; // Error boundaries must be Client Components.

import Link from "next/link";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string }; // In production the message is hidden; `digest` matches server logs.
  retry: () => void; // Re-fetches and re-renders the segment.
}) {
  return (
    <div className="demo">
      <h2>error.tsx caught an error</h2>
      {/* Production hides server error messages (no leaking internals); log the digest instead. */}
      <p>
        <code>
          {process.env.NODE_ENV === "development" ? error.message : `digest: ${error.digest}`}
        </code>
      </p>
      <p>The layout and sidebar still work; only this segment was replaced.</p>
      <button onClick={() => retry()}>Try again (fails again: ?fail=1 is still set)</button>{" "}
      <Link href="/06-loading-error">Back to safety</Link>
    </div>
  );
}
