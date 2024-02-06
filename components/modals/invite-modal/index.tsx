"use client";

import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";
import { InviteForm } from "./invite-form";

type InviteModalProps = {};

export const InviteModal = ({}: InviteModalProps) => {
   const { type, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "invite"} onClose={onClose}>
         <ModalInfo
            title="Invite Friends"
            description="While Generate A New Link, All The Previous Links While Blocked"
         />
         <InviteForm />
      </ModalContent>
   );
};
