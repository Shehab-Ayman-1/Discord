import { getAuth } from "@clerk/nextjs/server";
import { prisma } from "@/utils";
import { NextApiRequest } from "next";

export const currentProfile = async (req: NextApiRequest) => {
   const { userId } = getAuth(req);
   if (!userId) return null;

   const profile = await prisma.profile.findUnique({ where: { userId } });
   return profile;
};
