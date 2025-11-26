import { createClient } from "@/lib/supabase/server";
import { Products } from "@/types/product.type";

export const getProducts = async (): Promise<Products> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from<"products", Products>("products")
    .select("*");

  if (error) throw error;

  return data;
};
