import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const topics: Record<string, string> = {
  routing: "Folders become URLs.",
  caching: "Nothing is cached unless you ask for it.",
};

export function generateStaticParams() {
  return Object.keys(topics).map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: PageProps<"/11-metadata/topics/[topic]">): Promise<Metadata> {
  const { topic } = await params;
  return { title: `Topic: ${topic}`, description: topics[topic] };
}

export default async function TopicPage({ params }: PageProps<"/11-metadata/topics/[topic]">) {
  const { topic } = await params;
  if (!topics[topic]) notFound();

  return (
    <>
      <h1>Topic: {topic}</h1>
      <div className="demo">
        <p>{topics[topic]}</p>
        <p>
          Look at the tab title: <code>generateMetadata</code> built it from the URL.
        </p>
        <Link href="/11-metadata">← Back</Link>
      </div>
    </>
  );
}
