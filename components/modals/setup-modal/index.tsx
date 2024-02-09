import { ModalInfo } from "../modal-info";
import { ModalContent } from "../modal-content";
import { ModalCreateForm } from "../modal-create-form";

type SetupModalProps = {
   isOpen?: boolean;
};

export const SetupModal = ({ isOpen }: SetupModalProps) => {
   return (
      <ModalContent isOpen={isOpen!}>
         <ModalInfo />
         <ModalCreateForm api={{ url: "/api/servers", method: "post" }} />;
      </ModalContent>
   );
};
