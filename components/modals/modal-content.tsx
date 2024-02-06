import { Dialog, DialogContent } from "@/components/ui/dialog";

type ModalContentProps = {
   isOpen?: boolean;
   onClose?: any;
   children: React.ReactNode;
};

export const ModalContent = ({ isOpen, onClose, children }: ModalContentProps) => {
   return (
      <Dialog open={isOpen} onOpenChange={() => onClose()}>
         <DialogContent className="overflow-hidden bg-white px-4 py-5 text-black dark:bg-zinc-900">
            {children}
         </DialogContent>
      </Dialog>
   );
};
