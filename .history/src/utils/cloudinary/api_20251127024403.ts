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
  UploadImages: async (
    newImages: File[],
    oldImages: string[],
    slug: string
  ) => {
    const reordered: string[] = [];
    for (let i = 0; i < oldImages.length; i++) {
      const url = oldImages[i];
      const newPublicId = `${slug}-${i + 1}`;
      const result = await cloudinary.uploader.rename(url, newPublicId, {
        overwrite: true,
      });
      reordered.push(result.secure_url);
    }
    const uploadedImages = await Promise.all(
      newImages.map(async (image, index) => {
        const buffer = Buffer.from(await image.arrayBuffer());
        const result = await new Promise<any>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: `products/${slug}`,
              public_id: `${slug}-${index + reordered.length + 1}`,
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
      })
    );
    return [...reordered, ...uploadedImages];
  },
  UpdatePortrait: async (portrait: File, slug: string) => {
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
  },
  ReorderImages: async (images: string[], slug: string) => {
    const reordered: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const url = images[i];
      // extrae public_id actual y reemplaza con slug-{i+1}
      const newPublicId = `${slug}-${i + 1}`;
      const result = await cloudinary.uploader.rename(url, newPublicId, {
        overwrite: true,
      });
      reordered.push(result.secure_url);
    }
    return reordered;
  },
};

export default CloudinaryAPI;
