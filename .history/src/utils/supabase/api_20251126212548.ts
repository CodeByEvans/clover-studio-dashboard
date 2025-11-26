import { createClient } from "@/lib/supabase/server";
import { Product, Products } from "@/types/product.type";

export const getProducts = async (): Promise<Products> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from<"products", Product>("products")
    .select("*");

  if (error) throw error;

  return data;
};

export const uploadProduct = async (product: Product) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from<"products", Product>("products")
    .insert(product)
    .select();

  if (error) throw error;

  return data;
};
