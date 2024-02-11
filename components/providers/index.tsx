import { ThemeProvider } from "./theme-provider";
import { ModalsProvider } from "./modals-provider";
import { SocketProvider } from "./socket-provider";
import { ToastProvider } from "./toast-provider";
import { QueryProvider } from "./query-provider";

type ProvidersProps = {
   children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
   return (
      <ThemeProvider storageKey="discord-theme" attribute="class" defaultTheme="dark" enableSystem={false}>
         <ToastProvider />

         <SocketProvider>
            <ModalsProvider />
            <QueryProvider>{children}</QueryProvider>
         </SocketProvider>
      </ThemeProvider>
   );
};
