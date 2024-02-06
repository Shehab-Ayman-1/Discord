"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";
import { MembersList } from "./members-list";

type MembersModalProps = {};

export const MembersModal = ({}: MembersModalProps) => {
   const { type, data, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "members"} onClose={onClose}>
         <ModalInfo title="Manage Members" description={`${data?.server?.members?.length} Members`} />
         <ScrollArea className="mt-8 max-h-[420px] pr-6">
            <MembersList />
         </ScrollArea>
      </ModalContent>
   );
};
