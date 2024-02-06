"use client";
import { PlusIcon } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";

type NavigationActionProps = {};

export const NavigationAction = ({}: NavigationActionProps) => {
   const { onOpen } = useModalStore();

   return (
      <ActionTooltip label="Add A Server" side="right" align="center">
         <Button
            className="flex-center hover:bg-transparenta group bg-transparent"
            onClick={() => onOpen("createServer")}
         >
            <div className="flex-center h-12 w-12 overflow-hidden rounded-full bg-background group-hover:rounded-[16px] group-hover:bg-emerald-500 dark:bg-neutral-700">
               <PlusIcon size={30} className="text-emerald-500 transition group-hover:text-white" />
            </div>
         </Button>
      </ActionTooltip>
   );
};
