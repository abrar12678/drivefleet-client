import { jwtClient } from "better-auth/client/plugins";
import { jwt } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL || "https://drivefleet-one.vercel.app",
  plugins: [jwtClient()],
});

export const { signIn, signOut, getToken, getUser, useSession } = authClient();
