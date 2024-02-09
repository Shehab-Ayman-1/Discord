"use client";
import { Fragment } from "react";

import { useModalStore } from "@/hooks/useModalStore";
import { ModalDeleteForm } from "../modal-delete-form";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";

type DeleteServerProps = {};

const Description = ({ name }: { name: string }) => {
   return (
      <Fragment>
         Are You Sure You Want To Do This <br />
         <span className="font-semibold text-indigo-500">{name}</span>
         Will Be Permanently Deleted
      </Fragment>
   );
};

export const DeleteServer = ({}: DeleteServerProps) => {
   const { type, data, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "deleteServer"} onClose={onClose}>
         <ModalInfo title="Delete Server" description={<Description name={data?.server?.name || ""} />} />
         <ModalDeleteForm api={{ url: `/servers/${data?.server?.id}`, method: "delete" }} />
      </ModalContent>
   );
};
