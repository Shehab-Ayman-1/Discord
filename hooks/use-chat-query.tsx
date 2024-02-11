"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSocket } from "@/components/providers/socket-provider";

type ChatQueryProps = {
   queryKey: string;
   apiUrl: string;
   param: { key: "channelId" | "conversationId"; value: string };
};

export const useChatQuery = ({ queryKey, apiUrl, param }: ChatQueryProps) => {
   const { isConnected } = useSocket();

   const fetchMessages = async ({ pageParam = undefined }) => {
      const url = `${apiUrl}?cursor=${pageParam}&${param.key}=${param.value}`;
      const response = await fetch(url);
      return response.json();
   };

   // @ts-ignore
   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: fetchMessages,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
      refetchInterval: isConnected ? false : 1000,
   });

   return { data, fetchNextPage, hasNextPage, isFetchingNextPage, status };
};
