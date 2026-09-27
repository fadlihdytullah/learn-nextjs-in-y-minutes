import Link from "next/link";

export default function NotFound() {
  return (
    <div className="demo">
      <h2>not-found.tsx: nothing here.</h2>
      <Link href="/06-loading-error">Back</Link>
    </div>
  );
}
