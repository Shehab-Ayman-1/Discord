import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";
import { ServerSidebar } from "../_components/server-sidebar";

type LayoutProps = {
   children: React.ReactNode;
   params: { serverId: string };
};

const Layout = async ({ children, params }: LayoutProps) => {
   const profile = await currentProfile();
   if (!profile) return redirectToSignIn();
   if (params.serverId.length < 24) return redirect("/");

   const server = await prisma.server.findUnique({
      where: {
         id: params.serverId,
         members: { some: { profileId: profile.id } },
      },
   });
   if (!server) return redirect("/");

   return (
      <div className="h-full w-full">
         <div className="fixed inset-y-0 z-20 hidden h-full w-60 flex-col md:flex">
            <ServerSidebar serverId={params.serverId} />
         </div>
         <main className="h-full md:ml-64">{children}</main>
      </div>
   );
};

export default Layout;
