"use client";
import { Fragment } from "react";
import { useParams } from "next/navigation";

import { useModalStore } from "@/hooks/useModalStore";
import { ModalDeleteForm } from "../modal-delete-form";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";

type DeleteChannelProps = {};

const Description = ({ name }: { name: string }) => {
   return (
      <Fragment>
         Are You Sure You Want To Do This <br />
         <span className="font-semibold text-indigo-500">{name}</span>
         Will Be Permanently Deleted
      </Fragment>
   );
};

export const DeleteChannel = ({}: DeleteChannelProps) => {
   const { type, data, isOpen, onClose } = useModalStore();
   const params = useParams();

   return (
      <ModalContent isOpen={isOpen && type === "deleteChannel"} onClose={onClose}>
         <ModalInfo title="Delete Channel" description={<Description name={data?.channel?.name || ""} />} />
         <ModalDeleteForm
            hardReload
            api={{ url: `/channels/${data?.channel?.id}?serverId=${params?.serverId}`, method: "delete" }}
         />
      </ModalContent>
   );
};
