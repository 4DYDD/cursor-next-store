import { UserData } from "@/interfaces/UserData";

export type signUpResponse = {
  statusCode: 200 | 201 | 400 | 401 | 403 | 404 | 500 | null;
  message: string;
  data: UserData | null;
};
