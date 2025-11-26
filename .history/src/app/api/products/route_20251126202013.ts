import CloudinaryAPI from "@/utils/cloudinary/api";
import { getProducts } from "@/utils/supabase/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products, { status: 200 });
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()

        const slug = formData.get('slug') as string;

        const images = formData.getAll('images') as File[];

        if (!images.length) {
            return NextResponse.json({ message: 'No images found' }, { status: 400 });
        }
    }

}
