import { prisma } from "@/utils";

export const getOrCreateConversation = async (memberOneId: string, memberTwoId: string) => {
   let conversation;

   // Find The Conversation By Member One, And Member Two
   conversation = await findConversation(memberOneId, memberTwoId);

   // Find The Conversation By Member Two, And Member One
   if (!conversation) conversation = await findConversation(memberTwoId, memberOneId);

   // If Not Conversation Found, Create New One
   if (!conversation) conversation = await createNewConversation(memberOneId, memberTwoId);

   return conversation;
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
   try {
      const conversation = await prisma.conversation.findFirst({
         where: {
            AND: [{ memberOneId }, { memberTwoId }],
         },
         include: {
            memberOne: { include: { profile: true } },
            memberTwo: { include: { profile: true } },
         },
      });

      return conversation;
   } catch (error) {
      return null;
   }
};

const createNewConversation = async (memberOneId: string, memberTwoId: string) => {
   try {
      const conversation = await prisma.conversation.create({
         data: { memberOneId, memberTwoId },
         include: {
            memberOne: { include: { profile: true } },
            memberTwo: { include: { profile: true } },
         },
      });

      return conversation;
   } catch (error) {
      return null;
   }
};
