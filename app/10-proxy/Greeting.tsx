import { headers } from "next/headers";

export default async function Greeting() {
  const greeting = (await headers()).get("x-greeting");
  return (
    <p>
      Header set by proxy: <strong>{greeting ?? "(none)"}</strong>
    </p>
  );
}
