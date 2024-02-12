import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";
import { getOrCreateConversation } from "@/utils/conversation";
import { ChatMessages } from "../../_components/chat-messages";
import { ChatHeader } from "../../_components/chate-header";
import { ChatInput } from "../../_components/chat-input";
import { Fragment } from "react";
import { MediaRoom } from "@/components/media-room";

type MemberIdProps = {
   params: {
      memberId: string;
      serverId: string;
   };
   searchParams: {
      video?: boolean;
   };
};

const MemberId = async ({ params, searchParams }: MemberIdProps) => {
   const profile = await currentProfile();
   if (!profile) return redirectToSignIn();

   const currentMember = await prisma.member.findFirst({
      where: { serverId: params.serverId, profileId: profile.id },
      include: { profile: true },
   });
   if (!currentMember) return redirect("/");

   const conversation = await getOrCreateConversation(currentMember.id, params.memberId);
   if (!conversation) return redirect(`/servers/${params.serverId}`);

   const { memberOne, memberTwo } = conversation;
   const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

   return (
      <div className="flex h-full flex-col bg-white p-3 dark:bg-[#313338]">
         <ChatHeader
            type="conversation"
            serverId={params?.serverId}
            name={otherMember.profile.name}
            imageUrl={otherMember.profile.imageUrl}
         />

         {searchParams?.video && <MediaRoom chatId={conversation.id} video={true} audio={true} />}

         {!searchParams?.video && (
            <ChatMessages
               type="conversation"
               chatId={conversation.id}
               name={otherMember.profile.name}
               member={currentMember}
               api={{
                  url: "/api/direct-messages",
                  socket: "/api/socket/direct-messages",
                  socketQuery: `conversationId=${conversation.id}&serverId=${params?.serverId}`,
               }}
               param={{ key: "conversationId", value: conversation.id }}
            />
         )}

         {!searchParams?.video && (
            <ChatInput
               type="conversation"
               name={otherMember.profile.name}
               api={{
                  url: `/api/socket/direct-messages?conversationId=${conversation.id}&serverId=${params?.serverId}`,
                  method: "post",
               }}
            />
         )}
      </div>
   );
};

export default MemberId;
