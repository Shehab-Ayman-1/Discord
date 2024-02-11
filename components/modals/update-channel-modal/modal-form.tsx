"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { CHANNEL } from "@prisma/client";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useModalStore } from "@/hooks/useModalStore";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils";

type ModalFormProps = {};

const schema = z.object({
   name: z
      .string()
      .min(5, { message: "Name Must Be Within 5 Characters OR More" })
      .refine((name) => name !== "general", { message: "Channel Name Can't Be 'general'" }),
   type: z.nativeEnum(CHANNEL),
});

export type DataType = z.infer<typeof schema>;

export const ModalForm = ({}: ModalFormProps) => {
   const { onClose, data } = useModalStore();
   const router = useRouter();
   const params = useParams();

   const { register, handleSubmit, setValue, watch, reset, formState } = useForm({
      defaultValues: { name: "", type: data?.channelType || CHANNEL.TEXT },
      resolver: zodResolver(schema),
   });

   const type = watch("type");

   const onSubmit = async (values: DataType) => {
      try {
         const response = await axios.post(
            `/api/channels/${data?.channel?.id}?serverId=${params?.serverId}`,
            values,
         );
         router.refresh();

         reset();
         onClose();
         toast.success(response.data?.success);
      } catch (error) {
         const reason = error as any;
         console.log(reason);
         toast.error(reason.response?.error);
      }
   };

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
         <div className="w-full">
            <Label
               htmlFor="channel"
               className={cn("mb-0 text-xs font-bold uppercase text-zinc-500 dark:text-dimWhite")}
            >
               {formState.errors.name?.message || "Channel Name:"}
            </Label>

            <Input
               className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-800 dark:text-dimWhite"
               id="channel"
               disabled={formState.isSubmitting}
               placeholder="Enter A Channel name"
               {...register("name")}
            />
         </div>

         <div className="w-full">
            <Label className={cn("mb-0 text-xs font-bold uppercase text-zinc-500 dark:text-dimWhite")}>
               {formState.errors.name?.message || "Channel Name:"}
            </Label>

            <Select
               disabled={formState.isSubmitting}
               onValueChange={(value: any) => setValue("type", value)}
               value={type}
               {...register("type")}
            >
               <SelectTrigger className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-800 dark:text-dimWhite">
                  <SelectValue placeholder="Select A Channel Type" />
               </SelectTrigger>

               <SelectContent>
                  {Object.values(CHANNEL).map((type) => (
                     <SelectItem key={type} value={type} className="capitalize">
                        {type.toLowerCase()}
                     </SelectItem>
                  ))}
               </SelectContent>
            </Select>
         </div>

         <div className="text-rose-500 dark:text-rose-800">
            {formState.errors.name?.message && <p className="">{formState.errors.name?.message}</p>}
         </div>

         <DialogFooter className="bg-zinc-100 px-6 py-4 dark:bg-zinc-800">
            <Button variant="primary" type="submit" disabled={formState.isSubmitting}>
               Submit
            </Button>
         </DialogFooter>
      </form>
   );
};
