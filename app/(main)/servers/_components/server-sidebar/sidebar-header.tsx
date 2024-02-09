"use client";
import type { ServerWithMembersWithProfiles } from "@/types";
import { ChevronDownIcon, PlusCircleIcon, SettingsIcon, Trash2Icon, UserPlusIcon, UsersIcon } from "lucide-react";
import { MEMBER } from "@prisma/client";

import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useModalStore } from "@/hooks/useModalStore";

type SidebarHeaderProps = {
   role?: MEMBER;
   server: ServerWithMembersWithProfiles;
};

export const SidebarHeader = ({ role, server }: SidebarHeaderProps) => {
   const { onOpen } = useModalStore();
   const isAdmin = role === MEMBER.ADMIN;
   const isGuest = role === MEMBER.GUEST;
   const isModerator = isAdmin || role === MEMBER.MODERATOR;

   const onInvite = () => {
      onOpen("invite", { server });
   };

   const onSettings = () => {
      onOpen("editServer", { server });
   };

   const onMembers = () => {
      onOpen("members", { server });
   };

   const onChannel = () => {
      onOpen("createChannel", { server });
   };

   const onDelete = () => {
      onOpen("deleteServer", { server });
   };

   const onLeave = () => {
      onOpen("leaveServer", { server });
   };

   return (
      <DropdownMenu>
         <DropdownMenuTrigger className="focus:outline-none" asChild>
            <button className="flex-center h-12 w-full rounded-md border-b-2 border-neutral-200 px-2 text-base font-semibold transition hover:bg-zinc-700/10 dark:border-neutral-800 dark:hover:bg-zinc-700/50">
               {server.name}
               <ChevronDownIcon className="ml-auto h-5 w-5" />
            </button>
         </DropdownMenuTrigger>

         <DropdownMenuContent className="w-56 space-y-0.5 text-xs font-medium text-black dark:text-neutral-400">
            {isModerator && (
               <DropdownMenuItem
                  className="cursor-pointer px-3 py-2 text-sm text-indigo-600 dark:text-indigo-400"
                  onClick={onInvite}
               >
                  Invite Peaple
                  <UserPlusIcon className="ml-auto h-5 w-5" />
               </DropdownMenuItem>
            )}

            {isAdmin && (
               <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm" onClick={onSettings}>
                  Server Settings
                  <SettingsIcon className="ml-auto h-5 w-5" />
               </DropdownMenuItem>
            )}

            {isAdmin && (
               <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm" onClick={onMembers}>
                  Manage Members
                  <UsersIcon className="ml-auto h-5 w-5" />
               </DropdownMenuItem>
            )}

            {isModerator && (
               <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm" onClick={onChannel}>
                  Create Channel
                  <PlusCircleIcon className="ml-auto h-5 w-5" />
               </DropdownMenuItem>
            )}

            {isModerator && <DropdownMenuSeparator />}

            {isAdmin && (
               <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500" onClick={onDelete}>
                  Delete Server
                  <Trash2Icon className="ml-auto h-4 w-4" />
               </DropdownMenuItem>
            )}

            {isGuest && (
               <DropdownMenuItem className="cursor-pointer px-3 py-2 text-sm text-rose-500" onClick={onLeave}>
                  Leave Server
                  <Trash2Icon className="ml-auto h-4 w-4" />
               </DropdownMenuItem>
            )}
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
