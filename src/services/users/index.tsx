import instance from "@/libs/axios/instance";

const usersServices = {
  getAllUsers: () => instance.get("/api/users"),
  updateUser: (id: string, data: any) =>
    instance.put("/api/users", { id, data }),
  deleteUser: (id: string) => instance.delete("/api/users", { data: { id } }),
};

export default usersServices;
