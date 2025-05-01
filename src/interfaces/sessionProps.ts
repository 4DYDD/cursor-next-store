import { Session } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import { JWT } from "next-auth/jwt";

export interface mySession extends Session {
  user: {
    id?: string;
    email?: string;
    fullname?: string;
    phone?: string;
    image?: string;
    role?: string;
    type?: string;
  };
  accessToken: string;
}

export interface sessionProps {
  session: Session;
  token: JWT;
  user: AdapterUser;
}
