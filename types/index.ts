import { Member, Message, Profile, Server } from "@prisma/client";
import { Socket, Server as NetServer } from "net";
import { Server as SocketIOServer } from "socket.io";
import { NextApiResponse } from "next";

export type MemberWithProfile = Member & {
   profile: Profile;
};

export type ServerWithMembersWithProfiles = Server & {
   members: MemberWithProfile[];
};

export type MessageWithMemberWithProfile = Message & {
   member: Member & {
      profile: Profile;
   };
};

export type NextApiResponseServerIO = NextApiResponse & {
   socket: Socket & {
      server: NetServer & {
         io: SocketIOServer;
      };
   };
};
