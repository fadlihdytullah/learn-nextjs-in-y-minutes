import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";

export default function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  const ready = existsSync(path.join(/*turbopackIgnore: true*/ process.cwd(), "public/images", src));
  return (
    <figure className="figure">
      {ready ? (
        <Image
          src={`/images/${src}`}
          alt={alt}
          width={1600}
          height={900}
          sizes="(max-width: 800px) 100vw, 780px"
        />
      ) : (
        <div className="figure-pending">
          <p>
            Image pending: <code>public/images/{src}</code> (prompt in IMAGE.md)
          </p>
        </div>
      )}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
