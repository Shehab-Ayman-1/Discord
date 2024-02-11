"use client";
import { useRouter } from "next/navigation";

import { UserAvatar } from "@/components/user-avatar";

type MessageAvatarProps = {
   serverId: string;
   memberId: string;
   avatar: string;
};

export const MessageAvatar = ({ serverId, memberId, avatar }: MessageAvatarProps) => {
   const router = useRouter();

   const onNavigate = () => {
      router.push(`/servers/${serverId}/conversations/${memberId}`);
   };

   return (
      <div className="mb-auto cursor-pointer transition hover:drop-shadow-md" onClick={onNavigate}>
         <UserAvatar src={avatar} />
      </div>
   );
};
