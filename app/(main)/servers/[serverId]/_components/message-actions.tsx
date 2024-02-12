"use client";
import { EditIcon, Trash2Icon } from "lucide-react";
import { memo } from "react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/useModalStore";
import { cn } from "@/utils";

type MessageActionsProps = {
   canEditMessage: boolean;
   apiUrl: string;
   isOwner: boolean;
   onEditing: () => void;
};

export const MessageActions = memo(({ canEditMessage, isOwner, apiUrl, onEditing }: MessageActionsProps) => {
   const { onOpen } = useModalStore();

   return (
      <div
         className={cn(
            "absolute -top-2 hidden items-center gap-2 rounded-sm border bg-white p-1 group-hover:flex dark:bg-zinc-800",
            !isOwner ? "left-5" : "right-5",
         )}
      >
         {canEditMessage && (
            <ActionTooltip label="Edit">
               <EditIcon
                  className="ml-auto h-4 w-4 cursor-pointer text-zinc-500 transition hover:text-zinc-600 dark:hover:text-zinc-300"
                  onClick={onEditing}
               />
            </ActionTooltip>
         )}

         <ActionTooltip label="Delete">
            <Trash2Icon
               className="ml-auto h-4 w-4 cursor-pointer text-rose-500 transition hover:text-rose-600 dark:hover:text-rose-300"
               onClick={() => onOpen("deleteMessage", { api: { url: apiUrl, method: "delete" } })}
            />
         </ActionTooltip>
      </div>
   );
});

MessageActions.displayName = "MessageActions";
