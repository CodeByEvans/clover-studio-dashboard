import { z } from "zod";

const envSchema = z.object({
  SUPABASE_URL: z.string(),
  SUPABASE_KEY: z.string(),
  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),
  API_URL: z.string(),
});

const result = envSchema.safeParse({
  SUPABASE_URL: process.env.SUPABASE_URL,
  SUPABASE_KEY: process.env.SUPABASE_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  API_URL: process.env.API_URL,
});

if (!result.success) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

const envVars = result.data;

export const envs = {
  supabaseUrl: envVars.SUPABASE_URL,
  supabaseKey: envVars.SUPABASE_KEY,
  cloudinaryCloudName: envVars.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: envVars.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: envVars.CLOUDINARY_API_SECRET,
  apiUrl: envVars.API_URL,
};
