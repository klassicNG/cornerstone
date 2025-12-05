import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";

// 1. Helper function to find user in DB
async function getUser(email: string) {
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

// 2. Main Auth Logic
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      // This is the function that runs when you click "Login"
      async authorize(credentials) {
        console.log("--- LOGIN ATTEMPT STARTED ---");

        // A. Validate the Form Data (Email format & Password length)
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          console.log("1. Inputs Validated for:", email);

          // B. Find the user in the database
          const user = await getUser(email);
          if (!user) {
            console.log("2. User NOT found in DB");
            return null;
          }

          console.log("2. User Found:", user.email);
          console.log("   Stored Hash in DB:", user.password);

          // C. Compare the typed password with the Stored Hash
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("3. Password Match Result:", passwordsMatch);

          if (passwordsMatch) {
            console.log("--- LOGIN SUCCESS ---");
            return user;
          }
        } else {
          console.log("1. Invalid Inputs (Zod failed)");
        }

        console.log("--- LOGIN FAILED (Wrong Password or Input) ---");
        return null;
      },
    }),
  ],
});
