import CloudinaryAPI from "@/utils/cloudinary/api";
import { getProducts, uploadProduct } from "@/utils/supabase/api";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import z from "zod";

const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  portrait: z.instanceof(File),
  price: z.string().min(1, "Price is required"),
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

    const title = formData.get("title") as string;
    const slug = slugify(title, { lower: true });
    const description = formData.get("description") as string;
    const images = formData.getAll("images") as File[];
    const portrait = formData.get("portrait") as File;
    const price = parseFloat(formData.get("price") as string);
    const collection = formData.get("collection") as string;
    const featured = formData.get("featured") === "true";

    const parsed = productSchema.safeParse({
      title,
      description,
      images,
      portrait,
      price,
      collection,
      featured,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.message },
        { status: 400 }
      );
    }
    if (!images.length) {
      return NextResponse.json({ message: "No images found" }, { status: 400 });
    }

    const urls = await CloudinaryAPI.UploadProductFiles({
      images,
      portrait,
      slug,
    });

    const product = {
      title,
      slug,
      description,
      images: urls.images,
      portrait: urls.portrait,
      price,
      collection,
      featured,
    };

    const data = await uploadProduct(product);

    if (!data) {
      return NextResponse.json(
        { message: "Error uploading product" },
        { status: 500 }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
