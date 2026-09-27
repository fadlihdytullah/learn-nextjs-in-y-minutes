import { readFileSync } from "node:fs";
import path from "node:path";
import { cacheLife } from "next/cache";
import { codeToHtml } from "shiki";

type Props = { file?: string; code?: string; title?: string; lang?: string };

export default function Source({ file, code = "", title, lang }: Props) {
  if (file) {
    code = readFileSync(path.join(/*turbopackIgnore: true*/ process.cwd(), file), "utf8");
    title = file;
  }
  return (
    <figure className="source">
      {title && <figcaption>{title}</figcaption>}
      <Highlighted code={code.trim()} lang={lang ?? (file ? path.extname(file).slice(1) : "tsx")} />
    </figure>
  );
}

async function Highlighted({ code, lang }: { code: string; lang: string }) {
  "use cache";
  cacheLife("max");
  const html = await codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "vesper" },
    defaultColor: false,
  });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
