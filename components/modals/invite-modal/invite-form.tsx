"use client";
import { CheckIcon, CopyIcon, RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

import { useModalStore } from "@/hooks/useModalStore";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAxios } from "@/hooks/useAxios";
import { useOrigin } from "@/hooks/useOrigin";

type InviteFormProps = {};

type InviteDataProps = {
   data?: string;
   success?: string;
   error?: string;
};

export const InviteForm = ({}: InviteFormProps) => {
   const { data: inviteData, loading, error, execute } = useAxios<InviteDataProps | undefined>();
   const { data } = useModalStore();
   const origin = useOrigin();

   const [copy, setCopy] = useState(false);
   const inviteUrl = `${origin}/invite/${inviteData?.data || data.server?.inviteCode}`;

   const onCopy = () => {
      if (error) return;

      setCopy(true);
      window.navigator.clipboard.writeText(inviteUrl);

      setTimeout(() => setCopy(false), 2000);
      toast.success("Invite Code Copies Successfully");
   };

   const onGenerateInviteCode = async () => {
      const {
         data: response,
         isSubmitted,
         error,
      } = await execute("get", `/servers/${data.server?.id}/invite-code`);
      if (isSubmitted && error) return toast.error(error);
      toast.success(response?.success);
   };

   return (
      <div className="max-w-full p-6">
         <Label className="text-sm font-bold uppercase text-dimWhite dark:text-white">Server Invite Link</Label>
         <div className="flex-start mt-2 gap-2">
            <p className="max-w-sm truncate rounded-md bg-neutral-500 px-4 py-2 text-black shadow-md">
               {inviteUrl}
            </p>
            <Button
               size="icon"
               variant="ghost"
               className="bg-transparent text-dimWhite dark:text-white"
               onClick={onCopy}
            >
               {copy ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            </Button>
         </div>
         <div className="">
            <p className="text-rose-500">{error}</p>
            <Button
               className="mt-4 text-xs text-zinc-500 dark:text-white"
               size="sm"
               variant="ghost"
               disabled={loading}
               onClick={onGenerateInviteCode}
            >
               Generate A New Link
               <RefreshCwIcon className="ml-2 h-4 w-4" />
            </Button>
         </div>
      </div>
   );
};
