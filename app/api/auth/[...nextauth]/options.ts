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
          throw Error("Invalid admin credentials!");
        }

        return { ...user, role: "admin" } as any;
      },
    }),
    CredentialsProvider({
      id: "customer",
      name: "Customer Login",
      credentials: {},
      async authorize(credentials: any) {
        const client = ldap.createClient({
          url: process.env.LDAP_SERVER || "",
        });

        return new Promise((resolve, reject) => {
          client.bind(
            `${credentials?.username}@${process.env.LDAP_DOMAIN}`,
            credentials?.password,
            (err) => {
              if (err) {
                client.destroy(err);
                return reject(new Error("Invalid customer credentials!"));
              }

              client.search(
                process.env.LDAP_CUSTOMERS_SEARCH_PATH || "",
                {
                  scope: "one",
                  attributes: ["cn"],
                  filter: `(sAMAccountName=${credentials.username})`,
                },
                (err, res) => {
                  if (err) {
                    client.destroy(err);
                    return reject(new Error("Something went wrong!"));
                  }

                  res.on("searchEntry", (entry) => {
                    const customerName = entry.json.attributes[0].values[0];
                    resolve({
                      username: credentials.username,
                      name: customerName,
                      role: "customer",
                    } as any);
                  });
                }
              );
            }
          );

          client.unbind((err) => {
            if (err) {
              client.destroy(err);
              return reject(new Error("Something went wrong! (unbinding"));
            }
          });
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token?.user as any;

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
