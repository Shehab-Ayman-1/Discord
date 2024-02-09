"use client";
import { Fragment } from "react";
import { useModalStore } from "@/hooks/useModalStore";
import { ModalContent } from "../modal-content";
import { ModalInfo } from "../modal-info";
import { ModalForm } from "./modal-form";

type LeaveServerProps = {};

const Description = ({ name }: { name: string }) => {
   return (
      <Fragment>
         Are You Sure You Want To Leave <span className="font-semibold text-indigo-500">{name}</span> server
      </Fragment>
   );
};

export const LeaveServer = ({}: LeaveServerProps) => {
   const { type, data, isOpen, onClose } = useModalStore();

   return (
      <ModalContent isOpen={isOpen && type === "leaveServer"} onClose={onClose}>
         <ModalInfo title="Leave Server" description={<Description name={data?.server?.name || ""} />} />
         <ModalForm />
      </ModalContent>
   );
};
