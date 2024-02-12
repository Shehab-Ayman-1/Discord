import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";

export const GET = async (req: NextRequest) => {
   const room = req.nextUrl.searchParams.get("room");
   if (!room) return NextResponse.json({ error: "Missing 'room' Query Parameter" }, { status: 400 });

   const username = req.nextUrl.searchParams.get("username");
   if (!username) return NextResponse.json({ error: "Missing 'username' Query Parameter" }, { status: 400 });

   const API_KEY = process.env.LIVEKIT_API_KEY;
   const API_SECRET = process.env.LIVEKIT_API_SECRET;
   const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL;

   if (!API_KEY || !API_SECRET || !WEBSOCKET_URL)
      return NextResponse.json({ error: "Server Missing Configured" }, { status: 500 });

   const at = new AccessToken(API_KEY, API_SECRET, { identity: WEBSOCKET_URL });
   at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

   return NextResponse.json({ token: await at.toJwt() });
};
