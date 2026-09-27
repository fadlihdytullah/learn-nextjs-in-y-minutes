import { getPosts } from "../_lib/db";

export default async function Posts() {
  const posts = await getPosts();
  return (
    <ul>
      {posts.map((p) => (
        <li key={p.slug}>
          <strong>{p.title}</strong>: {p.body}
        </li>
      ))}
    </ul>
  );
}
