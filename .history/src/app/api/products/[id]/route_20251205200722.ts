import CloudinaryAPI from "@/lib/cloudinary/api";
import { deleteProduct } from "@/lib/supabase/products";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; slug: string }> }
) {
  try {
    const { id, slug } = await params;

    const deletedProduct = await deleteProduct(id);

    const deletedImages = await CloudinaryAPI.DeleteImages(slug);

    const response = {
      deletedProduct,
      deletedImages,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
