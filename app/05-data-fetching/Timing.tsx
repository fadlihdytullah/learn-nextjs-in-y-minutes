import { connection } from "next/server";
import { getMessages, getPosts } from "../_lib/db";

async function measure(work: () => Promise<unknown>) {
  const start = performance.now();
  await work();
  return Math.round(performance.now() - start);
}

export default async function Timing() {
  await connection();

  const sequential = await measure(async () => {
    await getPosts();
    await getMessages();
  });
  const parallel = await measure(() => Promise.all([getPosts(), getMessages()]));

  return (
    <ul>
      <li>
        One after another: <strong>{sequential} ms</strong>
      </li>
      <li>
        With Promise.all: <strong>{parallel} ms</strong>
      </li>
    </ul>
  );
}
