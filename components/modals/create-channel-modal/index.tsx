"use client";
import { useParams } from "next/navigation";

import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";
import { ModalForm } from "./modal-form";

type CreateChannelModalProps = {};

export const CreateChannelModal = ({}: CreateChannelModalProps) => {
   const { type, isOpen, onClose } = useModalStore();
   const params = useParams();

   return (
      <ModalContent isOpen={isOpen && type === "createChannel"} onClose={onClose}>
         <ModalInfo title="Create Channel" description=" " />
         <ModalForm api={{ url: `/api/channels?serverId=${params.serverId}`, method: "post" }} />
      </ModalContent>
   );
};
