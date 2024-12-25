import { NextResponse } from "next/server";
import { getAccessToken } from "@auth0/nextjs-auth0";

export async function GET() {
  const { accessToken } = await getAccessToken();

  const headers: HeadersInit = {};

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const res = await fetch(`http://localhost:8000/boxes`, {
    method: "GET",
    headers,
  });
  const data = await res.json();
  return NextResponse.json(data);
}
