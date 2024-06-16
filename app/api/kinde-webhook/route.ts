import { NextResponse } from "next/server";
import jwksClient from "jwks-rsa";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";

const client = jwksClient({
  jwksUri: `${process.env.KINDE_ISSUER_URL}/.well-known/jwks.json`,
});


export async function POST(req: Request) {
  try {
    // Get the token from the request
    const token = await req.text();

    // Decode the token
    const decoded = jwt.decode(token, { complete: true }) as Jwt | null;
    if (!decoded) return NextResponse.json({ message: "token is null" }, { status: 400 });
    const { header } = decoded;
    const { kid } = header;

    // Verify the token
    const key = await client.getSigningKey(kid);
    const signingKey = key.getPublicKey();
    const event = await jwt.verify(token, signingKey) as JwtPayload;

    // Handle various events
    // user.authenticated
    // user.deleted
    const { email, last_name, first_name, username } = event.data.user;
    switch (event?.type) {
      case "user.created":
        break;
      case "user.updated":
        break;
      default:
        // other events that we don't handle
        break;
    }
    // https://8659-2a01-cb00-111-d200-682d-e3d8-bdfd-730c.ngrok-free.app
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      return NextResponse.json({ message: err.message }, { status: 400 });
    }
  }
  return NextResponse.json({ status: 200, statusText: "success" });
}

// {
//   email: 'yvens.creator@gmail.com',
//   first_name: 'Yvens2',
//   id: 'kp_7aa5792099424239939103420cc2f9d1',
//   is_password_reset_requested: false,
//   is_suspended: false,
//   last_name: 'Belaston',
//   organizations: [ [Object] ],
//   phone: null,
//   username: null
// }