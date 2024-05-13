import User from "@models/user";
import { connectToDb } from "@utils/database";
import NextAuth from "next-auth/next";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session.user) {
        return session;
      }

      const sessionUser = await User.findOne({ email: session.user?.email });

      session.user.email = `${sessionUser._id}`;
      return session;
    },
    async signIn({ profile }) {
      try {
        connectToDb();

        // Check if a user already exists
        const userExists = await User.findOne({ email: profile?.email });

        // if not, create a user
        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            // @ts-ignore
            image: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("error", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
