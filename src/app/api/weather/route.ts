import { NextResponse } from "next/server";
import { getAccessToken } from "@auth0/nextjs-auth0";

export async function GET() {
  const headers: HeadersInit = {};

  const res = await fetch(`http://localhost:8000/weather`, {
    method: "GET",
    headers,
  });
  const data = await res.json();
  return NextResponse.json(data);
}
