import { notFound } from "next/navigation";
import { getPosts } from "../_lib/db";

export default async function Posts({
  searchParams,
}: {
  searchParams: PageProps<"/06-loading-error">["searchParams"];
}) {
  const { fail, missing } = await searchParams;
  const posts = await getPosts();

  if (fail) throw new Error("Boom! Something broke while rendering.");
  if (missing) notFound();

  return <p>Loaded {posts.length} posts after an 800ms wait.</p>;
}
