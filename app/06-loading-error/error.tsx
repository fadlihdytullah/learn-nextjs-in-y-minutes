"use client";

import Link from "next/link";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="demo">
      <h2>error.tsx caught an error</h2>
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
