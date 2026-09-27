import os from "node:os";

export default function Platform() {
  const platform = `${os.type()} ${os.arch()}`;
  return (
    <p>
      Rendered on <code>{platform}</code>. This code never reaches the browser.
    </p>
  );
}
