import Source from "../_lib/Source";
import Counter from "./Counter";
import Tabs from "./Tabs";

export const metadata = { title: "02. Layouts & Navigation" };

export default function Layout({ children }: LayoutProps<"/02-layouts">) {
  return (
    <>
      <h1>02. Layouts & Navigation</h1>
      <p>
        A <strong>layout</strong> is UI shared by every page in a folder: navigation, sidebars,
        tabs. It wraps the pages below it and stays on screen while you move between them.
      </p>

      <h2>A layout wraps pages</h2>
      <p>
        Put a <code>layout.tsx</code> in a folder and it wraps every <code>page.tsx</code> in that
        folder and all folders below it. The active page arrives as the <code>children</code> prop.
        This very lesson is a layout: the tabs and counter below come from it, and only the text
        under the line changes.
      </p>
      <div className="demo">
        <Tabs />
        <Counter />
        <hr />
        {children}
      </div>
      <Source
        title="app/02-layouts/layout.tsx (the demo part)"
        code={`export default function Layout({ children }: LayoutProps<"/02-layouts">) {
  return (
    <div className="demo">
      <Tabs />
      <Counter />
      <hr />
      {children}
    </div>
  );
}`}
      />
      <Source file="app/02-layouts/settings/page.tsx" />
      <p>
        <code>LayoutProps&lt;&quot;/02-layouts&quot;&gt;</code> is a global type Next.js generates
        from your routes, so <code>children</code> and route params are typed for you.
      </p>

      <h2>State survives navigation</h2>
      <p>
        When you switch tabs, Next.js swaps only <code>children</code>. The layout does not
        re-render or remount, so the counter keeps its value. That is what makes layouts a good home
        for UI that should feel persistent, like an open menu or a playing video.
      </p>
      <Source file="app/02-layouts/Counter.tsx" />
      <div className="tip">
        <p>
          Need a fresh instance on every navigation instead, for example to replay an enter
          animation? Rename the file to <code>template.tsx</code>. It wraps pages the same way but
          remounts each time.
        </p>
      </div>

      <h2>Layouts nest</h2>
      <p>
        Layouts stack from the outside in. The root layout in <code>app/layout.tsx</code> is
        required and renders <code>&lt;html&gt;</code> and <code>&lt;body&gt;</code>. Every
        folder can add its own layout inside it.
      </p>
      <Source
        title="Layout nesting"
        lang="text"
        code={`app/layout.tsx                 root: <html>, <body>, top bar, sidebar
└─ app/02-layouts/layout.tsx   tabs + counter
   ├─ page.tsx                 /02-layouts
   └─ settings/page.tsx        /02-layouts/settings`}
      />

      <h2>Links and the active tab</h2>
      <p>
        <code>&lt;Link&gt;</code> renders a normal <code>&lt;a&gt;</code>, but clicking it
        navigates on the client, without a full page reload. It also <strong>prefetches</strong>{" "}
        the target route when the link enters the viewport, so the click feels instant. Static
        routes are prefetched fully; dynamic routes only partially.
      </p>
      <p>
        To highlight the current tab, read the URL with <code>usePathname()</code>. It is a hook,
        so it only works in a Client Component (lesson 04).
      </p>
      <Source file="app/02-layouts/Tabs.tsx" />

      <h2>Navigating from code</h2>
      <p>
        For navigation after an event, like saving a form, use the <code>useRouter()</code> hook
        from <code>next/navigation</code>. Prefer <code>&lt;Link&gt;</code> whenever the user
        clicks something: it is accessible and prefetches.
      </p>
      <Source
        title="Programmatic navigation"
        code={`"use client";

import { useRouter } from "next/navigation";

export default function SaveButton() {
  const router = useRouter();
  return <button onClick={() => router.push("/02-layouts/settings")}>Save</button>;
}`}
      />

      <div className="prod">
        <p>
          Layouts are perfect for app chrome, but do not rely on them for per-page security. Because
          a layout does not re-render on client navigation, an auth check inside it will not run
          again when the user moves between pages. Check access in each page or, better, next to
          the data it protects.
        </p>
      </div>
    </>
  );
}
