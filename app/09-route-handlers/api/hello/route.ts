import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name") ?? "world";
  return Response.json({ method: "GET", message: `Hello, ${name}!` });
}

export async function POST(request: Request) {
  const body = await request.json();
  return Response.json({ method: "POST", youSent: body }, { status: 201 });
}
