import { redirectToSignIn } from "@clerk/nextjs";

import { ScrollArea } from "@/components/ui/scroll-area";
import { currentProfile } from "@/utils/current-profile";
import { prisma } from "@/utils";
import { NavigationItem } from "./item";

type NavigationListProps = {};

export const NavigationList = async ({}: NavigationListProps) => {
   const profile = await currentProfile();
   if (!profile) return redirectToSignIn()

   const servers = await prisma.server.findMany({ where: { members: { some: { profileId: profile.id } } } });

   return (
      <ScrollArea className="h-full">
         {servers.map((server) => (
            <NavigationItem key={server.id} server={server} />
         ))}
      </ScrollArea>
   );
};
