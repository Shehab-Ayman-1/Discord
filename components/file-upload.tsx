"use client";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import { UploadFileResponse } from "uploadthing/client";
import { UploadThingError } from "uploadthing/server";
import { Json } from "@uploadthing/shared";

import { UploadDropzone } from "@/utils";
import Image from "next/image";
import { FileIcon, XIcon } from "lucide-react";

type FileUploadProps = {
   endpoint: "uploadImage" | "uploadAttachment";
   initialValue?: string;
   value?: string;
   setValue: UseFormSetValue<any>;
   setError: UseFormSetError<any>;
};

export const FileUpload = ({ endpoint, value, initialValue, setValue, setError }: FileUploadProps) => {
   const [image, setImage] = useState(initialValue);
   const [pdf, setPdf] = useState("");

   useEffect(() => {
      setImage(initialValue || "");
   }, [initialValue]);

   const onError = (error: UploadThingError<Json>) => {
      console.log(error);
   };

   const onCompleted = (data: UploadFileResponse<null>[]) => {
      const val = data?.[0].url;
      if (!val) return setError(value || "imageUrl", { message: "Faild To Uplaod The Attachment" });

      const ext = val.split(".").pop();
      ext === "pdf" ? setPdf(val) : setImage(val);

      setValue(value || "imageUrl", val);
      setError(value || "imageUrl", { message: undefined });
   };

   const onReset = () => {
      setImage("");
      setValue(value || "imageUrl", "");
      setError(value || "imageUrl", { message: undefined });
   };

   if (pdf) {
      return (
         <div className="flex-start relative mt-2 rounded-md bg-rose-100 p-2">
            <FileIcon className="h-10 w-10 fill-indigo-200" />
            <a
               href={pdf}
               target="_blank"
               rel="noopener noreferrer"
               className="ml-2 text-sm text-indigo-500 hover:underline dark:text-indigo-400"
            >
               {pdf}
            </a>
            <button
               type="button"
               className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-0.5 text-white shadow-sm"
               onClick={onReset}
            >
               <XIcon className="h-4 w-4" />
            </button>
         </div>
      );
   }

   if (image)
      return (
         <Image
            src={image}
            alt="Uploaded-img"
            className="cover relative h-44 w-44 rounded-full"
            width={176}
            height={176}
            onClick={onReset}
         />
      );

   return <UploadDropzone endpoint={endpoint} onClientUploadComplete={onCompleted} onUploadError={onError} />;
};
