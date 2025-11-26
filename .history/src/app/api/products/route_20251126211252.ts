import CloudinaryAPI from "@/utils/cloudinary/api";
import { getProducts } from "@/utils/supabase/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const slug = formData.get("slug") as string;

    const images = formData.getAll("images") as File[];

    const portrait = formData.get("portrait") as File;

    if (!images.length) {
      return NextResponse.json({ message: "No images found" }, { status: 400 });
    }

    const urls = await CloudinaryAPI.UploadProductFiles({
      images,
      portrait,
      slug,
    });

    return NextResponse.json(urls, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
