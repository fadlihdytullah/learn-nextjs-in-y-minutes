import { connection } from "next/server";

export default async function LiveClock() {
  await connection();
  return (
    <p>
      Live time: <strong>{new Date().toLocaleTimeString("en-GB")}</strong> (changes on every reload)
    </p>
  );
}
