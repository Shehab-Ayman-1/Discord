import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const handleAuth = () => {
   const { userId } = auth();
   if (!userId) throw new UploadThingError("Unauthorized");
   return { id: userId };
};

export const ourFileRouter = {
   uploadImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
      .middleware(handleAuth)
      .onUploadComplete(() => {}),

   uploadFile: f(["image", "pdf"])
      .middleware(handleAuth)
      .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
