"use server";

import { refresh } from "next/cache";
import { addMessage } from "../_lib/db";

export async function quickPost(formData: FormData) {
  const text = String(formData.get("text") ?? "").trim().slice(0, 140);
  if (!text) return;
  await addMessage("Guest", text);
  refresh();
}

export type FormState = { error?: string };

export async function postMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();

  if (!name || !text) return { error: "Name and message are both required." };
  if (text.length > 140) return { error: "Keep it under 140 characters." };

  await addMessage(name.slice(0, 40), text);
  refresh();
  return {};
}
