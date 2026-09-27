import { getLuckyNumber } from "./data";

export default async function LuckyNumber() {
  const n = await getLuckyNumber();
  return (
    <p>
      Lucky number: <strong>{n}</strong> (cached data, same tag)
    </p>
  );
}
