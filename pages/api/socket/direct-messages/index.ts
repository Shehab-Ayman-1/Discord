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

      const { serverId, conversationId } = req.query as { serverId?: string; conversationId?: string };
      if (!serverId || !conversationId)
         return res.status(400).json({ error: "Server ID or Conversation ID Is Missing" });

      const conversation = await prisma.conversation.findFirst({
         where: {
            id: conversationId,
            OR: [{ memberOne: { profileId: profile.id } }, { memberTwo: { profileId: profile.id } }],
         },
         include: { memberOne: { include: { profile: true } }, memberTwo: { include: { profile: true } } },
      });

      if (!conversation) return res.status(400).json({ error: "Conversation Not Found" });

      const member =
         conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo;
      if (!member) return res.status(400).json({ error: "Member Not Found" });

      const message = await prisma.directMessage.create({
         data: { content, attachment, conversationId, memberId: member.id },
         include: { member: { include: { profile: true } } },
      });

      const channelKey = `chat:${conversationId}:messages`;
      res?.socket?.server?.io?.emit(channelKey, message);

      return res.status(200).json(message);
   } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
   }
};

export default getMessages;
