import type { ServerWithMembersWithProfiles } from "@/types";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | "editServer" | "members";

type ModalData = {
   server?: ServerWithMembersWithProfiles | undefined;
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
