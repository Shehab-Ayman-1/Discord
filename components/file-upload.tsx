"use client";
import { UseFormSetError, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import { UploadFileResponse } from "uploadthing/client";
import { UploadThingError } from "uploadthing/server";
import { Json } from "@uploadthing/shared";

import { UploadDropzone } from "@/utils";
import Image from "next/image";

type FileUploadProps = {
   endpoint: "uploadFile" | "uploadImage";
   initialValue?: string;
   setValue: UseFormSetValue<any>;
   setError: UseFormSetError<any>;
};

export const FileUpload = ({ endpoint, initialValue, setValue, setError }: FileUploadProps) => {
   const [image, setImage] = useState(initialValue);

   useEffect(() => {
      setImage(initialValue || "");
   }, [initialValue]);

   const onError = (error: UploadThingError<Json>) => {
      console.log(error);
   };

   const onCompleted = (data: UploadFileResponse<null>[]) => {
      if (!data?.[0].url) return setError("imageUrl", { message: "Faild To Uplaod The Image" });

      setImage(data[0].url);
      setValue("imageUrl", data[0].url);
      setError("imageUrl", { message: undefined });
   };

   const onReset = () => {
      setImage("");
      setValue("imageUrl", "");
      setError("imageUrl", { message: undefined });
   };

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
