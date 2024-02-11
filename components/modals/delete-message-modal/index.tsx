"use client";
import { Fragment } from "react";

import { useModalStore } from "@/hooks/useModalStore";
import { ModalDeleteForm } from "../modal-delete-form";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";

type DeleteMessageProps = {};

const Description = () => {
   return (
      <Fragment>
         Are You Sure You Want To Do This <br />
         <span className="font-semibold text-indigo-500">The Message</span>
         Will Be Permanently Deleted
      </Fragment>
   );
};

export const DeleteMessageModal = ({}: DeleteMessageProps) => {
   const { type, data, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "deleteMessage"} onClose={onClose}>
         <ModalInfo title="Delete Message" description={<Description />} />
         <ModalDeleteForm api={data?.api!} />
      </ModalContent>
   );
};
