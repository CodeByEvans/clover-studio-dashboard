import CloudinaryAPI from "@/lib/cloudinary/api";
import { deleteProduct, getProduct } from "@/lib/supabase/products";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; slug: string }> }
) {
  const { id } = await params;

  const product = await getProduct(id);

  if (!product) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 });
  }

  try {
    const readyToDelete = await CloudinaryAPI.CanDeleteImages(product.slug);
    if (readyToDelete) {
      await CloudinaryAPI.DeleteImages(product.slug);
      await deleteProduct(id);
    } else {
      await deleteProduct(id);
    }

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
