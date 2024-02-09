import { NextResponse } from "next/server";

import { currentProfile } from "@/utils/current-profile";
import { prisma } from "@/utils";
import { MEMBER } from "@prisma/client";

type Params = {
   params: {
      channelId: string;
   };
};

export const DELETE = async (req: Request, { params }: Params) => {
   try {
      const { searchParams } = new URL(req.url);
      const serverId = searchParams.get("serverId");
      if (!serverId) return new NextResponse("ServerId Is Missing", { status: 400 });

      const profile = await currentProfile();
      if (!profile) return new NextResponse("Unauthorized", { status: 401 });

      await prisma.server.update({
         where: {
            id: serverId,
            members: {
               some: {
                  profileId: profile.id,
                  role: { in: [MEMBER.ADMIN, MEMBER.MODERATOR] },
               },
            },
         },
         data: {
            channels: {
               delete: {
                  id: params.channelId,
                  name: { not: "general" },
               },
            },
         },
      });

      return NextResponse.json({ data: null, success: `Channel Was Deleted` }, { status: 200 });
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 400 });
   }
};

export const PUT = async (req: Request, { params }: Params) => {
   try {
      const { name, type } = await req.json();
      if (!name || !type) return new NextResponse("All Fields Are Required", { status: 400 });

      const { searchParams } = new URL(req.url);
      const serverId = searchParams.get("serverId");
      if (!serverId) return new NextResponse("ServerId Is Missing", { status: 400 });

      const profile = await currentProfile();
      if (!profile) return new NextResponse("Unauthorized", { status: 401 });

      if (name === "general") return new NextResponse('Name Cant Be "general"', { status: 400 });

      await prisma.server.update({
         where: {
            id: serverId,
            members: {
               some: {
                  profileId: profile.id,
                  role: { in: [MEMBER.ADMIN, MEMBER.MODERATOR] },
               },
            },
         },
         data: {
            channels: {
               update: {
                  where: { id: params.channelId, NOT: { name: "general" } },
                  data: { name, type },
               },
            },
         },
      });

      console.log("run");

      return NextResponse.json({ data: null, success: `Channel "${name}" Updated` }, { status: 200 });
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 400 });
   }
};
