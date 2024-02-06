import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/tooltip";

type ActionTooltipProps = {
   label: string;
   side?: "top" | "bottom" | "right" | "left";
   align?: "start" | "center" | "end";
   children: React.ReactNode;
};

export const ActionTooltip = ({ label, side, align, children }: ActionTooltipProps) => {
   return (
      <TooltipProvider>
         <Tooltip delayDuration={50}>
            <TooltipTrigger asChild>{children}</TooltipTrigger>

            <TooltipContent side={side} align={align}>
               <p className="text-sm font-semibold capitalize">{label}</p>
            </TooltipContent>
         </Tooltip>
      </TooltipProvider>
   );
};
