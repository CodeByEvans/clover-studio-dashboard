import { getProducts } from "@/utils/supabase/api";

export async function GET() {
  const products = await getProducts();
}
