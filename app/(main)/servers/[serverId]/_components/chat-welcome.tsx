import { HashIcon } from "lucide-react";

type ChatWelcomeProps = {
   type: "channel" | "conversation";
   name: string;
};

export const ChatWelcome = ({ type, name }: ChatWelcomeProps) => {
   return (
      <div className="mb-4 space-y-2 px-4">
         {type === "channel" && (
            <div className="flex-center h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700">
               <HashIcon className="h-12 w-12 text-white" />
            </div>
         )}
         <p className="text-xl font-bold md:text-3xl">
            {type === "channel" && "Welcome To #"}
            {name}
         </p>
         <p className="text-sm text-zinc-600 dark:text-zinc-400">
            This Is The Start Of {type === "channel" ? `The #${name} Channel.` : `Your Conversation With ${name}`}
         </p>
      </div>
   );
};
