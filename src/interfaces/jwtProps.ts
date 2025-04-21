import { Account, Profile, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export interface myJWT extends JWT {
  id?: string;
  email?: string;
  fullname?: string;
  phone?: string;
  image?: string;
  role?: string;
  type?: string;
}

export interface JwtProps {
  token: JWT;
  user: User | AdapterUser;
  account: Account | null;
  profile?: Profile | undefined;
  trigger?: "signIn" | "signUp" | "update";
  isNewUser?: boolean;
   
  session?: any;
}
