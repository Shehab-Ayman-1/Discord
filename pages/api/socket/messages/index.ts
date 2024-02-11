import type { NextApiResponseServerIO } from "@/types";
import type { NextApiRequest } from "next";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile-pages";

const getMessages = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
   try {
      if (req.method !== "POST") return res.status(400).json({ error: "Method Not Allowed" });

      const profile = await currentProfile(req);
      if (!profile) return res.status(401).json({ error: "Unauthorized" });

      const { content, attachment } = req.body;
      if (!content && !attachment) return res.status(400).json({ error: "Content And Attachment Are Missing" });

      const { serverId, channelId } = req.query as { serverId?: string; channelId?: string };
      if (!serverId || !channelId) return res.status(400).json({ error: "Server ID or Channel ID Is Missing" });

      const server = await prisma.server.findFirst({
         where: {
            id: serverId,
            members: { some: { profileId: profile.id } },
         },
         include: { members: true },
      });

      if (!server) return res.status(400).json({ error: "Server Not Found" });

      const channel = await prisma.channel.findFirst({
         where: {
            id: channelId,
            serverId,
         },
      });
      if (!channel) return res.status(400).json({ error: "Channel Not Found" });

      const member = server.members.find((member) => member.profileId === profile.id);
      if (!member) return res.status(400).json({ error: "Member Not Found" });

      const message = await prisma.message.create({
         data: { content, attachment, channelId, memberId: member.id },
         include: { member: { include: { profile: true } } },
      });

      const channelKey = `chat:${channelId}:messages`;
      res?.socket?.server?.io?.emit(channelKey, message);

      return res.status(200).json(message);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

export default getMessages;
