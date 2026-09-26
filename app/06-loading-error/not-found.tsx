import Link from "next/link";

// Rendered by notFound() in this segment. HTTP status is 404, or 200 if the
// response was already streaming (like here, behind loading.tsx).
export default function NotFound() {
  return (
    <div className="demo">
      <h2>not-found.tsx: nothing here.</h2>
      <Link href="/06-loading-error">Back</Link>
    </div>
  );
}
