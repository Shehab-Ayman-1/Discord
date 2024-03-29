"use client";
import { toast } from "sonner";

import { useModalStore } from "@/hooks/useModalStore";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";

type ModalFormProps = {};

type ModalFormResponse = {
   data?: string;
   success?: string;
   error?: string;
};

export const ModalForm = ({}: ModalFormProps) => {
   const { loading, execute } = useAxios<ModalFormResponse | undefined>();
   const { data, onClose } = useModalStore();

   const onConfirm = async () => {
      const { data: response, isSubmitted, error } = await execute("put", `/servers/${data?.server?.id}/leave`);
      if (isSubmitted && error) return toast.error(error);

      onClose();
      toast.success(response?.success);
      window.location.reload();
   };

   return (
      <div className="max-w-full p-6">
         <DialogFooter className="flex-between w-full px-6 py-4">
            <Button className="mr-auto dark:text-white" variant="ghost" onClick={onClose}>
               Cancel
            </Button>
            <Button variant="primary" disabled={loading} className="" onClick={onConfirm}>
               Confirm
            </Button>
         </DialogFooter>
      </div>
   );
};
