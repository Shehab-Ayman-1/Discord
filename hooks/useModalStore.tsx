import type { ServerWithMembersWithProfiles } from "@/types";
import { CHANNEL, Channel } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
   | "createServer"
   | "createChannel"
   | "editServer"
   | "editChannel"
   | "deleteServer"
   | "deleteChannel"
   | "deleteMessage"
   | "messageAttachments"
   | "leaveServer"
   | "invite"
   | "members";

type ModalData = {
   server?: ServerWithMembersWithProfiles;
   channel?: Channel;
   channelType?: CHANNEL;
   api?: {
      url?: string;
      method?: "get" | "post" | "put" | "delete";
   };
};

type ModalStoreProps = {
   type: ModalType | null;
   data: ModalData;
   isOpen: boolean;
   onOpen: (type: ModalType, data?: ModalData) => void;
   onClose: () => void;
};

export const useModalStore = create<ModalStoreProps>((set) => ({
   type: null,
   data: {},
   isOpen: false,
   onOpen: (type: ModalType, data = {}) => set({ type, data, isOpen: true }),
   onClose: () => set({ type: null, isOpen: false }),
}));
