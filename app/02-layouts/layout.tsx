// ─── 02. LAYOUTS & NAVIGATION ───────────────────────────────────────────────
// `layout.tsx` wraps every page in its folder (and all nested folders).
//
//   app/layout.tsx                 root layout: <html>, <body>, sidebar
//   └─ app/02-layouts/layout.tsx   this file: the tabs + counter below
//      ├─ page.tsx                 /02-layouts
//      └─ settings/page.tsx        /02-layouts/settings
//
// Key property: on navigation, layouts do NOT re-render or remount.
// Click the counter, then switch tabs: the count survives, only `children` swaps.
//
// Need a fresh instance on every navigation instead? Rename it `template.tsx`.

import Counter from "./Counter";
import Tabs from "./Tabs";

// Layouts receive the active page (or nested layout) as `children`.
// `LayoutProps<"/02-layouts">` is a global type generated from your routes.
export default function Layout({ children }: LayoutProps<"/02-layouts">) {
  return (
    <>
      <h1>02. Layouts & Navigation</h1>
      <div className="demo">
        <Tabs />
        <Counter />
        <hr />
        {children}
      </div>
    </>
  );
}
