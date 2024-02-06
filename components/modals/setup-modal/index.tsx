import { ModalForm } from "../modal-form";
import { ModalInfo } from "../modal-info";
import { ModalContent } from "../modal-content";

type SetupModalProps = {
   isOpen?: boolean;
};

export const SetupModal = ({ isOpen }: SetupModalProps) => {
   return (
      <ModalContent isOpen={isOpen!}>
         <ModalInfo />
         <ModalForm api={{ url: "/api/servers", method: "post" }} />
      </ModalContent>
   );
};
