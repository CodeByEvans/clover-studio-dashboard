import { getProducts } from "@/utils/supabase/api";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await getProducts();
  return NextResponse.json(products, { status: 200 });
}

export async function POST(image: File) {}
