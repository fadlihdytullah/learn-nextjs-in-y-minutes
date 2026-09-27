"use client";

import { useActionState } from "react";
import { postMessage } from "./actions";

export default function GuestbookForm() {
  const [state, formAction, pending] = useActionState(postMessage, {});

  return (
    <form action={formAction} className="form">
      <input name="name" placeholder="Your name" aria-label="Name" />
      <input name="text" placeholder="Say hi" aria-label="Message" />
      <button disabled={pending}>{pending ? "Posting…" : "Post"}</button>
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
