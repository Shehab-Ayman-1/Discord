"use client";
import { SmileIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Ref } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ActionTooltip } from "@/components/action-tooltip";

type EmojiPickerProps = {
   onChange: (value: string) => void;
   emojiRef: Ref<any>;
};

export const EmojiPicker = ({ emojiRef, onChange }: EmojiPickerProps) => {
   const { theme } = useTheme();

   return (
      <Popover>
         <PopoverTrigger ref={emojiRef}>
            <ActionTooltip label="CTRL + q">
               <SmileIcon className="h-5 w-5 dark:text-white" />
            </ActionTooltip>
         </PopoverTrigger>

         <PopoverContent
            side="left"
            sideOffset={40}
            className="mb-16 border-none bg-transparent shadow-none drop-shadow-none"
         >
            <Picker theme={theme} data={data} onEmojiSelect={(emoji: any) => onChange(emoji.native)} />
         </PopoverContent>
      </Popover>
   );
};
