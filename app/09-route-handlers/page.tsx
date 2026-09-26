// ─── 09. ROUTE HANDLERS ─────────────────────────────────────────────────────
// Your own API endpoints, living in the same app: webhooks, public APIs,
// endpoints for mobile apps, file downloads…
//
// Only your own UI needs the data? You usually don't need one:
//   - reading data   -> fetch it directly in a Server Component (lesson 05)
//   - changing data  -> use a Server Action (lesson 07)

import Source from "../_lib/Source";
import Caller from "./Caller";

export const metadata = { title: "09. Route Handlers" };

export default function Page() {
  return (
    <>
      <h1>09. Route Handlers</h1>

      <div className="demo">
        <p>
          Open it directly:{" "}
          <a href="/09-route-handlers/api/hello?name=Grace">
            /09-route-handlers/api/hello?name=Grace
          </a>
        </p>
        <Caller />
      </div>

      <Source
        files={[
          "app/09-route-handlers/api/hello/route.ts",
          "app/09-route-handlers/Caller.tsx",
        ]}
      />
    </>
  );
}
