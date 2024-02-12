"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnClickOutside } from "usehooks-ts";
import { SendHorizonalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { memo, useRef } from "react";
import { z } from "zod";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type MessageFormProps = {
   content: string;
   apiUrl: string;
   onEditing: () => void;
};

const schema = z.object({
   content: z.string().min(1),
});

export const MessageForm = memo(({ content, apiUrl, onEditing }: MessageFormProps) => {
   const formRef = useRef<HTMLFormElement | null>(null);
   const { register, handleSubmit, formState } = useForm({
      defaultValues: { content },
      resolver: zodResolver(schema),
   });

   const onSubmit = async (values: z.infer<typeof schema>) => {
      try {
         await axios.put(apiUrl, values);
         onEditing();
      } catch (error) {
         console.log(error);
      }
   };

   useOnClickOutside(formRef, onEditing);

   return (
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
         <div className="flex-start w-full gap-2 pt-2">
            <Input
               className="border-0 border-none bg-zinc-200/90 p-2 text-zinc-600 focus-within:ring-0 focus-within:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
               placeholder="Edited Message"
               disabled={formState.isSubmitting}
               {...register("content")}
            />
            <Button variant="primary" size="sm" disabled={formState.isSubmitting} className="text-xs">
               <SendHorizonalIcon className="h-4 w-4" />
            </Button>
         </div>
         <span className="mt-1 text-[10px] text-zinc-400">Press Escape To Cancel, Enter To Save.</span>
      </form>
   );
});

MessageForm.displayName = "MessageForm";
