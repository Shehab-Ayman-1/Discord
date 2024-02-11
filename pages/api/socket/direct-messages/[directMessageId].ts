import type { NextApiResponseServerIO } from "@/types";
import { NextApiRequest } from "next";
import { prisma } from "@/utils";

import { currentProfile } from "@/utils/current-profile-pages";
import { MEMBER } from "@prisma/client";

const UpdateMessage = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
   try {
      if (req.method !== "DELETE" && req.method !== "PUT")
         return res.status(404).json({ error: "Method Not Allowed" });

      const { content } = req.body;
      const { directMessageId, conversationId } = req.query;
      if (!directMessageId || !conversationId)
         return res.status(400).json({ error: "ServerId, OR channelId Is Missing" });

      const profile = await currentProfile(req);
      if (!profile) return res.status(401).json({ error: "Unauthozied" });

      const conversation = await prisma.conversation.findFirst({
         where: {
            id: conversationId as string,
            OR: [{ memberOne: { profileId: profile.id } }, { memberTwo: { profileId: profile.id } }],
         },
         include: { memberOne: { include: { profile: true } }, memberTwo: { include: { profile: true } } },
      });

      if (!conversation) return res.status(400).json({ error: "Conversation Not Found" });

      const member =
         conversation.memberOne.profileId === profile.id ? conversation.memberOne : conversation.memberTwo;
      if (!member) return res.status(404).json({ error: "Member Not Found" });

      let directMessage = await prisma.directMessage.findFirst({
         where: { id: directMessageId as string, conversationId: conversationId as string },
         include: { member: { include: { profile: true } } },
      });

      if (!directMessage) return res.status(400).json({ error: "directMessage Not Found" });
      if (directMessage.content === content) return res.status(200).json(directMessage);

      const isMessageOwner = directMessage.memberId === member.id;
      const isAdmin = member.role === MEMBER.ADMIN;
      const isModerator = member.role === MEMBER.MODERATOR;

      const canModify = isMessageOwner || isAdmin || isModerator;
      if (!canModify) return res.status(401).json({ error: "Unauthorized" });

      if (req.method === "DELETE") {
         if (directMessage.deleted) {
            directMessage = await prisma.directMessage.delete({
               where: { id: directMessageId as string },
               include: { member: { include: { profile: true } } },
            });
         } else {
            directMessage = await prisma.directMessage.update({
               where: { id: directMessageId as string },
               data: { content: "This Message Has Been Deleted.", attachment: null, deleted: true },
               include: { member: { include: { profile: true } } },
            });
         }
      }

      if (req.method === "PUT") {
         if (!isMessageOwner) return res.status(401).json({ error: "Unauthozied" });
         directMessage = await prisma.directMessage.update({
            where: { id: directMessageId as string },
            data: { content },
            include: { member: { include: { profile: true } } },
         });
      }

      const updateKey = `chat:${conversationId}:messages:update`;
      res?.socket?.server?.io?.emit(updateKey, directMessage);
      res.status(200).json({ success: "Message Was Deleted" });
   } catch (error) {
      console.log(error);
      res.status(404).json({ error: "Internal Server Error" });
   }
};

export default UpdateMessage;
