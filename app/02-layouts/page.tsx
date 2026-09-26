import Source from "../_lib/Source";

export const metadata = { title: "02. Layouts & Navigation" };

export default function OverviewPage() {
  return (
    <>
      <p>
        <strong>Overview</strong> page. Bump the counter, then open Settings.
      </p>
      <Source
        files={[
          "app/02-layouts/layout.tsx",
          "app/02-layouts/Tabs.tsx",
          "app/02-layouts/Counter.tsx",
          "app/02-layouts/page.tsx",
        ]}
      />
    </>
  );
}
