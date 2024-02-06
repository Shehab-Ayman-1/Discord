import { currentProfile } from "@/utils/current-profile";
import { NextResponse } from "next/server";
import { prisma } from "@/utils";

type Params = {
   params: { memberId: string };
};

export const PUT = async (req: Request, { params }: Params) => {
   try {
      const { memberId } = params;
      if (!memberId) return new NextResponse("MemberId Is Missing", { status: 400 });

      const { role } = await req.json();
      const { searchParams } = new URL(req.url);

      const serverId = searchParams.get("serverId");
      if (!serverId) return new NextResponse("ServerId Is Missing", { status: 400 });

      const profile = await currentProfile();
      if (!profile) return new NextResponse("Unauthorized", { status: 401 });

      const server = await prisma.server.update({
         where: {
            id: serverId,
            profileId: profile.id,
         },
         data: {
            members: {
               update: {
                  where: { id: memberId, profileId: { not: profile.id } },
                  data: { role },
               },
            },
         },
         include: {
            members: {
               include: { profile: true },
               orderBy: { role: "asc" },
            },
         },
      });

      return NextResponse.json({ data: server, success: `"${profile.name}" Role Updated` }, { status: 200 });
   } catch (error) {
      console.log(error);
      return new NextResponse("Can't Update This Member", { status: 500 });
   }
};

export const DELETE = async (req: Request, { params }: Params) => {
   try {
      const { memberId } = params;
      if (!memberId) return new NextResponse("MemberId Is Missing", { status: 400 });

      const { searchParams } = new URL(req.url);

      const serverId = searchParams.get("serverId");
      if (!serverId) return new NextResponse("ServerId Is Missing", { status: 400 });

      const profile = await currentProfile();
      if (!profile) return new NextResponse("Unauthorized", { status: 401 });

      const server = await prisma.server.update({
         where: {
            id: serverId,
            profileId: profile.id,
         },
         data: {
            members: {
               deleteMany: {
                  id: memberId,
                  profileId: {
                     not: profile.id,
                  },
               },
            },
         },
         include: {
            members: {
               include: { profile: true },
               orderBy: { role: "asc" },
            },
         },
      });

      console.log({ memberId, profileId: profile.id });
      return NextResponse.json({ data: server, success: `"${profile.name}" Was Kicked` }, { status: 200 });
   } catch (error) {
      console.log(error);
      return new NextResponse("Internal Server Error", { status: 500 });
   }
};
