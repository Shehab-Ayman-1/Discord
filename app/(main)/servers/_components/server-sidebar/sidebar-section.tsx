"use client";
import type { ServerWithMembersWithProfiles } from "@/types";
import { CHANNEL, Channel, MEMBER } from "@prisma/client";
import { PlusIcon, SettingsIcon } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/useModalStore";

type ServerSectionsProps = {
   label: string;
   role?: MEMBER;
   sectionType: "channels" | "members";
   channelType?: CHANNEL;
   server?: ServerWithMembersWithProfiles;
};

export const ServerSection = ({ label, role, sectionType, channelType, server }: ServerSectionsProps) => {
   const { onOpen } = useModalStore();

   return (
      <div className="flex-between py-3">
         <p className="dark:zinc-400 text-xs font-semibold uppercase text-zinc-500">{label}</p>

         {role !== MEMBER.GUEST && sectionType === "channels" && (
            <ActionTooltip label="Create Channel" side="top">
               <button
                  className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
                  onClick={() => onOpen("createChannel", { channelType })}
               >
                  <PlusIcon className="h-4 w-4" />
               </button>
            </ActionTooltip>
         )}

         {role === MEMBER.ADMIN && sectionType === "members" && (
            <ActionTooltip label="Manage Members" side="top">
               <button
                  className="text-zinc-500 transition hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
                  onClick={() => onOpen("members", { server })}
               >
                  <SettingsIcon className="h-4 w-4" />
               </button>
            </ActionTooltip>
         )}
      </div>
   );
};
