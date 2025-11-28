import { getCollections } from "@/lib/supabase/collections";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collections = await getCollections();
    return NextResponse.json(collections, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
