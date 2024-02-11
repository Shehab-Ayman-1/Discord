"use client";
import { MEMBER, Member, Profile } from "@prisma/client";
import { useCallback, useState } from "react";
import { useParams } from "next/navigation";

import { MessageAvatar } from "./message-avatar";
import { MessageDetails } from "./message-details";
import { MessageContent } from "./message-content";
import { MessageActions } from "./message-actions";
import { MessageForm } from "./message-form";
import { MessageImage } from "./message-image";
import { MessagePDF } from "./message-pdf";
import { cn } from "@/utils";

type ChatMessageProps = {
   messageId: string;
   content: string;
   member: Member & { profile: Profile };
   timestamp: string;
   attachment: string | null;
   deleted: boolean;
   currentMember: Member;
   isUpdated: boolean;
   socket: { url: string; query: string };
};

export const ChatMessage = ({
   messageId,
   content,
   attachment,
   member,
   deleted,
   isUpdated,
   socket,
   timestamp,
   currentMember,
}: ChatMessageProps) => {
   const [isEditing, setIsEditing] = useState(false);
   const params = useParams();

   const isModerator = currentMember.role === MEMBER.MODERATOR;
   const isAdmin = currentMember.role === MEMBER.ADMIN;
   const isOwner = currentMember.id === member.id;

   const canDeleteMessage = isAdmin || isModerator || isOwner;
   const canEditMessage = !deleted && !attachment && isOwner;

   const ext = attachment?.split(".").pop();
   const isPDF = ext === "pdf" && attachment;
   const isImage = ext !== "pdf" && attachment;

   const apiUrl = `${socket.url}/${messageId}?${socket.query}`;

   const onEditing = useCallback(() => {
      setIsEditing(!isEditing);
   }, [isEditing]);

   return (
      <div className="flex-start group w-full p-4 transition hover:bg-black/5">
         <div className="group flex w-full items-start gap-2">
            {isOwner && (
               <MessageAvatar
                  serverId={params?.serverId as string}
                  memberId={member.id}
                  avatar={member.profile.imageUrl}
               />
            )}

            <div
               className={cn(
                  "relative flex w-full max-w-xl flex-col rounded-md bg-rose-100 px-2 py-4 shadow-md dark:bg-zinc-700",
                  !isOwner && "ml-auto",
               )}
            >
               <MessageDetails
                  serverId={params?.serverId as string}
                  memberId={member.id}
                  name={member.profile.name}
                  isOwner={isOwner}
                  role={member.role}
                  timestamp={timestamp}
               />

               {isImage && <MessageImage attachment={attachment} />}

               {isPDF && <MessagePDF attachment={attachment} />}

               {!attachment && !isEditing && (
                  <MessageContent content={content} isOwner={isOwner} deleted={deleted} isUpdated={isUpdated} />
               )}

               {!attachment && isEditing && (
                  <MessageForm onEditing={onEditing} apiUrl={apiUrl} content={content} />
               )}

               {canDeleteMessage && (
                  <MessageActions
                     isOwner={isOwner}
                     onEditing={onEditing}
                     apiUrl={apiUrl}
                     canEditMessage={canEditMessage}
                  />
               )}
            </div>
         </div>

         {!isOwner && (
            <MessageAvatar
               serverId={params?.serverId as string}
               memberId={member.id}
               avatar={member.profile.imageUrl}
            />
         )}
      </div>
   );
};
