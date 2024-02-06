import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile";

type InviteCodeProps = {
   params: { inviteCode: string };
};

const InviteCode = async ({ params }: InviteCodeProps) => {
   const profile = await currentProfile();
   if (!profile) return redirectToSignIn();

   if (!params.inviteCode) return redirect("/");
   const exist = await prisma.server.findFirst({
      where: {
         inviteCode: params.inviteCode,
         members: { some: { profileId: profile.id } },
      },
   });

   if (exist) return redirect(`/servers/${exist.id}`);
   const server = await prisma.server.update({
      where: { inviteCode: params.inviteCode },
      data: {
         members: { create: [{ profileId: profile.id }] },
      },
   });

   if (server) return redirect(`/servers/${server.id}`);
   return null;
};

export default InviteCode;
