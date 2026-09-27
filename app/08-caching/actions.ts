"use server";

import { updateTag } from "next/cache";

export async function invalidateClock() {
  updateTag("clock");
}
