import { NextRequest, NextResponse } from "next/server";
import CloudinaryAPI from "@/utils/cloudinary/api";
import { updateProduct, uploadProduct } from "@/utils/supabase/api";
import slugify from "slugify";
import { formatZodErrors } from "@/utils/zod/formatErrors";
import z from "zod";

export const updateProductSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .optional(),
  portrait: z.instanceof(File).optional(),
  price: z.number().min(1, "Price is required").optional(),
  collection: z.string().min(1, "Collection is required").optional(),
  featured: z.boolean().optional(),
});

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const updatedFields = formDataToObject(formData);

    // Validación con Zod
    const parsed = updateProductSchema.safeParse({
      ...updatedFields,
    });

    if (!parsed.success) {
      const erroresTraducidos = formatZodErrors(parsed.error);
      return NextResponse.json({ message: erroresTraducidos }, { status: 400 });
    }

    // Subir imágenes a Cloudinary (igual que en POST)
    const urls = await CloudinaryAPI.UploadProductFiles({
      images,
      portrait,
      slug,
    });

    const updatedProduct = {
      title,
      slug,
      description,
      images: urls.images,
      portrait: urls.portrait,
      price,
      collection,
      featured,
    };

    // Actualizar en Supabase
    const data = await updateProduct(updatedProduct, id);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
