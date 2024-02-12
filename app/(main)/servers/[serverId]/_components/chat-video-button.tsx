"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { VideoIcon, VideoOffIcon } from "lucide-react";

import { ActionTooltip } from "@/components/action-tooltip";

type ChatVideoButtonProps = {};

export const ChatVideoButton = ({}: ChatVideoButtonProps) => {
   const searchParams = useSearchParams();
   const pathname = usePathname();
   const router = useRouter();

   const isVideo = searchParams?.get("video");

   const onClick = () => {
      const url = `${pathname || ""}?${isVideo ? "" : "video=" + true}`;
      router.push(url);
   };

   const Icon = isVideo ? VideoOffIcon : VideoIcon;
   const tooltipLabel = isVideo ? "End Video Call" : "Start Video Call";

   return (
      <ActionTooltip side="bottom" label={tooltipLabel}>
         <button className="mr-4 transition hover:opacity-75" onClick={onClick}>
            <Icon className="h-6 w-6 text-zinc-500 dark:text-zinc-400" />
         </button>
      </ActionTooltip>
   );
};
