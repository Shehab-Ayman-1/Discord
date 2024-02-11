"use client";
import type { ServerWithMembersWithProfiles } from "@/types";
import type { ModalType } from "@/hooks/useModalStore";
import { CHANNEL, Channel, MEMBER } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { EditIcon, HashIcon, LockIcon, MicIcon, Trash2Icon, VideoIcon } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/useModalStore";
import { cn } from "@/utils";
import { MouseEvent } from "react";

type ServerChannelProps = {
   channel: Channel;
   server: ServerWithMembersWithProfiles;
   role?: MEMBER;
};

const iconMap = {
   [CHANNEL.TEXT]: HashIcon,
   [CHANNEL.AUDIO]: MicIcon,
   [CHANNEL.VIDEO]: VideoIcon,
};

export const ServerChannel = ({ server, channel, role }: ServerChannelProps) => {
   const { onOpen } = useModalStore();
   const router = useRouter();
   const params = useParams();

   const Icon = iconMap[channel.type];

   const onNavigate = () => {
      router.push(`/servers/${server?.id}/channels/${channel.id}`);
   };

   const onAction = (event: MouseEvent, action: ModalType) => {
      event.stopPropagation();
      onOpen(action, { server, channel, channelType: channel?.type });
   };

   return (
      <button
         className={cn(
            "flex-start group mb-1 w-full rounded-md p-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50",
            params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700",
         )}
         onClick={onNavigate}
      >
         <Icon className="h-5 w-5 flex-shrink-0 text-zinc-500 dark:text-zinc-400" />
         <p
            className={cn(
               "line-clamp-1 text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300",
               params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white",
            )}
         >
            {channel.name}
         </p>
         {channel.name !== "general" && role !== MEMBER.GUEST && (
            <div className="flex-start ml-auto">
               <ActionTooltip label="Edit">
                  <EditIcon
                     className="hidden h-4 w-4 text-zinc-500 transition hover:text-zinc-600 group-hover:block dark:text-zinc-400 dark:hover:text-zinc-300"
                     onClick={(event) => onAction(event, "editChannel")}
                  />
               </ActionTooltip>

               <ActionTooltip label="Delete">
                  <Trash2Icon
                     className="hidden h-4 w-4 text-rose-500 transition hover:text-rose-600 group-hover:block dark:text-rose-400 dark:hover:text-rose-300"
                     onClick={(event) => onAction(event, "deleteChannel")}
                  />
               </ActionTooltip>
            </div>
         )}
         {channel.name === "general" && role !== MEMBER.GUEST && (
            <LockIcon className="ml-auto h-4 w-4 text-zinc-500 dark:text-zinc-400" />
         )}
      </button>
   );
};
