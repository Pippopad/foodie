import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as ldap from "ldapjs";

import prisma from "@/prisma/client";
import { md5 } from "@/utils";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin",
      name: "Admin Login",
      credentials: {},
      async authorize(credentials: any) {
        const hash = md5(credentials?.password);

        let user;
        try {
          user = await prisma.admin.findFirst({
            where: {
              username: credentials?.username,
              password: hash,
            },
          });
        } catch {
          throw Error("Couldn't connect to the database! Retry later.");
        }

        if (!user) {
          throw Error("Invalid username or password!");
        }
        console.log(process.env.NEXTAUTH_SECRET);

        return user as any;
      },
    }),
    CredentialsProvider({
      id: "customer",
      name: "Customer Login",
      credentials: {},
      async authorize(credentials: any) {
        const client = ldap.createClient({ url: "ldap://192.168.56.10" });

        return new Promise((resolve, reject) => {
          client.bind(
            `CN=${credentials?.username},CN=Users,DC=testserver,DC=home`,
            credentials?.password,
            (err) => {
              console.log(err);

              if (err) {
                client.destroy(err);
                return reject("LDAP: Wrong username or password");
              }

              resolve({ username: "test" } as any);
            }
          );
        });
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
    signIn: "/login",
    error: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
