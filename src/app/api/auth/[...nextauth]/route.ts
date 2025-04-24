import { UserData } from "@/interfaces/UserData";
import { signIn, signInWithGoogle } from "@/services/auth/services";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
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

        return user && user.type === "credential" ? user : null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: JwtProps) {
      const myToken = token as myJWT;

      switch (account?.provider) {
        case "credentials":
          if (user) {
            const theUser = user as UserData;

            myToken.email = theUser.email;
            myToken.fullname = theUser.fullname;
            myToken.phone = theUser.phone;
            myToken.image = theUser.image;
            myToken.role = theUser.role;
            myToken.type = theUser.type;
          }
          break;

        case "google":
          if (user) {
            const result: { data: UserData | null } = { data: null };

            await signInWithGoogle(
              {
                id: user.id as string,
                email: user.email as string,
                name: user.name as string,
                image: user.image as string,
              },
              (data: UserData | null) => {
                result.data = data;
              }
            );

            myToken.name = undefined;

            myToken.email = result.data?.email || myToken.email;
            myToken.fullname = result.data?.fullname || myToken.fullname;
            myToken.phone = result.data?.phone || myToken.phone;
            myToken.image = result.data?.image || myToken.image;
            myToken.role = result.data?.role || myToken.role;
            myToken.type = result.data?.type || myToken.type;
          }
          break;

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

      if ("phone" in myToken && myToken.phone !== "")
        theSession.user.phone = myToken.phone;

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
