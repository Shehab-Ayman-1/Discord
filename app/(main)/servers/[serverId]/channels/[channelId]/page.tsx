import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";
import { ChatMessages } from "../../_components/chat-messages";
import { ChatHeader } from "../../_components/chate-header";
import { ChatInput } from "../../_components/chat-input";

type ChannelIdProps = {
   params: {
      serverId: string;
      channelId: string;
   };
};

const ChannelId = async ({ params }: ChannelIdProps) => {
   const profile = await currentProfile();
   if (!profile) return redirectToSignIn();

   const channel = await prisma.channel.findUnique({ where: { id: params.channelId } });
   if (!channel) return redirect("/");

   const member = await prisma.member.findFirst({ where: { profileId: profile.id, serverId: params.serverId } });
   if (!member) return redirect("/");

   return (
      <div className="flex h-full flex-col bg-white p-3 dark:bg-[#313338]">
         <ChatHeader
            name={channel?.name}
            serverId={channel?.serverId}
            type="channel"
            imageUrl={profile.imageUrl}
         />

         <ChatMessages
            type="channel"
            chatId={channel.id}
            name={channel.name}
            member={member}
            api={{
               url: "/api/messages",
               socket: `/api/socket/messages`,
               socketQuery: `channelId=${channel.id}&serverId=${channel.serverId}`,
            }}
            param={{ key: "channelId", value: channel.id }}
         />

         <ChatInput
            type="channel"
            name={channel.name}
            api={{
               url: `/api/socket/messages?channelId=${channel.id}&serverId=${channel.serverId}`,
               method: "post",
            }}
         />
      </div>
   );
};

export default ChannelId;
