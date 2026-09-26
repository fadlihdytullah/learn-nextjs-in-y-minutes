"use client";

import { useActionState } from "react";
import { postMessage } from "./actions";

export default function GuestbookForm() {
  // state = last value returned by the action; pending = true while it runs.
  const [state, formAction, pending] = useActionState(postMessage, {});

  return (
    // Pass the action straight to <form action>. No fetch, no API route,
    // no onSubmit/preventDefault. It even works before JS loads.
    <form action={formAction} className="form">
      <input name="name" placeholder="Your name" aria-label="Name" />
      <input name="text" placeholder="Say hi" aria-label="Message" />
      <button disabled={pending}>{pending ? "Posting…" : "Post"}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
