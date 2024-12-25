import { getAccessToken } from "@auth0/nextjs-auth0";

type APIResponse = {
  message: string;
};

type ImageData = {
  image: string;
};

export async function POST(req: Request) {
  try {
    const { accessToken } = await getAccessToken();
    const body: ImageData = await req.json();
    // console.log(body);
    const res = await fetch("http://localhost:8000/load-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });
    const data: APIResponse = await res.json();

    // return new NextResponse(JSON.stringify(data)) not sure about this method. Could cause errors down the line.
    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify({ message: "You're not logged in." }));
  }
}
