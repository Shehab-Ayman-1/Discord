"use client";
import { Member, Message, Profile } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";

import { useSocket } from "@/components/providers/socket-provider";
import { useEffect } from "react";

type ChatSocketProps = {
   addKey: string;
   updateKey: string;
   queryKey: string;
};

type MessageProps = Message & {
   member: Member & {
      profile: Profile;
   };
};

export const useChatSocket = ({ addKey, updateKey, queryKey }: ChatSocketProps) => {
   const { socket } = useSocket();
   const queryClient = useQueryClient();

   useEffect(() => {
      if (!socket) return;

      const onUpdate = (message: MessageProps) => {
         const updater = (oldData: any) => {
            if (!oldData || !oldData?.pages || oldData?.pages?.length === 0) return oldData;

            const newData = oldData.pages.map((page: any) => {
               const messages = page.messages.map((msg: MessageProps) => (msg.id === message.id ? message : msg));
               return { ...page, messages };
            });

            return newData;
         };

         queryClient?.setQueryData([queryKey], updater);
      };

      socket.on(updateKey, onUpdate);

      const onAdd = (message: MessageProps) => {
         const adder = (oldData: any) => {
            if (!oldData || !oldData?.pages || oldData?.pages?.length === 0)
               return { pages: [{ messages: [message] }] };

            const newData = [...oldData.pages];
            newData[0] = { ...newData[0], messages: [message, ...newData[0].messages] };

            return { ...oldData, pages: newData };
         };

         queryClient?.setQueryData([queryKey], adder);
      };

      socket.on(addKey, onAdd);

      return () => {
         socket.off(updateKey);
         socket.off(addKey);
      };
   }, [addKey, updateKey, queryKey, queryClient, socket]);
};
