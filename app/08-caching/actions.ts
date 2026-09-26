"use server";

import { updateTag } from "next/cache";

export async function invalidateClock() {
  // Expire every "use cache" entry tagged "clock", right now.
  // The page re-renders in the same round trip, so you see the new value instantly.
  updateTag("clock");

  // revalidateTag("clock", "max") is the softer version: keep serving the old
  // value while a fresh one is generated in the background. Also works in
  // Route Handlers, e.g. a CMS webhook.
}
