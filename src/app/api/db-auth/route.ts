import { getAccessToken } from "@auth0/nextjs-auth0";

export async function POST(req: Request) {
  try {
    const { accessToken } = await getAccessToken();
    const body = await req.json();
    console.log(body);
    const res = await fetch("http://localhost:8000/load-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error during request!" }));
  }
}
