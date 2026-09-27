"use client";

import { use } from "react";
import type { Message } from "../_lib/db";

export default function MessageCount({ messagesPromise }: { messagesPromise: Promise<Message[]> }) {
  const messages = use(messagesPromise);
  return <p>The guestbook (lesson 07) has {messages.length} message(s).</p>;
}
