import { z } from "zod";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export const ServerEnvSchema = z.object({
    DATABASE_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    JWT_SECRET: z.string(),
    NODE_ENV: z.string().optional(),
    EMAIL_USER: z.string().email(),
    EMAIL_PASS: z.string(),
    CLIENT_URL: z.string().url(),
});

export type ServerEnv = z.infer<typeof ServerEnvSchema>;
export const server_env = ServerEnvSchema.parse(process.env);