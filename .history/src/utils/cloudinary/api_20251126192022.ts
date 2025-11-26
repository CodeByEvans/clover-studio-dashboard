import { v2 as cloudinary } from "cloudinary";

export const CloudinaryAPI = {
  Upload: async (file: File) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    try {
      const result = await cloudinary.uploader.upload_stream(buffer, {});
    } catch {}
  },
};
