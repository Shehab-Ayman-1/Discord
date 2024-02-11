"use client";
import { ShieldAlert, ShieldIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MEMBER } from "@prisma/client";

import { ActionTooltip } from "@/components/action-tooltip";
import { cn } from "@/utils";

type MessageDetailsProps = {
   serverId: string;
   memberId: string;
   name: string;
   role: MEMBER;
   timestamp: string;
   isOwner: boolean;
};

const roleIconMap = {
   [MEMBER.GUEST]: <UserIcon className="h-4 w-4 dark:text-white" />,
   [MEMBER.MODERATOR]: <ShieldIcon className="h-4 w-4 dark:text-indigo-500" />,
   [MEMBER.ADMIN]: <ShieldAlert className="h-4 w-4 dark:text-rose-500" />,
};

export const MessageDetails = ({ serverId, memberId, name, role, isOwner, timestamp }: MessageDetailsProps) => {
   const router = useRouter();

   const onNavigate = () => {
      router.push(`/servers/${serverId}/conversations/${memberId}`);
   };

   return (
      <div className="mb-1">
         <div className={cn("flex-start", !isOwner && "flex-row-reverse")}>
            <div className={cn("flex-start", !isOwner && "flex-row-reverse")}>
               <p className="cursor-pointer text-sm font-semibold hover:underline" onClick={onNavigate}>
                  {name}
               </p>
               <ActionTooltip label={role}>
                  <p>{roleIconMap[role]}</p>
               </ActionTooltip>
            </div>
         </div>

         <span className={cn("block w-fit text-[10px] text-zinc-500 dark:text-zinc-400", !isOwner && "ml-auto")}>
            {timestamp}
         </span>
      </div>
   );
};
