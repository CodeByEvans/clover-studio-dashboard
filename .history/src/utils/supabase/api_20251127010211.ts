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

export const getProduct = async (id: number): Promise<ProductRow> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) throw error;

  const product: ProductRow = data[0];

  return product;
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

export const updateProduct = async (updatedProduct: ProductRow, id: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .update(updatedProduct)
    .eq("id", id)
    .select();

  if (error) throw error;

  return data;
};
