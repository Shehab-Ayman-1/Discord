"use client";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

type ToastProviderProps = {};

type Theme = "dark" | "light" | "system";

export const ToastProvider = ({}: ToastProviderProps) => {
   const { theme } = useTheme();

   return <Toaster theme={theme as Theme} />;
};
