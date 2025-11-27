import { NextRequest, NextResponse } from "next/server";
import { productSchema } from "../route";
import CloudinaryAPI from "@/utils/cloudinary/api";
import { uploadProduct } from "@/utils/supabase/api";
import slugify from "slugify";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const slug = slugify(title, { lower: true });
    const description = formData.get("description") as string;
    const images = formData.getAll("images") as File[];
    const portrait = formData.get("portrait") as File;
    const price = parseFloat(formData.get("price") as string);
    const collection = formData.get("collection") as string;
    const featured = formData.get("featured") === "true";

    // Validación con Zod
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
    const data = await uploadProduct(updatedProduct);

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
