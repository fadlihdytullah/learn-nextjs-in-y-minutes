import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/10-proxy/old") {
    return NextResponse.redirect(new URL("/10-proxy/new", request.url));
  }

  if (pathname === "/10-proxy/masked") {
    return NextResponse.rewrite(new URL("/10-proxy/new", request.url));
  }

  const headers = new Headers(request.headers);
  headers.set("x-greeting", "Hello from proxy.ts");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: "/10-proxy/:path*",
};
