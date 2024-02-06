import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

type ModeSwitchProps = {};

export const ModeSwitch = ({}: ModeSwitchProps) => {
   return (
      <div className="flex-start mt-auto flex-col gap-y-4 pb-3">
         <ModeToggle />
         <UserButton
            afterSignOutUrl="/"
            appearance={{
               elements: {
                  avatarBox: "h-12 w-12",
               },
            }}
         />
      </div>
   );
};
