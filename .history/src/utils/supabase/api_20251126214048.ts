import { createClient } from "@/lib/supabase/server";
import { Product } from "@/types/product.type";
import { Database } from "@/types/supabase";

type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type Products = ProductRow[];

export const getProducts = async (): Promise<Products> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from<"products", ProductRow>("products")
    .select("*");

  if (error) throw error;

  return data;
};

export const uploadProduct = async (product: ProductInsert) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from<"products", ProductInsert>("products")
    .insert(product as any)
    .select();

  if (error) throw error;

  return data;
};
