"use client";
import { Ref, useImperativeHandle, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { CommandDialog, CommandEmpty, CommandGroup } from "@/components/ui/command";
import { CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import type { SidebarSearchProps } from "./sidebar-search";

export type CommandProps = {
   onOpenCommand: () => void;
};

type SearchCommandProps = SidebarSearchProps & {
   commandRef: Ref<CommandProps>;
};

type DataProps = {
   id: string;
   type: "channel" | "member";
};

export const SearchCommand = ({ commandRef, data }: SearchCommandProps) => {
   const [open, setOpen] = useState(false);
   const router = useRouter();
   const params = useParams();

   const onOpenCommand = () => {
      setOpen(!open);
   };

   const onClick = ({ id, type }: DataProps) => {
      setOpen(false);
      if (type === "member") return router.push(`/servers/${params?.serverId}/conversations/${id}`);
      if (type === "channel") return router.push(`/servers/${params?.serverId}/channels/${id}`);
   };

   useImperativeHandle(commandRef, () => ({ onOpenCommand }));

   return (
      <CommandDialog open={open} onOpenChange={setOpen}>
         <CommandInput placeholder="Search All Channels And Members" />
         <CommandList>
            <CommandEmpty>No Results Found</CommandEmpty>

            {data.map(({ type, label, data }, i) => {
               if (!data.length) return;
               return (
                  <CommandGroup key={i} heading={label}>
                     {data.map(({ id, name, icon }) => (
                        <CommandItem key={id} onSelect={() => onClick({ id, type })}>
                           {icon}
                           <span>{name}</span>
                        </CommandItem>
                     ))}
                  </CommandGroup>
               );
            })}
         </CommandList>
      </CommandDialog>
   );
};
