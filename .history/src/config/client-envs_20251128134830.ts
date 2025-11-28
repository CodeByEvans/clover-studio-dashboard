import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

const envVars = result.data;

export const envs = {
  apiUrl: envVars.NEXT_PUBLIC_API_URL,
};
