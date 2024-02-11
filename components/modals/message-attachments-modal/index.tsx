"use client";
import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";
import { ModalForm } from "./modal-form";

type SetupModalProps = {};

export const MessageAttachments = ({}: SetupModalProps) => {
   const { type, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "messageAttachments"} onClose={onClose}>
         <ModalInfo title="Add An Attachment" description="Send An Attachment As A Message" />
         <ModalForm />;
      </ModalContent>
   );
};
