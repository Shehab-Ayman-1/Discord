"use client";
import { useRef } from "react";
import { SearchIcon } from "lucide-react";
import { useEventListener } from "usehooks-ts";

import { ScrollArea } from "@/components/ui/scroll-area";
import { CommandProps, SearchCommand } from "./search-command";

export type SidebarSearchProps = {
   data: {
      label: string;
      type: "channel" | "member";
      data: {
         id: string;
         name: string;
         icon: React.ReactNode;
      }[];
   }[];
};

export const SidebarSearch = ({ data }: SidebarSearchProps) => {
   const ref = useRef<CommandProps>(null);

   const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "x" && (event.altKey || event.metaKey)) {
         ref.current?.onOpenCommand();
      }
   };

   useEventListener("keydown", onKeyDown);

   return (
      <ScrollArea className="">
         <div className="mt-2">
            <button
               className="flex-start group w-full rounded-md px-2 py-2 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50"
               onClick={() => ref.current?.onOpenCommand()}
            >
               <SearchIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
               <p className="text-sm font-semibold text-zinc-500 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300">
                  Search
               </p>
               <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  <span className="text-xs">ALT</span>X
               </kbd>
            </button>

            <SearchCommand commandRef={ref} data={data} />
         </div>
      </ScrollArea>
   );
};
