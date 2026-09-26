// Instant fallback while page.tsx awaits its data.
// Equivalent to wrapping the page in <Suspense fallback={<Loading />}>.
export default function Loading() {
  return <p className="demo">Loading lesson 06… (fetching slow data)</p>;
}
