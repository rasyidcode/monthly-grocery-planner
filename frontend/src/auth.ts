import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./lib/zod";
import { ZodError } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const user = null;

          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          console.log("credes", email, password);

          // const response = await fetch(
          //   `${process.env.BACKEND_API_URL}/api/auth/signin`,
          //   {
          //     method: "POST",
          //     body: JSON.stringify({
          //       email: credentials.email,
          //       password: credentials.password,
          //     }),
          //   }
          // );
          // console.log(response);

          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
