"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

type QueryProviderProps = {
   children: React.ReactNode;
};

export const QueryProvider = ({ children }: QueryProviderProps) => {
   const [queryClient] = useState(() => new QueryClient());
   return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
