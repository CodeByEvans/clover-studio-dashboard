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

export const getProduct = async (id: number): Promise<Product> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) throw error;

  return data[0];
};

export const uploadProduct = async (product: ProductInsert) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from<"products", ProductInsert>("products")
    .insert(product as any)
    .select()
    .single();

  if (error) throw error;

  return data;
};

export const updateProduct = async (
  updatedProduct: ProductInsert,
  id: number
) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
};
