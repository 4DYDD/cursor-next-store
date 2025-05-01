import instance from "@/libs/axios/instance";

const usersServices = {
  getAllUsers: () => instance.get("/api/users"),
  updateUser: (id: string, data: any, token: string) => {
    return instance.put(
      "/api/users",
      { id, data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  },
  deleteUser: (id: string, token: string) => {
    return instance.delete("/api/users", {
      data: { id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  getProfile: (token: string) => {
    return instance.get("/api/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default usersServices;
