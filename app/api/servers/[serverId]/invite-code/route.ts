import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

import { currentProfile } from "@/utils/current-profile";
import { prisma } from "@/utils";

type ParamsProps = {
   params: { serverId: string };
};

export const GET = async (req: Request, { params }: ParamsProps) => {
   try {
      const { serverId } = params;
      if (!serverId) return NextResponse.json("Invalid serverId", { status: 400 });

      const profile = await currentProfile();
      if (!profile) return NextResponse.json("Unauthorized", { status: 401 });

      const inviteCode = uuid();
      await prisma.server.update({ where: { id: serverId }, data: { inviteCode } });

      return NextResponse.json(
         { data: inviteCode, success: `Invite Code Generated`, status: 200 },
         { status: 200 },
      );
   } catch (error) {
      console.log(error);
      return NextResponse.json(null, { status: 400 });
   }
};
