import Image from "next/image";
import waves from "./waves.png";

export default function Photo() {
  return (
    <Image
      src={waves}
      alt="Blue generated waves"
      placeholder="blur"
      sizes="(max-width: 700px) 100vw, 800px"
      style={{ width: "100%", height: "auto" }}
    />
  );
}
