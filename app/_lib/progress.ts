import { useSyncExternalStore } from "react";

const KEY = "progress";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function read() {
  try {
    return localStorage.getItem(KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

function parse(raw: string): string[] {
  try {
    const value = JSON.parse(raw);
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

export function useProgress() {
  return parse(useSyncExternalStore(subscribe, read, () => "[]"));
}

export function markComplete(slug: string) {
  const done = parse(read());
  if (done.includes(slug)) return;
  try {
    localStorage.setItem(KEY, JSON.stringify([...done, slug]));
  } catch {}
  window.dispatchEvent(new StorageEvent("storage", { key: KEY }));
}
