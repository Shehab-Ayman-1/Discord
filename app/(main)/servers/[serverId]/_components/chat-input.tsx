"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEventListener } from "usehooks-ts";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PlusIcon, SendIcon } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";

import { ActionTooltip } from "@/components/action-tooltip";
import { useModalStore } from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmojiPicker } from "./emoji-picker";

type ChatInputProps = {
   api: { url: string; method: "get" | "post" | "put" | "delete" };
   name: string;
   type: "conversation" | "channel";
};

const schema = z.object({
   content: z.string().min(1),
});

export const ChatInput = ({ type, name, api }: ChatInputProps) => {
   const { onOpen } = useModalStore();
   const router = useRouter();
   const emojiRef = useRef<HTMLButtonElement>(null);
   const attachmentRef = useRef<HTMLButtonElement>(null);

   const { register, handleSubmit, setValue, watch, reset, formState } = useForm({
      defaultValues: { content: "" },
      resolver: zodResolver(schema),
   });

   const content = watch("content");

   const onEmojiChange = (emoji: string) => {
      setValue("content", content + emoji);
   };

   const onKeyDown = (event: KeyboardEvent, key: string, ref: any) => {
      if (event.key === key && event.ctrlKey) ref.current?.click();
   };

   const onSubmit = async (values: z.infer<typeof schema>) => {
      try {
         await axios.post(api.url, values);
         document.querySelector(".bottom-ref")?.scrollIntoView({ behavior: "smooth" });

         reset();
         router.refresh();
      } catch (error) {
         const reason = error as any;
         console.log(reason?.response?.data);
         toast.error(reason?.response?.data?.error);
      }
   };

   useEventListener("keydown", (event) => onKeyDown(event, "q", emojiRef));
   useEventListener("keydown", (event) => onKeyDown(event, "m", attachmentRef));

   return (
      <form onSubmit={handleSubmit(onSubmit)} className="flex rounded-xl bg-zinc-200/90 p-2 dark:bg-zinc-700/75">
         <div className="flex-start">
            <ActionTooltip label="CTRL + m">
               <button
                  ref={attachmentRef}
                  type="button"
                  className="flex-center h-5 w-5 rounded-full transition"
                  onClick={() => onOpen("messageAttachments", { api })}
               >
                  <PlusIcon className="dark:text-white" />
               </button>
            </ActionTooltip>

            <EmojiPicker onChange={onEmojiChange} emojiRef={emojiRef} />
         </div>

         <Input
            // disabled={formState.isSubmitting}
            className="border-0 border-none bg-transparent px-3 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:text-zinc-200"
            placeholder={`Message ${type === "conversation" ? "" : "#"} ${name}`}
            {...register("content")}
         />

         <ActionTooltip label="enter">
            <Button type="submit" variant="primary" size="sm" className="transition">
               <SendIcon className="h-5 w-5 dark:text-white" />
            </Button>
         </ActionTooltip>
      </form>
   );
};
