"use client";
import { useParams } from "next/navigation";

import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";
import { ModalForm } from "../create-channel-modal/modal-form";

type UpdateChannelModalProps = {};

export const UpdateChannelModal = ({}: UpdateChannelModalProps) => {
   const { type, data, isOpen, onClose } = useModalStore();
   const params = useParams();

   return (
      <ModalContent isOpen={isOpen && type === "editChannel"} onClose={onClose}>
         <ModalInfo title="Update Channel" description=" " />
         <ModalForm
            api={{ url: `/api/channels/${data?.channel?.id}?serverId=${params?.serverId}`, method: "put" }}
         />
      </ModalContent>
   );
};
