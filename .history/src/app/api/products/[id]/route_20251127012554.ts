import { NextRequest, NextResponse } from "next/server";
import CloudinaryAPI from "@/utils/cloudinary/api";
import {
  getProduct,
  getProducts,
  updateProduct,
  uploadProduct,
} from "@/utils/supabase/api";
import slugify from "slugify";
import { formatZodErrors } from "@/utils/zod/formatErrors";
import z from "zod";
import { formDataToObject } from "@/utils/utils";
import { Product } from "@/types/product.type";

export const updateProductSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;
    const product = await getProduct(id);
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: number }> }
) {
  try {
    const { id } = await params;

    const product = await getProduct(id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (!product.slug) {
      return NextResponse.json({ message: "Slug not found" }, { status: 404 });
    }

    const slug = product.slug;
    const formData = await req.formData();

    const updatedFields = formDataToObject(formData);

    // Validación con Zod
    const parsedFromData = updateProductSchema.safeParse({
      ...updatedFields,
    });
    

    if (!parsedFromData.success) {
      const erroresTraducidos = formatZodErrors(parsedFromData.error);
      return NextResponse.json({ message: erroresTraducidos }, { status: 400 });
    }

    const productToUpload = { ...parsedFromData.data, images: product.images, portrait: product.portrait };

    if (productToUpload.title) {
      const slug = slugify(productToUpload.title, { lower: true });
      productToUpload.slug = slug;
    }

    if (parsedFromData.data.images) {
      const uploadedImages = await CloudinaryAPI.UpdateImages(
        parsedFromData.data.images,
        slug
      );

      productToUpload.images = uploadedImages;
      productToUpload.portrait = product.portrait
    }
    }

    if (parsedFromData.data.portrait) {
      const uploadedPortrait = await CloudinaryAPI.UploadPortrait(
        parsedFromData.data.portrait,
        slug
      );
      parsedFromData.data.portrait = uploadedPortrait;
    }

    return NextResponse.json(parsedFromData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
