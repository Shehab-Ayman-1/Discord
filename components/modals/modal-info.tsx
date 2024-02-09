import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type ModalInfoProps = {
   title?: string;
   description?: string | JSX.Element;
};

export const ModalInfo = ({ title, description }: ModalInfoProps) => {
   return (
      <DialogHeader className="px-6 pt-8">
         <DialogTitle className="text-center text-xl font-bold dark:text-white">
            {title || "Customize Your Server"}
         </DialogTitle>

         <DialogDescription className="text-center text-zinc-500">
            {description ||
               "Given Your Server A Personality With A Name And An Image. You Can Always Change It Later."}
         </DialogDescription>
      </DialogHeader>
   );
};
