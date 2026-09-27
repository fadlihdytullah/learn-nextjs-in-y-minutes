import { getMessages } from "../_lib/db";

export default async function Messages() {
  const messages = await getMessages();
  return (
    <ul>
      {messages.map((m) => (
        <li key={m.id}>
          <strong>{m.name}</strong>: {m.text}
        </li>
      ))}
    </ul>
  );
}
