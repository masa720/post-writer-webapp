import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
    clientId: process.env.AUTH_GITHUB_CLIENT_ID!,
    clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET!,
  })
],
  pages: {
    signIn: "/login"
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.id = profile?.id || token.sub;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email || "";
        session.user.image = token.picture;
      }

      return session;
    },
  },
})