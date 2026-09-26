"use server"; // Every export in this file becomes a Server Action.

import { refresh } from "next/cache";
import { addMessage } from "../_lib/db";

export type FormState = { error?: string };

// Called from the browser, runs on the server (a POST under the hood).
// Treat it like a public API endpoint: ALWAYS validate input (and check auth).
export async function postMessage(
  _prev: FormState, // previous state, passed by useActionState
  formData: FormData,
): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();

  // Expected errors are returned, not thrown.
  if (!name || !text) return { error: "Name and message are both required." };
  if (text.length > 140) return { error: "Keep it under 140 characters." };

  await addMessage(name.slice(0, 40), text);

  refresh(); // Re-render the current page so the new message shows up.
  return {};
}
