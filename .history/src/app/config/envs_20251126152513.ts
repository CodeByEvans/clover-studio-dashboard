import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_KEY: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

const envVars = result.data;

export const envs = {
  supabaseUrl: envVars.SUPABASE_URL,
  supabaseKey: envVars.SUPABASE_KEY,
};
