import { redirect } from "next/navigation";
import { prisma, initialProfile } from "@/utils";

type SetupProps = {};

const Setup = async ({}: SetupProps) => {
   const profile = await initialProfile();

   const server = await prisma?.server.findFirst({ where: { members: { some: { profileId: profile.id } } } });
   if (server) return redirect(`/servers/${server.id}`);
   return null;
};

export default Setup;
