type LayoutProps = {
   children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
   return <div className="flex-center mx-auto h-full w-full max-w-7xl">{children}</div>;
};

export default Layout;
