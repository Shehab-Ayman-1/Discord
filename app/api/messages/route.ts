import { NextResponse } from "next/server";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";
import { Message } from "@prisma/client";

const MESSAGES_BATCH = 10;
export const GET = async (req: Request) => {
   try {
      const profile = await currentProfile();
      if (!profile) return new NextResponse("Unauthorized", { status: 401 });

      const { searchParams } = new URL(req.url);

      const channelId = searchParams.get("channelId");
      if (!channelId) return new NextResponse("channelId Is Missing", { status: 400 });

      const cursor = searchParams.get("cursor");
      if (!cursor) return new NextResponse("cursor Is Missing", { status: 400 });

      let messages: Message[] = [];

      if (cursor !== "undefined") {
         messages = await prisma.message.findMany({
            where: { channelId },
            cursor: { id: cursor },
            include: { member: { include: { profile: true } } },
            orderBy: { createdAt: "desc" },
            take: MESSAGES_BATCH,
            skip: 1,
         });
      }

      if (cursor === "undefined") {
         messages = await prisma.message.findMany({
            where: { channelId },
            include: { member: { include: { profile: true } } },
            orderBy: { createdAt: "desc" },
            take: MESSAGES_BATCH,
         });
      }

      let nextCursor = null;

      if (messages.length === MESSAGES_BATCH) {
         nextCursor = messages[MESSAGES_BATCH - 1].id;
      }

      return NextResponse.json({ messages, nextCursor });
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 500 });
   }
};
