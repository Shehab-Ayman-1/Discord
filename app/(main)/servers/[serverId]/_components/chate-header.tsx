import { HashIcon } from "lucide-react";

import { SocketIndecator } from "@/components/socket-indecator";
import { MobileToggle } from "@/components/mobile-toggle";
import { UserAvatar } from "@/components/user-avatar";
import { ChatVideoButton } from "./chat-video-button";

type ChatHeaderProps = {
   serverId: string;
   name: string;
   type: "channel" | "conversation";
   imageUrl?: string;
};

export const ChatHeader = ({ type, serverId, name, imageUrl }: ChatHeaderProps) => {
   return (
      <div className="flex-start h-12 border-b-2 border-neutral-200 px-3 text-base font-semibold dark:border-neutral-800">
         <MobileToggle serverId={serverId} />

         {type === "channel" && <HashIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />}

         {type === "conversation" && <UserAvatar src={imageUrl} className="h-8 w-8 md:h-8 md:w-8" />}

         <p className="text-base font-semibold text-black dark:text-white">{name}</p>

         <div className="flex-start ml-auto">
            {type === "conversation" && <ChatVideoButton />}
            <SocketIndecator />
         </div>
      </div>
   );
};
