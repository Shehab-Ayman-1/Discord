import { NextResponse } from "next/server";
import { MEMBER } from "@prisma/client";
import { v4 as uuid } from "uuid";

import { currentProfile } from "@/utils/current-profile";
import { prisma } from "@/utils";

type Params = {
   params: {
      serverId: string;
   };
};

export const POST = async (req: Request) => {
   try {
      const { name, imageUrl } = await req.json();

      const profile = await currentProfile();
      if (!profile) return NextResponse.json({ error: "Unauthorized", status: 400 }, { status: 400 });

      const server = await prisma.server.create({
         data: {
            profileId: profile.id,
            name,
            imageUrl,
            inviteCode: uuid(),
            channels: {
               create: {
                  name: "general",
                  profileId: profile.id,
               },
            },
            members: {
               create: {
                  profileId: profile.id,
                  role: MEMBER.ADMIN,
               },
            },
         },
      });

      return NextResponse.json(
         { data: server, success: `Server "${name}" Created`, status: 200 },
         { status: 200 },
      );
   } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Internal Error", status: 500 }, { status: 500 });
   }
};
