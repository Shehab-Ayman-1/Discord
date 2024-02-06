import { NavigationSidebar } from "./_components/navigation/sidebar";

type LayoutProps = {
   children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
   return (
      <div className="flex-between h-full w-full">
         <div className="fixed inset-y-0 z-30 hidden h-full w-[72px] flex-col md:flex">
            <NavigationSidebar />
         </div>

         <main className="ml-[72px] h-full w-full p-2">{children}</main>
      </div>
   );
};

export default Layout;
