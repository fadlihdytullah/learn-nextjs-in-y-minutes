import { cacheLife, cacheTag } from "next/cache";

export async function getLuckyNumber() {
  "use cache";
  cacheLife("hours");
  cacheTag("clock");
  return Math.floor(Math.random() * 100);
}
