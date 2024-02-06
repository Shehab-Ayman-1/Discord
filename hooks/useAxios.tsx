import { useEffect, useState } from "react";
import axios from "axios";
import type { AxiosError, AxiosResponse } from "axios";

type Method = "get" | "post" | "put" | "delete";
export const useAxios = <Data,>(method?: Method, url?: string, body?: object, options?: object) => {
   const [data, setData] = useState<Data>();
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const fetcher = async (method?: Method, url?: string, body?: object, options?: object) => {
      if (!method || url === "/") return { data, loading, error, isSubmitted };

      setLoading(true);
      setIsSubmitted(false);
      setError("");

      try {
         let response: AxiosResponse;

         if (method === "get") response = await axios.get(`/api/${url}`, options);
         else response = await axios[method](`/api/${url}`, body, options);

         setData(response.data);

         return { data: response.data, error, isSubmitted: true, loading: false };
      } catch (reason) {
         const error = reason as AxiosError;
         const err =
            (error?.response?.data as any).error || error?.response?.data || error?.message || "Network Error";

         setError(err);

         console.log(error);
         return { data: undefined, loading: false, error: err, isSubmitted: true };
      } finally {
         setLoading(false);
         setIsSubmitted(true);
      }
   };

   useEffect(() => {
      fetcher(method, url, body, options);
   }, [method, url, body, options]);

   const execute = async (method?: Method, url?: string, body?: object, options?: object) =>
      await fetcher(method, url, body, options);

   return { data, loading, error, isSubmitted, execute };
};
