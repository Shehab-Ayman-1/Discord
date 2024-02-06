"use client";
import type { MemberWithProfile } from "@/types";
import { ShieldAlertIcon, ShieldCheckIcon, UserIcon } from "lucide-react";
import { Fragment } from "react";

import { UserAvatar } from "@/components/user-avatar";
import { useModalStore } from "@/hooks/useModalStore";
import { MemberAction } from "./members-action";

type MembersItemProps = {
   member: MemberWithProfile;
};

const roleIconMap = {
   GUEST: <UserIcon className="ml-2 h-4 w-4 dark:text-white" />,
   ADMIN: <ShieldAlertIcon className="ml-2 h-4 w-4 text-rose-500" />,
   MODERATOR: <ShieldCheckIcon className="ml-2 h-4 w-4 text-indigo-500" />,
};

export const MembersItem = ({ member }: MembersItemProps) => {
   const { data } = useModalStore();

   return (
      <Fragment>
         <UserAvatar src={member.profile.imageUrl} />
         <div className="flex flex-col gap-y-1">
            <div className="flex-start gap-x-1 text-xs font-semibold dark:text-dimWhite">
               {member.profile.name}
               {roleIconMap[member.role]}
            </div>
            <p className="text-xs text-zinc-500">{member.profile.email}</p>
         </div>

         {member.profileId !== data?.server?.id && (
            <div className="ml-auto">
               <MemberAction role={member.role} memberId={member.id} />
            </div>
         )}
      </Fragment>
   );
};
