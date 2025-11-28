import CloudinaryAPI from "@/lib/cloudinary/api";
import { getProducts, uploadProduct } from "@/lib/supabase/products";
import { formatZodErrors } from "@/utils/zod/formatErrors";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  portrait: z.instanceof(File),
  price: z.number().min(1, "Price is required"),
  collection: z.string().min(1, "Collection is required"),
  featured: z.boolean(),
});

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Extract form data
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const description = formData.get("description") as string;
    const images = formData.getAll("images") as File[];
    const portrait = formData.get("portrait") as File;
    const price = parseFloat(formData.get("price") as string);
    const collection = formData.get("collection") as string;
    const featured = formData.get("featured") === "true";

    // Validate form data
    const parsed = productSchema.safeParse({
      title,
      slug,
      description,
      images,
      portrait,
      price,
      collection,
      featured,
    });

    if (!parsed.success) {
      const erroresTraducidos = formatZodErrors(parsed.error);
      return NextResponse.json({ message: erroresTraducidos }, { status: 400 });
    }

    // Upload images
    const urls = await CloudinaryAPI.UploadProductFiles({
      images,
      portrait,
      slug,
    });

    // Create typed Product
    const product = {
      title,
      slug,
      description,
      images: [urls.portrait, ...urls.images],
      portrait: urls.portrait,
      price,
      collection,
      featured,
    };

    // Upload product to Supabase
    const data = await uploadProduct(product);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
