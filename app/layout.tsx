import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { ModalsProvider, ThemeProvider } from "@/components/providers";
import { ToastProvider } from "@/components/providers/toast-provider";
import { cn } from "@/utils";
import "@/public/sass/index.scss";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Team Chate Application",
   description: "",
};

type LayoutProps = {
   children: React.ReactNode;
};

export default async function RootLayout({ children }: LayoutProps) {
   return (
      <ClerkProvider>
         <html lang="en" className="h-full min-h-screen w-full" suppressHydrationWarning>
            <body className={cn("h-full w-full bg-white dark:bg-[#1a1a1a]", font.className)}>
               <ThemeProvider
                  storageKey="discord-theme"
                  attribute="class"
                  defaultTheme="dark"
                  enableSystem={false}
               >
                  <ToastProvider />
                  <ModalsProvider />
                  {children}
               </ThemeProvider>
            </body>
         </html>
      </ClerkProvider>
   );
}
