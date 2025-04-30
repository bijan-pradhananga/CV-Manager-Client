import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { LoginSchema } from "./schemas";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/database";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await prisma.user.findUnique({
            where: {
              email,
            }
          })
          if (!user) return null;
          if (!user.password) return null;
          const isMatched = await compare(password, user.password);
          if (!isMatched) return null;
          return user;
        }
        return null;
      }
    }),
  ],
  pages: {
    signIn: '/auth/login'
  },
  callbacks: {
    async session({ session, token }) {

      if (token?.sub && token?.role) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
})