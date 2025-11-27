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
  removeImages: z.array(z.string()).optional(),
});

export const productSchemaOutput = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  portrait: z.string().nullable(),
  price: z.number(),
  collection: z.string(),
  featured: z.boolean(),
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

    const formData = await req.formData();
    const userFields = formDataToObject(formData);

    const product = await getProduct(id);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    const originalSlug = product.slug;

    const parsed = updateProductSchema.safeParse(userFields);
    if (!parsed.success) {
      return NextResponse.json(
        { message: formatZodErrors(parsed.error) },
        { status: 400 }
      );
    }

    const data = parsed.data;

    let productToUpload = {
      ...product,
      ...data,
    };

    if (data.title) {
      productToUpload.slug = slugify(data.title, { lower: true });
    }

    const finalSlug = productToUpload.slug ?? originalSlug;

    const removeList = Array.isArray(userFields.removeImages)
      ? userFields.removeImages
      : [];

    if (removeList > 0) {
      //Aqui iría para borrar las imagenes de la base de datos

      productToUpload.images = productToUpload.images.filter(
        (image) => !removeList.includes(image)
      );
    }

    if (data.images && data.images.length > 0) {
      const uploaded = await CloudinaryAPI.UpdateImages(data.images, finalSlug);
      productToUpload.images = [...productToUpload.images, ...uploaded];
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
