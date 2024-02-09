import { HashIcon, MicIcon, ShieldAlertIcon, ShieldCheckIcon, User2Icon, VideoIcon } from "lucide-react";
import { redirectToSignIn } from "@clerk/nextjs";
import { CHANNEL, MEMBER } from "@prisma/client";
import { redirect } from "next/navigation";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";
import { SidebarHeader } from "./sidebar-header";
import { SidebarSearch } from "./sidebar-search";
import { ServerSection } from "./sidebar-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";

type ServerSidebarProps = {
   serverId: string;
};

const iconMap = {
   [CHANNEL.TEXT]: <HashIcon className="mr-2 h-4 w-4" />,
   [CHANNEL.AUDIO]: <MicIcon className="mr-2 h-4 w-4" />,
   [CHANNEL.VIDEO]: <VideoIcon className="mr-2 h-4 w-4" />,
};

export const roleIconMap = {
   [MEMBER.GUEST]: <User2Icon className="mr-2 h-4 w-4 dark:text-white" />,
   [MEMBER.MODERATOR]: <ShieldCheckIcon className="mr-2 h-4 w-4 text-indigo-500" />,
   [MEMBER.ADMIN]: <ShieldAlertIcon className="mr-2 h-4 w-4 text-rose-500" />,
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
      <div className="flex h-full max-h-full w-full flex-col overflow-y-auto bg-rose-50 p-2 text-primary dark:bg-gray-900">
         <SidebarHeader role={role} server={server!} />

         <SidebarSearch
            data={[
               {
                  type: "channel",
                  label: "Text Channels",
                  data: textChannels?.map((channel) => ({
                     id: channel.id,
                     name: channel.name,
                     icon: iconMap[channel.type],
                  })),
               },
               {
                  type: "channel",
                  label: "Voice Channels",
                  data: audioChannels?.map((channel) => ({
                     id: channel.id,
                     name: channel.name,
                     icon: iconMap[channel.type],
                  })),
               },
               {
                  type: "channel",
                  label: "Video Channels",
                  data: videoChannels?.map((channel) => ({
                     id: channel.id,
                     name: channel.name,
                     icon: iconMap[channel.type],
                  })),
               },
               {
                  type: "member",
                  label: "Members",
                  data: members?.map((member) => ({
                     id: member.id,
                     name: member.profile.name,
                     icon: roleIconMap[member.role],
                  })),
               },
            ]}
         />

         {!!textChannels?.length && (
            <div className="my-2 border-t-2 border-neutral-200 dark:border-neutral-800">
               <ServerSection
                  label="Text Channels"
                  sectionType="channels"
                  channelType={CHANNEL.TEXT}
                  role={role}
               />

               <div className="space-y-0.5">
                  {textChannels.map((channel) => (
                     <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
                  ))}
               </div>
            </div>
         )}
         {!!audioChannels?.length && (
            <div className="my-2 border-t-2 border-neutral-200 dark:border-neutral-800">
               <ServerSection
                  label="Voice Channels"
                  sectionType="channels"
                  channelType={CHANNEL.AUDIO}
                  role={role}
               />

               <div className="space-y-0.5">
                  {audioChannels.map((channel) => (
                     <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
                  ))}
               </div>
            </div>
         )}
         {!!videoChannels?.length && (
            <div className="my-2 border-t-2 border-neutral-200 dark:border-neutral-800">
               <ServerSection
                  label="Video Channels"
                  sectionType="channels"
                  channelType={CHANNEL.VIDEO}
                  role={role}
               />

               <div className="space-y-0.5">
                  {videoChannels.map((channel) => (
                     <ServerChannel key={channel.id} channel={channel} server={server} role={role} />
                  ))}
               </div>
            </div>
         )}
         {!!members?.length && (
            <div className="my-2 border-t-2 border-neutral-200 dark:border-neutral-800">
               <ServerSection label="Members" sectionType="members" role={role} server={server} />

               {members.map((member) => (
                  <ServerMember key={member.id} member={member} server={server} />
               ))}
            </div>
         )}
      </div>
   );
};
