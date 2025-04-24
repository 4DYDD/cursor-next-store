import instance from "@/libs/axios/instance";

const authServices = {
  registerAccount: (data: any) => instance.post("/api/auth/register", data),
};

export default authServices;
