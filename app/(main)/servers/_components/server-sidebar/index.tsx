import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { CHANNEL } from "@prisma/client";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";
import { SidebarHeader } from "./sidebar-header";

type ServerSidebarProps = {
   serverId: string;
};

export const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
   const profile = await currentProfile();
   if (!profile) return redirectToSignIn();

   const server = await prisma.server.findUnique({
      where: { id: serverId },
      include: {
         channels: { orderBy: { createdAt: "asc" } },
         members: { orderBy: { createdAt: "asc" }, include: { profile: true } },
      },
   });

   if (!server) return redirect("/");

   const textChannels = server?.channels.filter((channel) => channel.type === CHANNEL.TEXT);
   const audioChannels = server?.channels.filter((channel) => channel.type === CHANNEL.AUDIO);
   const videoChannels = server?.channels.filter((channel) => channel.type === CHANNEL.VIDEO);
   const members = server?.members.filter((member) => member.profileId !== profile.id);
   const role = server?.members.find((member) => member.profileId === profile.id)?.role;

   return (
      <div className="flex h-full w-full flex-col bg-[#f2f3f5] p-2 text-primary dark:bg-black/30">
         <SidebarHeader role={role} server={server!} />
      </div>
   );
};
