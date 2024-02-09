import { NextResponse } from "next/server";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";

type Params = {
   params: {
      serverId: string;
   };
};

export const PUT = async (req: Request, { params }: Params) => {
   try {
      const profile = await currentProfile();
      if (!profile) return new NextResponse("Unauthorized", { status: 401 });

      const server = await prisma.server.update({
         where: {
            id: params.serverId,
            profileId: {
               not: profile.id,
            },
            members: {
               some: { profileId: profile.id },
            },
         },
         data: {
            members: {
               deleteMany: { profileId: profile.id },
            },
         },
      });

      return NextResponse.json({ data: null, success: `You Leaved " ${server.name}" Server` }, { status: 200 });
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 500 });
   }
};
