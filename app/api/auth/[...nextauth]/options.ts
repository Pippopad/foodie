import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import prisma from "@/prisma/client";
import { md5 } from "@/utils";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin",
      name: "Admin Login",
      credentials: {},
      async authorize(
        credentials: { username: string; password: string } | any
      ) {
        const hash = md5(credentials?.password);
        const user = await prisma.admin.findFirst({
          where: {
            username: credentials?.username,
            password: hash,
          },
        });

        return user as any;
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
    async jwt({ token, user }: any) {
      if (user) token.username = user.username;
      return token;
    },
    async session({ session, token }) {
      session.user = token?.username as any;

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
