import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";

declare module "next-auth" {
  interface User {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token?: string | null;
  }
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      // backend api token
      accessToken: string;
      /**
       * By default, TypeScript merges new interface properties and overwrites existing ones.
       * In this case, the default session user properties will be overwritten,
       * with the new ones defined above. To keep the default session user properties,
       * you need to add them back into the newly declared interface.
       */
    } & DefaultSession["user"];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          const response = await fetch(
            `${process.env.BACKEND_API_URL}/api/auth/signin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email, password }),
            }
          );
          if (!response.ok) {
            return null;
          }

          const data = await response.json();

          return {
            id: data.user.id ?? null,
            name: data.user.name ?? null,
            email: data.user.email ?? null,
            token: data.token ?? null,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.accessToken = user.token ?? "";
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          accessToken: token.accessToken,
        },
      };
    },
  },
  session: {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
