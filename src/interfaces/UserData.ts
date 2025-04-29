import { User } from "next-auth";

export interface UserData extends OptionalUserData {
  email: string;
  fullname: string;
  phone: string;
  password: string | undefined;
  image?: string;
  role?: string | "admin" | "member";
  type?: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface OptionalUserData extends User {
  email?: string;
  fullname?: string;
  phone?: string;
  password?: string | undefined;
  image?: string;
  role?: string | "admin" | "member";
  type?: string;
  created_at?: Date;
  updated_at?: Date;
}
