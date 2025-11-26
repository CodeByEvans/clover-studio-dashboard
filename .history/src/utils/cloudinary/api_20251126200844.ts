import { v2 as cloudinary } from "cloudinary";

export const CloudinaryAPI = {
  UploadFiles: async ({ files, slug }: { files: File[]; slug: string }) => {
    const uploads = files.map(async (file, index) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      try {
        const result = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `productos/${slug}`,
              public_id: `${slug}-${index}`,
              resource_type: "image",
            },
            (error, uploadResult) => {
              if (error) return reject(error);
              resolve(uploadResult?.secure_url);
            }
          );
          stream.end(buffer);
        });

        return result.secure_url; // Devuelve la URL de la imagen subida
      } catch (error: any) {
        throw new Error(error.message);
      }
    });

    return Promise.all(uploads);
  },
};

export default CloudinaryAPI;
