"use client";
import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalForm } from "../modal-form";
import { ModalInfo } from "../modal-info";

type UpdateServerModalProps = {};

export const UpdateServerModal = ({}: UpdateServerModalProps) => {
   const { type, data, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "editServer"} onClose={onClose}>
         <ModalInfo />
         <ModalForm
            api={{ url: `/api/servers/${data?.server?.id}`, method: "put" }}
            useOnClose
            useInitialServerData
         />
      </ModalContent>
   );
};
