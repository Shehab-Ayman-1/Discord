"use client";
import type { MemberWithProfile } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { Server } from "@prisma/client";

import { UserAvatar } from "@/components/user-avatar";
import { cn } from "@/utils";
import { roleIconMap } from ".";

type ServerMemberProps = {
   member: MemberWithProfile;
   server: Server;
};

export const ServerMember = ({ member }: ServerMemberProps) => {
   const params = useParams();
   const router = useRouter();

   const icon = roleIconMap[member.role];

   const onNavigate = () => {
      router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
   };

   return (
      <button
         className={cn(
            "flex-start group mb-1 w-full rounded-md p-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50",
            params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700",
         )}
         onClick={onNavigate}
      >
         <UserAvatar src={member.profile.imageUrl} className="h-8 w-8 md:h-8 md:w-8" />
         <p
            className={cn(
               "text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300",
               params?.memberId === member.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white",
            )}
         >
            {member.profile.name}
         </p>
         {icon}
      </button>
   );
};
