import { cn } from "@/utils";

type MessageContentProps = {
   content: string;
   deleted: boolean;
   isUpdated: boolean;
   isOwner: boolean;
};

export const MessageContent = ({ content, deleted, isUpdated, isOwner }: MessageContentProps) => {
   return (
      <p
         className={cn(
            "text-sm text-zinc-600 dark:text-zinc-300",
            deleted && "mt-1 text-xs italic text-zinc-500 dark:text-zinc-400",
            !isOwner && "ml-auto text-end",
         )}
      >
         {content}
         {isUpdated && !deleted && <span className="px-1 text-emerald-400">(edited)</span>}
      </p>
   );
};
