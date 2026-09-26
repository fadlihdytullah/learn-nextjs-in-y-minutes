import Link from "next/link";

export default function NewPage() {
  return (
    <>
      <h1>10. Proxy / new</h1>
      <div className="demo">
        <p>
          You are looking at <code>app/10-proxy/new/page.tsx</code>. Check the
          address bar: <code>/old</code> became <code>/new</code>, while{" "}
          <code>/masked</code> stayed <code>/masked</code>.
        </p>
        <Link href="/10-proxy">← Back</Link>
      </div>
    </>
  );
}
