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
      const { serverId } = params;
      const { name, imageUrl } = await req.json();
      if (!serverId) return new NextResponse("Server ID Is Missing", { status: 400 });

      const profile = await currentProfile();
      if (!profile) return new NextResponse("Unauthorized", { status: 400 });

      const server = await prisma.server.update({
         where: { id: serverId, profileId: profile.id },
         data: { name, imageUrl },
      });

      return NextResponse.json({ data: server, success: `Server "${name}" Updated` }, { status: 200 });
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 400 });
   }
};

export const DELETE = async (req: Request, { params }: Params) => {
   try {
      const profile = await currentProfile();
      if (!profile) return NextResponse.json({ error: "Unauthorized", status: 400 }, { status: 400 });

      const server = await prisma.server.delete({
         where: {
            id: params.serverId,
            profileId: profile.id,
         },
      });

      return NextResponse.json({ data: null, success: `Server "${server.name}" Created` }, { status: 200 });
   } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Internal Error", status: 500 }, { status: 500 });
   }
};
