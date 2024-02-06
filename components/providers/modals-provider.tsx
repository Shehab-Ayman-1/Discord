"use client";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { SetupModal } from "@/components/modals/setup-modal";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { UpdateServerModal } from "@/components/modals/update-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { MembersModal } from "@/components/modals/members-modal";

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
      </Fragment>
   );
};
