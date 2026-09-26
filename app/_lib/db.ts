// A fake database: plain in-memory arrays plus an artificial delay.
// The delay makes it behave like real I/O, so Next.js treats it as uncached data.
// Data resets whenever the server restarts.

export type Post = { slug: string; title: string; body: string };
export type Message = { id: number; name: string; text: string };

const posts: Post[] = [
  { slug: "hello", title: "Hello, Next.js", body: "The App Router in one sentence: folders are routes." },
  { slug: "rsc", title: "Server Components", body: "Components run on the server unless you say otherwise." },
  { slug: "cache", title: "Caching", body: "Nothing is cached unless you ask for it with \"use cache\"." },
];

const messages: Message[] = [{ id: 1, name: "Ada", text: "First!" }];

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPosts() {
  await sleep(800);
  return posts;
}

export async function getMessages() {
  await sleep(300);
  return [...messages].reverse();
}

export async function addMessage(name: string, text: string) {
  await sleep(300);
  messages.push({ id: messages.length + 1, name, text });
}
