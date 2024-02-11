import { redirectToSignIn } from "@clerk/nextjs";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";
import { redirect } from "next/navigation";

type ServersIdProps = {
   params: {
      serverId: string;
   };
};

const ServersId = async ({ params }: ServersIdProps) => {
   const profile = await currentProfile();
   if (!profile) return redirectToSignIn();

   const server = await prisma.server.findUnique({
      where: {
         id: params.serverId,
         members: { some: { profileId: profile.id } },
      },
      include: {
         channels: {
            where: { name: "general" },
            orderBy: { createdAt: "asc" },
         },
      },
   });

   const initialChannel = server?.channels[0];
   if (initialChannel?.name !== "general") return;

   return redirect(`/servers/${params.serverId}/channels/${initialChannel?.id}`);
};

export default ServersId;
