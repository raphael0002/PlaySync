import { axiosInstance } from "@/lib/api/axios";
import { User } from "@/types/user";

export const getUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get("/api/v1/users");
  return response.data.data.users;
};

export const getUser = async (
  id: string
): Promise<User> => {
  const response = await axiosInstance.get(
    `/api/v1/users/${id}`
  );
  return response.data.data.user;
};

export const createUser = async (data: FormData) => {
  const response = await axiosInstance.post(
    "/api/v1/users",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data.data.user;
};

export const updateUser = async (
  id: string,
  data: FormData
) => {
  const response = await axiosInstance.patch(
    `/api/v1/users/${id}`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data.data.user;
};

export const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(
    `/api/v1/users/${id}`
  );
  return response.data.data.user;
};
