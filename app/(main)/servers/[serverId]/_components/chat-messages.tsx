"use client";
import type { MessageWithMemberWithProfile } from "@/types";
import type { Member } from "@prisma/client";
import { Loader2Icon, ServerCrashIcon } from "lucide-react";
import { Fragment, useRef } from "react";
import { format } from "date-fns";

import { useChatSocket } from "@/hooks/useChatSocket";
import { useChatScroll } from "@/hooks/useChatScroll";
import { useChatQuery } from "@/hooks/useChatQuery";
import { Button } from "@/components/ui/button";
import { ChatWelcome } from "./chat-welcome";
import { ChatMessage } from "./chat-message";

type ChatMessagesProps = {
   type: "channel" | "conversation";
   chatId: string;
   name: string;
   member: Member;
   api: { url: string; socket: string; socketQuery: string };
   param: { key: "channelId" | "conversationId"; value: string };
};

const DATE_FORMAT = "d MMM yyyy, HH:mm";
export const ChatMessages = ({ type, chatId, name, member, api, param }: ChatMessagesProps) => {
   const chatRef = useRef<HTMLDivElement | null>(null);
   const bottomRef = useRef<HTMLDivElement | null>(null);

   const queryKey = `chat:${chatId}`;
   const addKey = `chat:${chatId}:messages`;
   const updateKey = `chat:${chatId}:messages:update`;

   const { data, hasNextPage, isFetchingNextPage, status, fetchNextPage } = useChatQuery({
      queryKey,
      apiUrl: api.url,
      param,
   });

   const shouldLoadMore = !isFetchingNextPage && !!hasNextPage;
   const count = data?.pages?.[0]?.messages?.length || 0;

   useChatSocket({ queryKey, addKey, updateKey });
   useChatScroll({ chatRef, bottomRef, onLoadMore: fetchNextPage, shouldLoadMore, count });

   if (status === "pending") return <ChatMessages.Pending />;
   if (status === "error") return <ChatMessages.Error />;

   return (
      <div ref={chatRef} className="flex flex-1 flex-col overflow-y-auto py-4">
         {!hasNextPage && <div className="flex-1" />}
         {!hasNextPage && <ChatWelcome type={type} name={name} />}

         {hasNextPage && (
            <ChatMessages.NextPage fetchNextPage={fetchNextPage} isFetchingNextPage={isFetchingNextPage} />
         )}

         <div className="mt-auto flex flex-col-reverse">
            {data?.pages?.map((group, i) => (
               <Fragment key={i}>
                  {group?.messages.map((message: MessageWithMemberWithProfile) => (
                     <ChatMessages.Message key={message.id} message={message} api={api} member={member} />
                  ))}
               </Fragment>
            ))}
         </div>

         <div className="bottom-ref" ref={bottomRef} />
      </div>
   );
};

ChatMessages.displayName = "Chat Messages";

ChatMessages.Pending = function Pending() {
   return (
      <div className="flex-center flex flex-1 flex-col">
         <Loader2Icon className="my-4 h-7 w-7 animate-spin text-zinc-500" />
         <p className="dark:text-zinc 400 text-xs text-zinc-500">Loading Messages...</p>
      </div>
   );
};

ChatMessages.Error = function Error() {
   return (
      <div className="flex-center flex flex-1 flex-col">
         <ServerCrashIcon className="my-4 h-7 w-7 text-zinc-500" />
         <p className="dark:text-zinc 400 text-xs text-zinc-500">Something Went Wrong!</p>
      </div>
   );
};

type NextPageProps = {
   isFetchingNextPage: boolean;
   fetchNextPage: () => void;
};

ChatMessages.NextPage = function NextPage({ isFetchingNextPage, fetchNextPage }: NextPageProps) {
   return (
      <div className="flex justify-center">
         {isFetchingNextPage ? (
            <Loader2Icon className="my-4 h-6 w-6 animate-spin text-zinc-500" />
         ) : (
            <Button
               className="my-4 text-xs text-zinc-500 shadow-md transition dark:text-zinc-300 dark:hover:text-zinc-300"
               onClick={() => fetchNextPage()}
            >
               Load Previous Messages
            </Button>
         )}
      </div>
   );
};

type MessageProps = {
   message: MessageWithMemberWithProfile;
   member: Member;
   api: { url: string; socket: string; socketQuery: string };
};

ChatMessages.Message = function Message({ message, member, api }: MessageProps) {
   return (
      <ChatMessage
         key={message.id}
         messageId={message.id}
         currentMember={member}
         member={message.member}
         content={message.content}
         attachment={message.attachment}
         deleted={message.deleted}
         timestamp={format(new Date(message.updatedAt), DATE_FORMAT)}
         isUpdated={message.updatedAt !== message.createdAt}
         socket={{ url: api.socket, query: api.socketQuery }}
      />
   );
};
