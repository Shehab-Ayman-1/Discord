import { Separator } from "@/components/ui/separator";

import { NavigationAction } from "./action";
import { NavigationList } from "./list";
import { ModeSwitch } from "./mode";

type NavigationSidebarProps = {};

export const NavigationSidebar = async ({}: NavigationSidebarProps) => {
   return (
      <div className="flex h-full w-full flex-col items-center space-y-4 bg-neutral-200 py-3 text-primary dark:bg-dimBlack">
         <NavigationAction />

         <Separator className="mx-auto h-0.5 w-10 rounded-md bg-zinc-300 dark:bg-zinc-700" />

         <NavigationList />

         <ModeSwitch />
      </div>
   );
};
