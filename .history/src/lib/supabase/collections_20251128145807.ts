import { createClient } from "@/lib/supabase/server";
import { Collection, Collections } from "@/types/collection.type";

export const getCollections = async (): Promise<Collections> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from<"collections", Collection>("collections")
    .select("*");

  if (error) throw error;

  return data;
};
