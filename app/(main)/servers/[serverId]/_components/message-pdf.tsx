import { FileIcon } from "lucide-react";

type MessagePDFProps = {
   attachment: string;
};

export const MessagePDF = ({ attachment }: MessagePDFProps) => {
   return (
      <div className="flex-start relative mt-2 max-w-lg rounded-md bg-rose-100 p-2 dark:bg-zinc-400/10">
         <FileIcon className="h-10 w-10 fill-indigo-200" />
         <a
            href={attachment}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-sm text-indigo-500 dark:text-indigo-400"
         >
            PDF File
         </a>
      </div>
   );
};
