import { createClient } from "@/lib/supabase/server";

export const getProducts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.from("products").select("*");

  if (error) throw error;

  return data;
};
