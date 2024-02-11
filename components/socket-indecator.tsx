"use client";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

type SocketIndecatorProps = {};

export const SocketIndecator = ({}: SocketIndecatorProps) => {
   const { isConnected } = useSocket();

   if (!isConnected) {
      return (
         <Badge variant="outline" className="border-none bg-yellow-600 text-white">
            Fallback: Polling Every 1s
         </Badge>
      );
   }

   return (
      <Badge variant="outline" className="border-none bg-emerald-600 text-white">
         Live
      </Badge>
   );
};
