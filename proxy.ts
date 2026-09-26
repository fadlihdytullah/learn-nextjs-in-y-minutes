// Lesson 10. `proxy.ts` sits in the project root (next to `app/`), one per project.
// It runs BEFORE every matching request and can redirect, rewrite, or edit
// headers. (Before Next.js 16 this file was called `middleware.ts`.)

import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect: the browser is sent to a new URL (the address bar changes).
  if (pathname === "/10-proxy/old") {
    return NextResponse.redirect(new URL("/10-proxy/new", request.url));
  }

  // Rewrite: serve another route, but the address bar keeps the original URL.
  if (pathname === "/10-proxy/masked") {
    return NextResponse.rewrite(new URL("/10-proxy/new", request.url));
  }

  // Otherwise continue, adding a request header the page can read.
  const headers = new Headers(request.headers);
  headers.set("x-greeting", "Hello from proxy.ts"); // Header values must be ASCII.
  return NextResponse.next({ request: { headers } });
}

// Only run for these paths. Keep it narrow: proxy runs on every matched request.
export const config = {
  matcher: "/10-proxy/:path*",
};
