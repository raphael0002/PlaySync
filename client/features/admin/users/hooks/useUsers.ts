import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { getUser, getUsers } from "../api/userApi";

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });
};
