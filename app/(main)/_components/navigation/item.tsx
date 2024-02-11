"use client";
import { useParams, useRouter } from "next/navigation";
import { Server } from "@prisma/client";

import { ActionTooltip } from "@/components/action-tooltip";
import { Button } from "@/components/ui/button";
import { cn, prisma } from "@/utils";
import Image from "next/image";

type NavigationItemProps = {
   server: Server;
};

export const NavigationItem = ({ server }: NavigationItemProps) => {
   const params = useParams();
   const router = useRouter();

   const onClick = () => {
      router.push(`/servers/${server.id}`);
   };

   return (
      <ActionTooltip label={server.name} side="right" align="center">
         <Button className="flex-start group relative mb-5 bg-transparent hover:bg-transparent" onClick={onClick}>
            <div
               className={cn(
                  "absolute left-1 h-full w-1 rounded-r-full bg-emerald-500 transition-all dark:bg-white",
                  params?.serverId === server.id ? "h-9" : "h-2 group-hover:h-4",
               )}
            />

            <div
               className={cn(
                  "group relative h-9 w-9 overflow-hidden rounded-full transition-all group-hover:rounded-[10px]",
                  params?.serverId === server.id && "rounded-[16px] bg-primary/10 text-primary",
               )}
            >
               <Image src={server.imageUrl} alt="channel" width={80} height={80} />
            </div>
         </Button>
      </ActionTooltip>
   );
};
