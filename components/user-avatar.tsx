import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils";

type UserAvatarProps = {
   src?: string;
   className?: string;
};

export const UserAvatar = ({ src, className }: UserAvatarProps) => {
   return (
      <Avatar className={cn("h-7 w-7 md:h-9 md:w-9", className)}>
         <AvatarImage src={src} alt="avatar-img" />
      </Avatar>
   );
};
