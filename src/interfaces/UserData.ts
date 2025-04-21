import { User } from "next-auth";

export interface UserData extends User {
  email: string;
  fullname: string;
  phone: string;
  password: string | undefined;
  image?: string;
  role?: string;
  type?: string;
}
