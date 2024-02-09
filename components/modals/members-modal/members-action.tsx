"use client";
import { type LucideIcon, ShieldIcon, ShieldQuestionIcon, ShieldCheckIcon } from "lucide-react";
import { CheckIcon, MoreVertical, GavelIcon, Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { MEMBER } from "@prisma/client";
import { toast } from "sonner";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub } from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenuSubContent } from "@/components/ui/dropdown-menu";
import { useAxios } from "@/hooks/useAxios";
import { useModalStore } from "@/hooks/useModalStore";

type MemberActionProps = {
   role: MEMBER;
   memberId: string;
};

type MemberItemProps = {
   text: string;
   role: MEMBER;
   roleValue: MEMBER;
   Icon: LucideIcon;
   onRoleChange: (role: MEMBER) => void;
};

const MenuItem = ({ text, role, roleValue, Icon, onRoleChange }: MemberItemProps) => {
   return (
      <DropdownMenuItem onClick={() => onRoleChange(roleValue)}>
         <ShieldIcon className="mr-2 h-4 w-4" />
         {text}
         {role === roleValue && <Icon className="ml-auto h-4 w-4" />}
      </DropdownMenuItem>
   );
};

export const MemberAction = ({ role, memberId }: MemberActionProps) => {
   const { loading: changeRoleLoading, execute: changeRoleExecute } = useAxios();
   const { loading: kickLoading, execute: kickExecute } = useAxios();
   const { data, onOpen } = useModalStore();
   const router = useRouter();

   const onRoleChange = async (role: MEMBER) => {
      const serverId = data?.server?.id;

      const url = `/members/${memberId}?serverId=${serverId}`;
      const { data: res, isSubmitted, error } = await changeRoleExecute("put", url, { role });

      if (isSubmitted && error) return toast.error(error);
      else toast.success(res.success);

      router.refresh();
      onOpen("members", { server: res.data });
   };

   const onKick = async () => {
      const serverId = data?.server?.id;
      const response = await kickExecute("delete", `/members/${memberId}?serverId=${serverId}`);

      if (response.isSubmitted && response.error) return toast.error(response.error);
      else toast.success(response.data.success);

      router.refresh();
      onOpen("members", { server: response.data.data });
   };

   if (changeRoleLoading || kickLoading)
      return <Loader2Icon className="ml-auto h-4 w-4 animate-spin text-zinc-500" />;

   return (
      <DropdownMenu>
         <DropdownMenuTrigger>
            <MoreVertical className="h-4 w-4 text-zinc-500" />
         </DropdownMenuTrigger>

         <DropdownMenuContent side="left">
            <DropdownMenuSub>
               <DropdownMenuSubTrigger className="flex-start">
                  <ShieldQuestionIcon className="mr-2 h-4 w-4" />
                  <span>Role</span>
               </DropdownMenuSubTrigger>

               <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                     <MenuItem
                        text="Guest"
                        role={role}
                        roleValue="GUEST"
                        Icon={CheckIcon}
                        onRoleChange={onRoleChange}
                     />

                     <MenuItem
                        text="Moderator"
                        role={role}
                        roleValue="MODERATOR"
                        Icon={ShieldCheckIcon}
                        onRoleChange={onRoleChange}
                     />
                  </DropdownMenuSubContent>
               </DropdownMenuPortal>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={onKick}>
               <GavelIcon className="mr-2 h-4 w-4" />
               Kick Out
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
