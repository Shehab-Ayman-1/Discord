"use client";
import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";
import { ModalForm } from "../modal-form";

type CreateServerModalProps = {};
export type ModalProps = {
   handleCloseModal: () => void;
};

export const CreateServerModal = ({}: CreateServerModalProps) => {
   const { type, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "createServer"} onClose={onClose}>
         <ModalInfo />
         <ModalForm api={{ url: "/api/servers", method: "post" }} useOnClose />
      </ModalContent>
   );
};
