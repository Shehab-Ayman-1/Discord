"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";

import { useModalStore } from "@/hooks/useModalStore";
import { DialogFooter } from "@/components/ui/dialog";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils";

type ModalFormProps = {
   api: { url: string; method: "get" | "post" | "put" | "delete" };
   useOnClose?: boolean;
   useInitialServerData?: boolean;
};

const schema = z.object({
   name: z.string().min(5, { message: "Name Must Be Within 5 Characters OR More" }),
   imageUrl: z.string().min(1, { message: "Image Is Required" }),
});

export type DataType = z.infer<typeof schema>;

export const ModalCreateForm = ({ api, useOnClose, useInitialServerData }: ModalFormProps) => {
   const { data, onClose } = useModalStore();
   const router = useRouter();

   const { register, handleSubmit, setValue, setError, watch, reset, formState } = useForm({
      defaultValues: { name: "", imageUrl: "" },
      resolver: zodResolver(schema),
   });

   const imageUrl = watch("imageUrl");

   useEffect(() => {
      // While Update Server Modal
      if (!useInitialServerData || !data?.server) return;
      setValue("name", data.server.name);
      setValue("imageUrl", data.server.imageUrl);
   }, [data?.server, setValue, useInitialServerData]);

   const onSubmit = async (values: DataType) => {
      try {
         const response = await axios[api.method](api.url, values);
         router.refresh();

         reset();
         useOnClose && onClose();

         toast.success(response.data?.success);
      } catch (error) {
         const reason = error as any;
         console.log(reason);
         toast.error(reason.response?.error);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
         <div className="flex-center mx-auto w-fit cursor-pointer text-center text-zinc-500">
            <FileUpload endpoint="uploadImage" initialValue={imageUrl} setValue={setValue} setError={setError} />
         </div>

         <Label
            htmlFor="server"
            className={cn("mb-0 text-xs font-bold uppercase text-zinc-500 dark:text-dimWhite")}
         >
            {formState.errors.name?.message || "Server Name:"}
         </Label>

         <Input
            className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-800 dark:text-dimWhite"
            id="server"
            disabled={formState.isSubmitting}
            placeholder="Enter A Server name "
            {...register("name")}
         />

         <div className="text-rose-500 dark:text-rose-800">
            {formState.errors.name?.message && <p className="">{formState.errors.name?.message}</p>}
            {formState.errors.imageUrl?.message && <p className="">{formState.errors.imageUrl?.message}</p>}
         </div>

         <DialogFooter className="bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
            <Button variant="primary" type="submit" disabled={formState.isSubmitting}>
               Submit
            </Button>
         </DialogFooter>
      </form>
   );
};
