import { createClient } from "@/lib/supabase/server";
import { Product, Products } from "@/types/product.type";
import { Database } from "@/types/supabase";

type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];

export const getProducts = async (): Promise<Products> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from<"products", ProductInsert>("products")
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
