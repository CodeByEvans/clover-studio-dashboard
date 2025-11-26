import cloudinary from "@/lib/cloudinary";

export const CloudinaryAPI = {
  UploadFiles: async ({ images, slug }: { images: File[]; slug: string }) => {
    const uploads = images.map(async (image, index) => {
      const buffer = Buffer.from(await image.arrayBuffer());

      try {
        const result = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `products/${slug}`,
              public_id: `${slug}-${index + 1}`,
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
    });

    return Promise.all(uploads);
  },
};

export default CloudinaryAPI;
