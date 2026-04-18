import { OAuth2Client } from "google-auth-library";
import { server_env as env } from "@repo/env";

export const google_oauth_client = new OAuth2Client(env.GOOGLE_CLIENT_ID);