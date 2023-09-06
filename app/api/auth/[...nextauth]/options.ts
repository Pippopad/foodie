import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin",
      name: "Admin Login",
      credentials: {},
      async authorize(
        credentials: { username: string; password: string } | any
      ) {
        const user: any = { username: credentials?.username, role: "admin" };

        if (credentials?.password !== "admin") return null;

        return user;
      },
    }),
    CredentialsProvider({
      id: "customer",
      name: "Customer Login",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (
          credentials?.username !== "test" ||
          credentials?.password !== "test"
        )
          return null;

        const user: any = { username: "test", foo: "bar" };
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token, user }) {
      session.user = token?.user as any;

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
