import Link from "next/link";
import { notFound } from "next/navigation";
import { books } from "../data";

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export default async function BookPage({ params }: PageProps<"/03-dynamic-routes/[slug]">) {
  const { slug } = await params;

  const book = books.find((b) => b.slug === slug);
  if (!book) notFound();

  return (
    <>
      <h1>{book.title}</h1>
      <div className="demo">
        <p>
          by {book.author}. Rendered from <code>[slug]/page.tsx</code> with{" "}
          <code>slug = &quot;{slug}&quot;</code>.
        </p>
        <Link href="/03-dynamic-routes">← All books</Link>
      </div>
    </>
  );
}
