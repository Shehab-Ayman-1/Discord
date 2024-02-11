import Image from "next/image";

type MessageImageProps = {
   attachment: string;
};

export const MessageImage = ({ attachment }: MessageImageProps) => {
   return (
      <a
         href={attachment}
         target="_blank"
         rel="noopener noreferrer"
         className="flex-start relative mt-2 aspect-square h-48 w-48 overflow-hidden"
      >
         <Image src={attachment} alt="content" fill className="object-cover" />
      </a>
   );
};
