"use client";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { SetupModal } from "@/components/modals/setup-modal";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { UpdateServerModal } from "@/components/modals/update-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { MembersModal } from "@/components/modals/members-modal";
import { CreateChannelModal } from "@/components/modals/create-channel-modal";
import { LeaveServer } from "@/components/modals/leave-server-modal";
import { DeleteServer } from "@/components/modals/delete-server-modal";
import { DeleteChannel } from "@/components/modals/delete-channel-modal";
import { UpdateChannelModal } from "@/components/modals/update-channel-modal";

type ModalsProviderProps = {};

export const ModalsProvider = ({}: ModalsProviderProps) => {
   const [mounted, setMounted] = useState(false);
   const pathname = usePathname();

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return;

   return (
      <Fragment>
         <SetupModal isOpen={pathname === "/"} />
         <CreateServerModal />
         <UpdateServerModal />
         <InviteModal />
         <MembersModal />
         <CreateChannelModal />
         <LeaveServer />
         <DeleteServer />
         <DeleteChannel />
         <UpdateChannelModal />
      </Fragment>
   );
};
