import { currentProfile } from "@/utils/current-profile";
import { NextResponse } from "next/server";
import { prisma } from "@/utils";

type ParamsProps = {
   serverId: string;
};

export const PUT = async (req: Request, { params }: { params: ParamsProps }) => {
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

      return NextResponse.json(
         { data: server, success: `Server "${name}" Updated`, status: 200 },
         { status: 200 },
      );
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 400 });
   }
};
