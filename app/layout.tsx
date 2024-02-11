import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { Providers } from "@/components/providers";
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
         <html suppressHydrationWarning lang="en" className="h-full min-h-screen w-full">
            <body className={cn("h-full w-full bg-white dark:bg-[#1a1a1a]", font.className)}>
               <Providers>{children}</Providers>
            </body>
         </html>
      </ClerkProvider>
   );
}
