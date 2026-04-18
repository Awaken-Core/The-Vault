import { z } from "zod";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

export const ClientEnvSchema = z.object({});

export type ClientEnv = z.infer<typeof ClientEnvSchema>;
export const client_env = ClientEnvSchema.parse(process.env);