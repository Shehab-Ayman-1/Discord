"use client";
import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";
import { ModalCreateForm } from "../modal-create-form";

type CreateServerModalProps = {};

export const CreateServerModal = ({}: CreateServerModalProps) => {
   const { type, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "createServer"} onClose={onClose}>
         <ModalInfo />
         <ModalCreateForm api={{ url: "/api/servers", method: "post" }} useOnClose />
      </ModalContent>
   );
};
