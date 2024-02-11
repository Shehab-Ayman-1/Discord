"use client";
import { toast } from "sonner";

import { useModalStore } from "@/hooks/useModalStore";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAxios } from "@/hooks/useAxios";

type InviteFormProps = {
   hardReload?: boolean;
   api: {
      url?: string;
      method?: "get" | "post" | "put" | "delete";
   };
};

type InviteDataProps = {
   data?: string;
   success?: string;
   error?: string;
};

export const ModalDeleteForm = ({ api, hardReload }: InviteFormProps) => {
   const { loading, execute } = useAxios<InviteDataProps | undefined>();
   const { onClose } = useModalStore();

   const onConfirm = async () => {
      const url = api.url?.startsWith("/api") ? api.url.slice(5) : api.url;
      const { data: response, isSubmitted, error } = await execute(api.method, url);
      if (isSubmitted && error) return toast.error(error);

      onClose();
      toast.success(response?.success);
      hardReload && window.location.reload();
   };

   return (
      <div className="max-w-full p-6">
         <DialogFooter className="flex-between w-full flex-row px-6 py-4">
            <Button variant="ghost" className="mr-auto dark:text-white" onClick={onClose}>
               Cancel
            </Button>
            <Button variant="primary" disabled={loading} onClick={onConfirm}>
               Confirm
            </Button>
         </DialogFooter>
      </div>
   );
};
