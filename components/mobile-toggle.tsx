import { MenuIcon } from "lucide-react";

import { ServerSidebar } from "@/app/(main)/servers/_components/server-sidebar";
import { NavigationSidebar } from "@/app/(main)/_components/navigation";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

type MobileToggleProps = {
   serverId: string;
};

export const MobileToggle = ({ serverId }: MobileToggleProps) => {
   return (
      <Sheet>
         <SheetTrigger className={cn(buttonVariants({ variant: "ghost", size: "icon", className: "md:hidden" }))}>
            <MenuIcon />
         </SheetTrigger>

         <SheetContent side="left" className="flex gap-0 p-0">
            <div className="w-[72px]">
               <NavigationSidebar />
            </div>
            <ServerSidebar serverId={serverId} />
         </SheetContent>
      </Sheet>
   );
};
