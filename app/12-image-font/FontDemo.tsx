import { Lora } from "next/font/google";

const lora = Lora({ subsets: ["latin"] });

export default function FontDemo() {
  return <h2 className={lora.className}>This heading uses Lora, self-hosted by next/font.</h2>;
}
