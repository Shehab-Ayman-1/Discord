import { NextResponse } from "next/server";
import { MEMBER } from "@prisma/client";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";

export const POST = async (req: Request) => {
   try {
      const { name, type } = await req.json();
      if (!name || !type) return new NextResponse("Name & Type Are Required Fields");

      const { searchParams } = await new URL(req.url);
      const serverId = searchParams.get("serverId");
      if (!serverId) return new NextResponse("Server Id Is Missing", { status: 400 });

      const profile = await currentProfile();
      if (!profile) return new NextResponse("Unauthorized", { status: 401 });

      if (name === "general") return new NextResponse("Channel Name Can't Be General", { status: 400 });

      const server = await prisma.server.update({
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
               create: { profileId: profile.id, name, type },
            },
         },
      });

      return NextResponse.json({ data: null, success: `Channel "${name}" Created`, status: 200 });
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 400 });
   }
};
