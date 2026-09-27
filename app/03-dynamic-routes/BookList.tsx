import Link from "next/link";
import { books } from "./data";

export default function BookList() {
  return (
    <ul>
      {books.map((b) => (
        <li key={b.slug}>
          <Link href={`/03-dynamic-routes/${b.slug}`}>{b.title}</Link>
        </li>
      ))}
      <li>
        <Link href="/03-dynamic-routes/nope">A book that doesn&apos;t exist</Link>
      </li>
    </ul>
  );
}
