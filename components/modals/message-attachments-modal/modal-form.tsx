"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

import { useModalStore } from "@/hooks/useModalStore";
import { DialogFooter } from "@/components/ui/dialog";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";

type ModalFormProps = {};

const schema = z.object({
   attachment: z.string().min(1, { message: "Attachment Is Required." }),
});

export type DataType = z.infer<typeof schema>;

export const ModalForm = ({}: ModalFormProps) => {
   const { data, onClose } = useModalStore();
   const router = useRouter();

   const { handleSubmit, setValue, setError, reset, formState } = useForm({
      defaultValues: { attachment: "" },
      resolver: zodResolver(schema),
   });

   const onSubmit = async (values: DataType) => {
      try {
         const url = data?.api?.url || "";
         const method = data?.api?.method || "post";
         const response = await axios[method](url, { ...values, content: "attachment" });

         reset();
         onClose();
         router.refresh();
      } catch (error) {
         const reason = error as any;
         console.log(reason?.response);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
         <div className="flex-center mx-auto w-fit cursor-pointer text-center text-zinc-500">
            <FileUpload endpoint="uploadAttachment" value="attachment" setValue={setValue} setError={setError} />
         </div>

         <p className="text-rose-500 dark:text-rose-800">{formState.errors.attachment?.message}</p>

         <DialogFooter className="bg-indigo-50 px-6 py-4 dark:bg-zinc-800">
            <Button variant="primary" type="submit" disabled={formState.isSubmitting} className="w-full">
               Submit
            </Button>
         </DialogFooter>
      </form>
   );
};
