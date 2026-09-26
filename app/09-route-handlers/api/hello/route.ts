// A `route.ts` file turns a folder into an HTTP endpoint instead of a page:
//   app/09-route-handlers/api/hello/route.ts  ->  /09-route-handlers/api/hello
//
// Export a function per HTTP method: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS.
// They use the standard Web Request/Response APIs.
// Note: a folder can have a page.tsx OR a route.ts, never both.

import type { NextRequest } from "next/server";

// NextRequest = Request + helpers like `nextUrl` and `cookies`.
export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? "world";
  return Response.json({ method: "GET", message: `Hello, ${name}!` });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ method: "POST", youSent: body }, { status: 201 });
}

// Dynamic segments work here too: app/api/users/[id]/route.ts
//   export async function GET(req: Request, ctx: RouteContext<"/api/users/[id]">) {
//     const { id } = await ctx.params;
//   }
