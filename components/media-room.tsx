"use client";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useState, useEffect } from "react";
import { Loader2Icon } from "lucide-react";
import { useUser } from "@clerk/nextjs";

type MediaRoomProps = {
   chatId: string;
   audio: boolean;
   video: boolean;
};

export const MediaRoom = ({ chatId, audio, video }: MediaRoomProps) => {
   const { user } = useUser();
   const [token, setToken] = useState("");

   useEffect(() => {
      if (!user?.firstName || !user?.lastName) return;
      const name = `${user.firstName} ${user.lastName}`;

      (async () => {
         try {
            const response = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
            const data = await response.json();
            setToken(data.token);
         } catch (error) {
            console.log(error);
         }
      })();
   }, [user?.firstName, user?.lastName, chatId]);

   if (!token) {
      <div className="flex-center flex-1 flex-col">
         <Loader2Icon className="my-4 h-7 w-7 animate-spin text-zinc-500" />
         <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>;
   }

   return (
      <LiveKitRoom
         data-lk-theme="default"
         serverUrl={process.env.NEXT_PUBLIC_WEBSOCKET_URL}
         token={token}
         connect={true}
         video={video}
         audio={audio}
      >
         <VideoConference />
      </LiveKitRoom>
   );
};
