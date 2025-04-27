import instance from "@/libs/axios/instance";

const usersServices = {
  getAllUsers: () => instance.get("/api/users"),
};

export default usersServices;
