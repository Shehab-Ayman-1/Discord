"use client";
import { useEffect, useState } from "react";

type ChatScrollProps = {
   chatRef: React.RefObject<HTMLDivElement>;
   bottomRef: React.RefObject<HTMLDivElement>;
   shouldLoadMore: boolean;
   onLoadMore: () => void;
   count: number;
};

export const useChatScroll = ({ bottomRef, chatRef, count, shouldLoadMore, onLoadMore }: ChatScrollProps) => {
   const [hasInitialized, setHasInitialized] = useState(false);

   // Auto Load The Previous Messages
   useEffect(() => {
      const topDiv = chatRef?.current;

      const onScroll = () => {
         const scrollTop = topDiv?.scrollTop;
         scrollTop === 0 && shouldLoadMore && onLoadMore();
      };

      topDiv?.addEventListener("scroll", onScroll);
      return () => topDiv?.removeEventListener("scroll", onScroll);
   }, [shouldLoadMore, chatRef, onLoadMore]);

   // Auto Scroll To The Bottom
   useEffect(() => {
      const bottomDiv = bottomRef?.current;
      const topDiv = chatRef?.current;

      const shouldAutoScroll = () => {
         if (!hasInitialized && bottomDiv) {
            setHasInitialized(true);
            return true;
         }

         if (!topDiv) return false;

         const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
         return distanceFromBottom <= 100;
      };

      if (shouldAutoScroll()) {
         setTimeout(() => {
            bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
         }, 100);
      }
   }, [bottomRef, chatRef, count, hasInitialized]);
};
