"use client";
import { useModalStore } from "@/hooks/useModalStore";
import { MembersItem } from "./members-item";

type MembersListProps = {};

export const MembersList = ({}: MembersListProps) => {
   const { data } = useModalStore();

   if (!data.server) return;

   return data.server.members?.map((member) => (
      <div key={member.id} className="flex-start mb-6">
         <MembersItem member={member} />
      </div>
   ));
};
