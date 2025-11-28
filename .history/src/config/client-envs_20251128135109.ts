import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string(),
});

export const getClientEnvs = () => {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  });

  if (!result.success) {
    throw new Error(`Config validation error: ${result.error.message}`);
  }

  return {
    apiUrl: result.data.NEXT_PUBLIC_API_URL,
  };
};
