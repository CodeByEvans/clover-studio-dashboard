import cloudinary from "@/lib/cloudinary";

export const CloudinaryAPI = {
  UploadProductFiles: async ({
    images,
    portrait,
    slug,
  }: {
    images: File[];
    portrait: File;
    slug: string;
  }) => {
    // Subida de imágenes normales
    const imagesUploads = images.map(async (image, index) => {
      const buffer = Buffer.from(await image.arrayBuffer());

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

      return result.secure_url;
    });

    // Subida de la portrait en carpeta separada
    const portraitUpload = (async () => {
      const buffer = Buffer.from(await portrait.arrayBuffer());
      const result = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: `products/portraits/${slug}`,
            public_id: `${slug}-portrait`,
            resource_type: "image",
          },
          (error, uploadResult) => {
            if (error) return reject(error);
            resolve(uploadResult);
          }
        );
        stream.end(buffer);
      });
      return result.secure_url;
    })();

    // Esperamos todas las imágenes + portrait
    const uploadedImages = await Promise.all(imagesUploads);
    const uploadedPortrait = await portraitUpload;

    return {
      images: uploadedImages,
      portrait: uploadedPortrait,
    };
  },
};

export default CloudinaryAPI;
