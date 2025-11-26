import { v2 as cloudinary } from "cloudinary";

export const CloudinaryAPI = {
  Upload: async ({ file, slug }: { file: File; slug: string }) => {
    const buffer = Buffer.from(await file.arrayBuffer());

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `productos/${slug}`,
            public_id: slug,
            resource_type: "image",
          },
          (error, uploadResult) => {
            if (error) return reject(error);
            resolve(uploadResult);
          }
        );

        stream.end(buffer);
      });

      return result.secure_url; // Devuelve la URL de la imagen subida
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};
