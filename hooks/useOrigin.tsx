"use client";
import { useState, useEffect } from "react";

export const useOrigin = () => {
   const [mounted, setMounted] = useState(false);

   useEffect(() => {
      setMounted(true);
   }, []);

   if (!mounted) return;

   const origin = window?.location?.origin ? window.location.origin : "";
   return origin;
};
