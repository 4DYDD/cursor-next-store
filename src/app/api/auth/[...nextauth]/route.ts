import { UserData } from "@/interfaces/UserData";
import { signIn } from "@/libs/firebase/service";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JwtProps, myJWT } from "@/interfaces/jwtProps";
import { mySession, sessionProps } from "@/interfaces/sessionProps";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await signIn(email, password);

        return user || null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: JwtProps) {
      const myToken = token as myJWT;

      switch (account?.provider) {
        case "credentials":
          if (user) {
            const theUser = user as UserData;

            myToken.id = theUser.id;
            myToken.email = theUser.email;
            myToken.fullname = theUser.fullname;
            myToken.phone = theUser.phone;
            myToken.image = theUser.image;
            myToken.role = theUser.role;
            myToken.type = theUser.type;
          }
          break;

        // case "google":
        //   if (user) {
        //     myToken.id = user.id;
        //     myToken.email = user.email;
        //     myToken.image = user.image;
        //   }
        //   break;

        default:
          break;
      }

      return myToken;
    },
    async session({
      session,
      token,
    }: sessionProps & {
      newSession: any;
      trigger: "update";
    }) {
      const theSession = session as mySession;
      const myToken = token as myJWT;

      if ("email" in myToken) theSession.user.email = myToken.email;
      if ("fullname" in myToken) theSession.user.fullname = myToken.fullname;
      if ("phone" in myToken) theSession.user.phone = myToken.phone;
      if ("image" in myToken) theSession.user.image = myToken.image;
      if ("role" in myToken) theSession.user.role = myToken.role;
      if ("type" in myToken) theSession.user.type = myToken.type;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
