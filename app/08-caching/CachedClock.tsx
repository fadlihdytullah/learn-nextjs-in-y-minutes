import { cacheLife, cacheTag } from "next/cache";

export default async function CachedClock() {
  "use cache";
  cacheLife("hours");
  cacheTag("clock");
  return (
    <p>
      Cached time: <strong>{new Date().toLocaleTimeString("en-GB")}</strong> (sticks around)
    </p>
  );
}
