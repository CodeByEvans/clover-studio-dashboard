import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string(),
  PORT: z.string().default("3000"), // el puerto como string
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

const envVars = result.data;

export const envs = {
  mongoUri: envVars.MONGODB_URI,
  port: parseInt(envVars.PORT, 10), // convertir a número
};
